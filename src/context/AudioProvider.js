import * as MediaLibrary from 'expo-media-library'
import { Component, createContext } from 'react'
import { Alert, Text, View } from 'react-native'
import { DataProvider } from 'recyclerlistview'

export const AudioContext = createContext()
export class AudioProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioFiles: [],
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
    }
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

  componentDidMount() {
    this.getPermissions()
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
          updateState: this.updateState,
          isPlaying,
          currentAudioIndex,
          totalAudioCount: this.totalAudioCount,
          playbackPosition,
          playbackDuration,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    )
  }
}

export default AudioProvider
