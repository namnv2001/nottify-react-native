import { View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'
import { useEffect, useState } from 'react'
import usePermission from 'hooks/usePermission'

import Song from 'components/Song'

function Playlist({ navigation }) {
  const [audioFiles, setAudioFiles] = useState([])
  const { getPermissions } = usePermission(setAudioFiles)
  useEffect(() => {
    getPermissions()
  }, [])

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
