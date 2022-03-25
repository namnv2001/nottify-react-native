import { View, Text, Image, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/Ionicons'
import { useContext } from 'react'

import MusicFileContext from 'context/MusicFileContext'
import Song from 'components/Song'

function Playlist({ navigation }) {
  const { audioFiles } = useContext(MusicFileContext)

  const handlePlay = () => {
    console.log('play')
  }

  return (
    <KeyboardAwareScrollView style={tw`flex px-8 pt-8 bg-gray-800`}>
      <Image
        style={tw`w-60 h-60 mx-auto my-8`}
        source={require('assets/album-cover.jpg')}
      />
      <View style={tw`flex flex-row items-center justify-between`}>
        <View>
          <Text style={tw`text-white tracking-wider text-3xl font-bold`}>
            Album name
          </Text>
          <Text style={tw`text-white text-base font-bold`}>Username</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={handlePlay}
            style={tw`bg-green-700 p-3 rounded-full`}
          >
            <Text>
              <Icon name="play-outline" size={30} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`mt-4`}>
        {audioFiles &&
          audioFiles.map((audioFile, index) => (
            <Song key={index} navigation={navigation} data={audioFile} />
          ))}
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Playlist
