import AsyncStorage from '@react-native-async-storage/async-storage'
import PlaylistInputModal from 'components/PlaylistInputModal'
import PlaylistDetail from 'components/PlaylistDetail'
import { AudioContext } from 'context/AudioProvider'
import { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

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
    <ScrollView style={tw`px-8 pt-2 bg-neutral-800`}>
      {playlist.length
        ? playlist.map((item) => (
            <TouchableOpacity
              key={item.id.toString()}
              onPress={() => handleBannerPress(item)}
              style={tw`bg-neutral-400 p-2 rounded-md mb-2`}
            >
              <Text style={tw`text-white font-bold text-lg`}>{item.title}</Text>
              <Text style={tw`text-gray-300`}>
                {`${item.audios.length} ${
                  item.audios.length > 1 ? 'songs' : 'song'
                }`}
              </Text>
            </TouchableOpacity>
          ))
        : null}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={tw`p-2 bg-green-500 flex-row items-center rounded-md`}
      >
        <Icon name="add-outline" size={30} color={'#fff'} />
        <Text style={tw`text-white`}>Add new playlist </Text>
      </TouchableOpacity>

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
    </ScrollView>
  )
}

export default Playlist
