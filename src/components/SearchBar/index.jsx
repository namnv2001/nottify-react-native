import { useState } from 'react'
import { TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'style/tailwind'

function SearchBar(props) {
  const { onSubmit } = props
  const [name, setName] = useState('')

  return (
    <View
      style={tw`mt-8 flex-row items-center bg-thirdly rounded-xl justify-between`}
    >
      <TextInput
        style={tw`text-lg p-4 px-4 text-white w-10/12`}
        placeholderTextColor={'#D4D4D4'}
        placeholder="Enter song name"
        onChangeText={(value) => setName(value)}
        defaultValue={name}
        onSubmitEditing={onSubmit}
      />
      <View style={tw`p-3 mr-1`}>
        <Icon style={tw``} name="search" size={25} color="#fff" />
      </View>
    </View>
  )
}

export default SearchBar
