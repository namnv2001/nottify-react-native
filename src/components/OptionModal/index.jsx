import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'style/tailwind'

function OptionModal(props) {
  const { visible, onClose, currentItem, options } = props

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={tw`absolute bottom-0 bg-primary w-full px-8 py-6 rounded-t-3xl z-50`}
      >
        <Text style={tw`text-xl text-white text-center font-bold py-4`}>
          {currentItem.filename}
        </Text>
        <View>
          {options.map((option) => {
            return (
              <TouchableWithoutFeedback
                onPress={option.onPress}
                key={option.title}
              >
                <View style={tw`flex-row items-center py-4`}>
                  <Icon name={option.iconName} color="#fff" size={30} />
                  <Text style={tw`text-white text-lg ml-4`}>
                    {option.title}{' '}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={tw`absolute bg-secondary bg-opacity-50 top-0 bottom-0 left-0 right-0`}
        />
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default OptionModal
