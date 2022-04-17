import { useState } from 'react'
import { Modal, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

function PlaylistInputModal(props) {
  const { visible, onClose, onSubmit } = props
  const [playlistName, setPlaylistName] = useState('')

  const handleSubmit = () => {
    if (playlistName.trim()) {
      onSubmit(playlistName)
      setPlaylistName('')
      onClose()
    } else {
      onClose()
    }
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View
        style={tw`bg-neutral-800 z-50 absolute bottom-0 left-0 right-0 rounded-t-3xl`}
      >
        <View style={tw`py-4 px-8`}>
          <TextInput
            style={tw`text-white text-lg py-2 border-b-2 border-gray-500 mb-2`}
            placeholder="Enter playlist name"
            placeholderTextColor={'#D4D4D4'}
            value={playlistName}
            onChangeText={(text) => setPlaylistName(text)}
          />
          <Icon
            style={tw`text-center p-2 bg-green-500 rounded-md`}
            name="checkmark-outline"
            size={30}
            color="#fff"
            onPress={handleSubmit}
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={tw`absolute bg-neutral-400 bg-opacity-50 top-0 bottom-0 left-0 right-0`}
        />
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default PlaylistInputModal
