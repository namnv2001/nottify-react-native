import AsyncStorage from '@react-native-async-storage/async-storage'
import { Audio } from 'expo-av'
import * as MediaLibrary from 'expo-media-library'
import { storeAudioForNextOpening } from 'helpers/audio'
import { playNext, play } from 'misc/audioController'
import { Component, createContext } from 'react'
import { Alert, Text, View } from 'react-native'
import { DataProvider } from 'recyclerlistview'

export const AudioContext = createContext()
export class AudioProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioFiles: [],
      playlist: [],
      addToPlaylist: null,
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: null,
      totalAudioCount: 0,
      playbackPosition: null,
      playbackDuration: null,
      shuffle: false,
      repeat: false,
    }
  }

  loadPreviousAudio = async () => {
    let previousAudio = await AsyncStorage.getItem('previousAudio')
    let currentAudio
    let currentAudioIndex
    if (previousAudio === null) {
      currentAudio = this.state.audioFiles[0]
      currentAudioIndex = 0
    } else {
      previousAudio = JSON.parse(previousAudio)
      currentAudio = previousAudio.audio
      currentAudioIndex = previousAudio.index
    }

    this.setState({
      ...this.state,
      currentAudio,
      currentAudioIndex,
    })
  }

  getPermissions = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    if (permission.granted) {
      this.getAudioFiles()
    }
    if (!permission.canAskAgain && !permission.granted) {
      this.setState({ ...this.state, permissionError: true })
      console.log('User denied and we can not ask again')
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync()
      if (status === 'denied' && canAskAgain) {
        this.permissionAlert()
      }
      if (status === 'granted') {
        this.getAudioFiles()
      }
      if (status === 'denied' && !canAskAgain) {
        this.setState({ ...this.state, permissionError: true })
      }
    }
  }

  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state
    let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })
    // total audio count
    this.totalAudioCount = media.totalCount
    // ascending order
    media.assets.sort((a, b) =>
      a.filename > b.filename ? 1 : b.filename > a.filename ? -1 : 0,
    )
    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
      audioFiles: [...audioFiles, ...media.assets],
    })
  }

  permissionAlert = () => {
    Alert.alert('Permission', 'Please allow access to your audio files', [
      {
        text: 'Ok',
        onPress: () => this.getPermissions(),
      },
      {
        text: 'Cancel',
        onPress: () => this.permissionAlert(),
      },
    ])
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState })
  }

  /*  playbackStatus {
  "androidImplementation": string,
  "didJustFinish": boolean,
  "durationMillis": number,
  "isBuffering": boolean,
  "isLoaded": boolean,
  "isLooping": boolean,
  "isMuted": boolean,
  "isPlaying": boolean,
  "playableDurationMillis": number,
  "positionMillis": number,
  "progressUpdateIntervalMillis": number,     
  "rate": number,
  "shouldCorrectPitch": boolean,
  "shouldPlay": boolean,
  "uri": string,        
  "volume": number,
}
*/
  onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      this.updateState(this, {
        playbackPosition: playbackStatus.positionMillis,
        playbackDuration: playbackStatus.durationMillis,
      })
    }
    // handle after current song ended
    if (playbackStatus.didJustFinish) {
      try {
        // repeat
        if (this.state.repeat) {
          this.state.playbackObj.unloadAsync()
          const audio = this.state.audioFiles[this.state.currentAudioIndex]
          const status = await play(this.state.playbackObj, audio.uri)
          this.updateState(this, {
            soundObj: status,
            currentAudio: audio,
            isPlaying: true,
            currentAudioIndex: this.state.currentAudioIndex,
          })
          await storeAudioForNextOpening(audio, this.state.currentAudioIndex)
        }
        // shuffle
        else if (this.state.shuffle) {
          const randomIndex = Math.floor(Math.random() * this.totalAudioCount)
          const audio = this.state.audioFiles[randomIndex]
          const status = await playNext(this.state.playbackObj, audio.uri)
          this.updateState(this, {
            soundObj: status,
            currentAudio: audio,
            isPlaying: true,
            currentAudioIndex: randomIndex,
          })
          await storeAudioForNextOpening(audio, randomIndex)
        } else {
          // no shuffle or repeat
          const nextAudioIndex = this.state.currentAudioIndex + 1
          // end of playlist -> stop playing
          if (nextAudioIndex >= this.totalAudioCount) {
            this.state.playbackObj.unloadAsync()
            this.updateState(this, {
              soundObj: null,
              currentAudio: this.state.audioFiles[0],
              isPlaying: false,
              currentAudioIndex: 0,
              playbackPosition: null,
              playbackDuration: null,
            })
            return await storeAudioForNextOpening(this.state.audioFiles[0], 0)
          } else {
            // else select the next song
            const audio = this.state.audioFiles[nextAudioIndex]
            const status = await playNext(this.state.playbackObj, audio.uri)
            this.updateState(this, {
              soundObj: status,
              currentAudio: audio,
              isPlaying: true,
              currentAudioIndex: nextAudioIndex,
            })
            await storeAudioForNextOpening(audio, nextAudioIndex)
          }
        }
      } catch (error) {
        console.log('Error at onPlaybackStatusUpdate', error.message)
      }
    }
  }

  componentDidMount() {
    this.getPermissions()
    if (this.state.playbackObj === null) {
      this.setState({ ...this.state, playbackObj: new Audio.Sound() })
    }
  }

  render() {
    const {
      audioFiles,
      dataProvider,
      permissionError,
      playbackObj,
      soundObj,
      currentAudio,
      isPlaying,
      currentAudioIndex,
      playbackPosition,
      playbackDuration,
      shuffle,
      repeat,
      playlist,
      addToPlaylist,
    } = this.state
    if (permissionError)
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>You need to allow access to your media library</Text>
        </View>
      )
    return (
      <AudioContext.Provider
        value={{
          audioFiles,
          dataProvider,
          playbackObj,
          soundObj,
          currentAudio,
          isPlaying,
          currentAudioIndex,
          playbackPosition,
          playbackDuration,
          shuffle,
          repeat,
          playlist,
          addToPlaylist,
          updateState: this.updateState,
          totalAudioCount: this.totalAudioCount,
          loadPreviousAudio: this.loadPreviousAudio,
          onPlaybackStatusUpdate: this.onPlaybackStatusUpdate,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    )
  }
}

export default AudioProvider
