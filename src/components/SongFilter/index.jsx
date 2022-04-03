import { useState } from 'react'
import { TextInput, View } from 'react-native'

function SongFilter() {
  const [name, setName] = useState('')

  return (
    <View>
      <TextInput
        placeholder="Enter song name"
        onChangeText={(value) => setName(value)}
        defaultValue={name}
        onSubmitEditing={() => console.log(name)}
      />
    </View>
  )
}

export default SongFilter
