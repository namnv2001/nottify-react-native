import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

function Navigator(props) {
  const { navigation, text, navigate } = props
  return (
    <View style={tw`flex flex-row items-center mx-auto`}>
      <Text style={tw`text-white text-xs my-4`}>{text} </Text>
      <TouchableOpacity onPress={() => navigation.navigate({ name: navigate })}>
        <Text style={tw`text-blue-500 font-bold text-xs`}>{navigate}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Navigator
