import AsyncStorage from '@react-native-async-storage/async-storage'
import PlaylistInputModal from 'components/PlaylistInputModal'
import PlaylistDetail from 'components/PlaylistDetail'
import { AudioContext } from 'context/AudioProvider'
import { useContext, useEffect, useState } from 'react'
import { View, Alert, ScrollView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'style/tailwind'

let selectedPlaylist = {}

function Playlist({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)

  const context = useContext(AudioContext)
  const { playlist, addToPlaylist, updateState } = context

  const closeModal = () => setModalVisible(false)

  const createPlaylist = async (playlistName) => {
    const result = await AsyncStorage.getItem('playlist')
    if (result !== null) {
      const audios = []
      if (addToPlaylist) {
        audios.push(addToPlaylist)
      }
      const newList = {
        id: Date.now(),
        title: playlistName,
        audios: audios,
      }
      const updatedList = [...playlist, newList]
      updateState(context, { addToPlaylist: null, playlist: updatedList })
      await AsyncStorage.setItem('playlist', JSON.stringify(updatedList))
    }
    closeModal()
  }

  const renderPlayLists = async () => {
    const result = await AsyncStorage.getItem('playlist')
    if (result === null) {
      const defaultPlayList = {
        id: Date.now(),
        title: 'My Favorite',
        audios: [],
      }

      const newPlayList = [...playlist, defaultPlayList]
      updateState(context, { playlist: [...newPlayList] })
      return await AsyncStorage.setItem(
        'playlist',
        JSON.stringify([...newPlayList]),
      )
    }

    updateState(context, { playlist: JSON.parse(result) })
  }

  useEffect(() => {
    if (!playlist.length) {
      // re-render all playlists
      renderPlayLists()
    }
  }, [playlist.length])

  const handleBannerPress = async (playlist) => {
    // if there is selected audio, add it to playlist
    if (addToPlaylist) {
      const result = await AsyncStorage.getItem('playlist')
      let oldList = []
      let updatedList = []
      let sameAudio = false
      if (result !== null) {
        oldList = JSON.parse(result)
        updatedList = oldList.filter((list) => {
          if (list.id === playlist.id) {
            // audio already inside playlist
            for (let audio of list.audios) {
              if (audio.id === addToPlaylist.id) {
                sameAudio = true
                return
              }
            }
            // update playlist
            list.audios = [...list.audios, addToPlaylist]
          }
          return list
        })
      }
      if (sameAudio) {
        Alert.alert(
          'Found same audio',
          `${addToPlaylist.filename} is already in ${playlist.title}`,
        )
        sameAudio = false
        return updateState(context, { addToPlaylist: null })
      }
      updateState(context, { playlist: [...updatedList], addToPlaylist: null })
      return AsyncStorage.setItem('playlist', JSON.stringify([...updatedList]))
    }
    selectedPlaylist = playlist
    // else, open PlayListDetail screen
    navigation.navigate('PlayListDetail', playlist)
  }

  return (
    <View style={tw`px-8 pt-8 bg-secondary h-full`}>
      <ScrollView>
        {playlist.length
          ? playlist.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                onPress={() => handleBannerPress(item)}
                style={tw`flex flex-row items-center justify-between bg-thirdly px-4 rounded-2xl mb-2`}
              >
                <View style={tw`py-10 pl-4`}>
                  <Text style={tw`text-white font-bold text-xl`}>
                    {item.title}
                  </Text>
                  <Text style={tw`text-gray-300`}>
                    {`${item.audios.length} ${
                      item.audios.length > 1 ? 'songs' : 'song'
                    } `}
                  </Text>
                </View>
                <View
                  style={tw`overflow-hidden w-32 h-32 items-center justify-center -mr-4`}
                >
                  <Icon name="musical-notes" size={150} color="#BDBDBD" />
                </View>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>

      <PlaylistInputModal
        {...{
          visible: modalVisible,
          onClose: closeModal,
          onSubmit: createPlaylist,
        }}
      />
      <PlaylistDetail
        {...{
          visible: showPlaylist,
          playlist: selectedPlaylist,
          onClose: () => setShowPlaylist(false),
        }}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={tw`p-4 bg-target rounded-full w-16 flex items-center justify-center absolute right-8 bottom-8`}
      >
        <Icon name="add" size={30} color={'#fff'} />
      </TouchableOpacity>
    </View>
  )
}

export default Playlist
