import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLogo from 'components/AppLogo'
import AudioListItem from 'components/AudioListItem'
import OptionModal from 'components/OptionModal'
import { AudioContext } from 'context/AudioProvider'
import { selectAudio } from 'misc/audioController'
import React, { useContext, useState } from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'style/tailwind'

function PlaylistDetail(props) {
  const context = useContext(AudioContext)
  const playlist = props.route.params
  const [modelVisible, setModelVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [audios, setAudios] = useState(playlist.audios)

  const onCloseModal = () => {
    setSelectedItem({})
    setModelVisible(false)
  }

  const removeAudio = async () => {
    let isPlaying = context.isPlaying
    let isPlayListRunning = context.isPlayListRunning
    let soundObj = context.soundObj
    let playbackPosition = context.playbackPosition
    let activePlayList = context.activePlayList

    if (
      context.isPlayListRunning &&
      context.currentAudio.id === selectedItem.id
    ) {
      // stop
      await context.playbackObj.stopAsync()
      await context.playbackObj.unloadAsync()
      isPlaying = false
      isPlayListRunning = false
      soundObj = null
      playbackPosition = 0
      activePlayList = []
    }

    const newAudios = audios.filter((audio) => audio.id !== selectedItem.id)
    const result = await AsyncStorage.getItem('playlist')
    if (result !== null) {
      const oldPlayLists = JSON.parse(result)
      const updatedPlayLists = oldPlayLists.filter((item) => {
        if (item.id === playlist.id) {
          item.audios = newAudios
        }
        return item
      })

      AsyncStorage.setItem('playlist', JSON.stringify(updatedPlayLists))
      context.updateState(context, {
        playlist: updatedPlayLists,
        isPlayListRunning,
        activePlayList,
        playbackPosition,
        isPlaying,
        soundObj,
      })
    }
    setAudios(newAudios)
    onCloseModal()
  }

  const removePlaylist = async () => {
    let isPlaying = context.isPlaying
    let isPlayListRunning = context.isPlayListRunning
    let soundObj = context.soundObj
    let playbackPosition = context.playbackPosition
    let activePlayList = context.activePlayList

    if (context.isPlayListRunning && activePlayList.id === playlist.id) {
      // stop
      await context.playbackObj.stopAsync()
      await context.playbackObj.unloadAsync()
      isPlaying = false
      isPlayListRunning = false
      soundObj = null
      playbackPosition = 0
      activePlayList = []
    }

    const result = await AsyncStorage.getItem('playlist')
    if (result !== null) {
      const oldPlayLists = JSON.parse(result)
      const updatedPlayLists = oldPlayLists.filter(
        (item) => item.id !== playlist.id,
      )

      AsyncStorage.setItem('playlist', JSON.stringify(updatedPlayLists))
      context.updateState(context, {
        playlist: updatedPlayLists,
        isPlayListRunning,
        activePlayList,
        playbackPosition,
        isPlaying,
        soundObj,
      })
    }

    props.navigation.goBack()
  }

  const playAudio = async (audio) => {
    await selectAudio(audio, context, {
      activePlayList: playlist,
      isPlayListRunning: true,
    })
  }

  const handlePressPlay = () => {
    if (context.isPlayListRunning) {
      context.playbackObj.stopAsync()
      context.playbackObj.unloadAsync()
      context.updateState(context, {
        isPlaying: false,
        isPlayListRunning: false,
        playbackPosition: 0,
        soundObj: null,
      })
    } else {
      playAudio(context.currentAudio || audios[0])
    }
  }

  return (
    <View style={tw`bg-secondary h-full`}>
      <View>
        <AppLogo />
        <View>
          <Text
            style={tw`text-white my-4 text-center capitalize text-3xl font-bold`}
          >
            {playlist.title}
          </Text>
          <View style={tw`flex-row items-center justify-between px-4`}>
            <TouchableOpacity
              onPress={handlePressPlay}
              style={tw`flex-row items-center bg-target p-2 rounded-xl px-12`}
            >
              <Icon
                name={context.isPlaying ? 'pause' : 'play'}
                size={30}
                color="white"
              />
              <Text style={tw`text-white text-lg font-bold ml-2`}>
                {context.isPlaying ? 'Stop' : 'Play'}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={removePlaylist}
              style={tw`flex-row items-center bg-red-400 p-2 rounded-xl px-10`}
            >
              <Icon name="trash" size={30} color="white" />
              <Text style={tw`text-white text-lg font-bold ml-2`}>Delete </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView style={tw`mt-3 h-96`}>
          <FlatList
            data={audios}
            style={tw`mx-4`}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AudioListItem
                {...{
                  name: item.filename,
                  duration: item.duration,
                  isPlaying: context.isPlaying,
                  activeItem: item.id === context.currentAudio.id,
                  onAudioPressed: () => {
                    playAudio(item)
                  },
                  optionPressed: () => {
                    setSelectedItem(item)
                    setModelVisible(true)
                  },
                }}
              />
            )}
          />
        </SafeAreaView>
      </View>
      <OptionModal
        visible={modelVisible}
        onClose={onCloseModal}
        options={[
          {
            title: 'Remove from playlist',
            onPress: removeAudio,
            iconName: 'albums',
          },
        ]}
        currentItem={selectedItem}
      />
    </View>
  )
}

export default PlaylistDetail
