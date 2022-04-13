import { AudioContext } from 'context/AudioProvider'
import { Component } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { LayoutProvider, RecyclerListView } from 'recyclerlistview'
import AudioListItem from 'components/AudioListItem'
import OptionModal from 'components/OptionModal'
import SearchBar from 'components/SearchBar'
import { storeAudioForNextOpening } from 'helpers/audio'
import { pause, play, playNext, resume } from 'misc/audioController'
import { Audio } from 'expo-av'
import tw from 'twrnc'

export class AudioList extends Component {
  static contextType = AudioContext

  constructor(props) {
    super(props)
    this.state = {
      optionModalVisible: false,
    }
    this.currentItem = {}
  }

  layoutProvider = new LayoutProvider(
    (_) => 'audio',
    (type, dim) => {
      switch (type) {
        case 'audio':
          dim.width = Dimensions.get('window').width
          dim.height = 70
          break
        default:
          dim.width = 0
          dim.height = 0
      }
    },
  )

  /* type definition
  status: {
    didJustFinish: boolean,
    isLoaded: boolean,
    isPlaying: boolean,
    isBuffering: boolean,
    rate: number,
    shouldPlay: boolean,
    volume: number,
    isMuted: boolean,
    isLooping: boolean,
    didJustFinish: boolean,
    positionMillis: number,
    durationMillis: number,
  }
  audio: {
     Object {
    "albumId": number,
    "creationTime": number,
    "duration": number,
    "filename": string,
    "height": number,
    "id": number,
    "mediaType": string,
    "modificationTime": number,
    "uri": string,
    "width": number,
  },
  }
*/
  handleAudioPressed = async (audio) => {
    const { playbackObj, soundObj, currentAudio, updateState, audioFiles } =
      this.context
    // first time
    if (soundObj === null) {
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, audio.uri)
      const index = audioFiles.indexOf(audio)
      updateState(this.context, {
        playbackObj: playbackObj,
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: index,
      })
      playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate)
      console.log(this.context.onPlaybackStatusUpdate)
      return storeAudioForNextOpening(audio, index)
    }

    // pause
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj)
      return updateState(this.context, { soundObj: status, isPlaying: false })
    }

    // resume
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj)
      return updateState(this.context, { soundObj: status, isPlaying: true })
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const index = audioFiles.indexOf(audio)
      const status = await playNext(playbackObj, audio.uri)
      updateState(this.context, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: index,
      })
      return storeAudioForNextOpening(audio, index)
    }
  }

  componentDidMount() {
    this.context.loadPreviousAudio()
  }

  rowRenderer = (_, item, index, extendedState) => {
    return (
      <AudioListItem
        {...{
          name: item.filename,
          duration: item.duration,
          optionPressed: () => {
            this.currentItem = item
            this.setState({ ...this.state, optionModalVisible: true })
          },
          onAudioPressed: () => this.handleAudioPressed(item),
          isPlaying: extendedState.isPlaying,
          activeItem: this.context.currentAudioIndex === index,
        }}
      />
    )
  }
  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider, isPlaying }) => {
          if (!dataProvider._data.length) return null
          if (dataProvider._size === 0)
            return (
              <View style={styles.container}>
                <Text style={styles.text}>
                  Seems like there's no audio file in your device, try search
                  for online songs instead 🐧
                </Text>
              </View>
            )
          return (
            <View style={tw`flex-1 px-8`}>
              <SearchBar />
              <RecyclerListView
                style={{ flex: 1 }}
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{ isPlaying }}
              />
              <OptionModal
                onPlayPressed={() => {
                  console.log('play')
                }}
                onPlaylistPressed={() => {
                  console.log('playlist')
                }}
                currentItem={this.currentItem}
                onClose={() =>
                  this.setState({ ...this.state, optionModalVisible: false })
                }
                visible={this.state.optionModalVisible}
              />
            </View>
          )
        }}
      </AudioContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default AudioList
