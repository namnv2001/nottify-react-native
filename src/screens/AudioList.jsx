import AudioListItem from 'components/AudioListItem'
import OptionModal from 'components/OptionModal'
import SearchBar from 'components/SearchBar'
import { AudioContext } from 'context/AudioProvider'
import { selectAudio } from 'misc/audioController'
import { Component } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { LayoutProvider, RecyclerListView } from 'recyclerlistview'
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

  handleAudioPressed = async (audio) => {
    await selectAudio(audio, this.context)
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

  navigateToPlaylist = () =>  {
    this.context.updateState(this.context, {
      addToPlaylist: this.currentItem,
    })
    this.props.navigation.navigate('Playlist')
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
            <View style={tw`flex-1 px-8 bg-neutral-800`}>
              <SearchBar />
              <RecyclerListView
                style={{ flex: 1 }}
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{ isPlaying }}
              />
              <OptionModal
                options={[
                    {
                      title: 'Add to playlist',
                      onPress: this.navigateToPlaylist,
                      iconName: 'albums-outline'
                    }
                    ]}
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
