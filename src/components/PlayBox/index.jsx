import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

function PlayBox(props) {
  return (
    <TouchableOpacity
      style={tw`bg-red-500 p-4 w-full rounded-md absolute z-50 left-8 bottom-0 right-0`}
    >
      <Text style={tw`text-white`}>Playbox</Text>
    </TouchableOpacity>
  )
}

export default PlayBox
