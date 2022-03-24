import { View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'
import { useContext } from 'react'

import MusicFileContext from 'context/MusicFileContext'
import Song from 'components/Song'

function Playlist({ navigation }) {
  const { audioFiles } = useContext(MusicFileContext)

  return (
    <KeyboardAwareScrollView style={tw`flex px-8 pt-8`}>
      <View>
        <Text>Album name</Text>
        <Text>Username</Text>
      </View>
      <View>
        {audioFiles &&
          audioFiles.map((audioFile, index) => (
            <Song key={index} data={audioFile} />
          ))}
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Playlist
