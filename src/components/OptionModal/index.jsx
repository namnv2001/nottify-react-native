import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

function OptionModal(props) {
  const { visible, onClose, currentItem, onPlayPressed, onPlaylistPressed } =
    props

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={tw`absolute bottom-0 bg-neutral-800 w-full px-8 py-4 rounded-t-3xl z-50`}
      >
        <Text style={tw`text-lg text-white font-bold`}>
          {currentItem.filename}
        </Text>
        <View>
          <TouchableWithoutFeedback onPress={onPlayPressed}>
            <View style={styles.container}>
              <Icon name="play-circle-outline" color="#fff" size={24} />
              <Text style={styles.text}>Play </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPlaylistPressed}>
            <View style={styles.container}>
              <Icon name="albums-outline" color="#fff" size={24} />
              <Text style={styles.text}>Add to playlist </Text>
            </View>
          </TouchableWithoutFeedback>
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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 30,
  },
})

export default OptionModal
