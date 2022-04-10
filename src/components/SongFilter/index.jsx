import { useState, useContext } from 'react'
import { TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

function SongFilter() {
  const [name, setName] = useState('')

  const FilterSubmit = () => {
    // const filteredData = audioData.filter((audio) => {
    //   return audio.filename.toLowerCase().includes(name.toLowerCase())
    // })
    // return filteredData
  }

  return (
    <View style={tw`relative mt-4`}>
      <TextInput
        style={tw`w-full p-2 px-4 rounded-full bg-neutral-700 text-white`}
        placeholder="Enter song name"
        onChangeText={(value) => setName(value)}
        defaultValue={name}
        // onSubmitEditing={setAudioFiles(FilterSubmit)}
      />
      <Icon
        style={tw`absolute right-0 mt-3 mr-4 text-white`}
        name="search-outline"
        size={20}
        color="#fff"
      />
    </View>
  )
}

export default SongFilter
