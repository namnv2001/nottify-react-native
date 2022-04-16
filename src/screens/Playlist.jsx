import AsyncStorage from '@react-native-async-storage/async-storage'
import PlaylistInputModal from 'components/PlaylistInputModal'
import { AudioContext } from 'context/AudioProvider'
import { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

function Playlist() {
  const [modalVisible, setModalVisible] = useState(false)
  const closeModal = () => setModalVisible(false)

  const context = useContext(AudioContext)
  const { playlist, addToPlaylist, updateState } = context

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

  const renderPlaylist = async () => {
    const result = await AsyncStorage.getItem('playlist')
    if (result === null) {
      const defaultPlaylist = {
        id: Date.now(),
        title: 'My favorite',
        audios: [],
      }
      const newPlaylist = [...playlist, defaultPlaylist]
      updateState(context, { playlist: [...newPlaylist] })
      return await AsyncStorage.setItem(
        'playlist',
        JSON.stringify([...newPlaylist]),
      )
    }
    updateState(context, { playlist: JSON.parse(result) })
  }

  useEffect(() => {
    if (!playlist.length) {
      renderPlaylist()
    }
  }, [])

  return (
    <ScrollView style={tw`px-8 pt-2 bg-neutral-800`}>
      {playlist.length
        ? playlist.map((item) => (
            <TouchableOpacity
              key={item.id.toString()}
              style={tw`bg-neutral-400 p-2 rounded-md mb-2`}
            >
              <Text style={tw`text-white font-bold text-lg`}>{item.title}</Text>
              <Text style={tw`text-gray-300`}>
                {item.audios.length > 1
                  ? `${item.audios.length} songs`
                  : `${item.audios.length} song`}
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
    </ScrollView>
  )
}

export default Playlist
