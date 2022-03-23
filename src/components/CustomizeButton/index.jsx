import { TouchableOpacity, Text } from 'react-native'
import tw from 'twrnc'

function CustomizeButton(props) {
  const { pressed, title } = props
  return (
    <TouchableOpacity
      style={tw`bg-blue-600 rounded-md px-4 py-2`}
      onPress={pressed}
    >
      <Text style={tw`text-white text-center text-lg font-bold`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomizeButton
