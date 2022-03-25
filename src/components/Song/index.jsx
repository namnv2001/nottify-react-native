import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

function Song({ navigation, data }) {
  //  Object {
  //   "albumId": "461323410",
  //   "creationTime": 0,
  //   "duration": 0,
  //   "filename": "Tiếng huýt sáo",
  //   "height": 0,
  //   "id": "4584",
  //   "mediaType": "audio",
  //   "modificationTime": 1624623892000,
  //   "uri": "file:///storage/emulated/0/Notifications/Messenger/Tiếng huýt sáo",
  //   "width": 0,
  // },

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Playing', { currentSong: data })}
      style={tw`flex flex-row justify-between items-center py-2`}
    >
      <View style={tw`flex flex-row items-center`}>
        <Image
          style={tw`w-12 h-12 mr-2`}
          source={require('assets/spotify-app-icon-28.jpg')}
        />
        <View style={tw`w-9/12`}>
          <Text style={tw`text-white font-bold text-base`}>
            {data.filename}
          </Text>
          <Text style={tw`text-white`}>Author name</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Options', { songName: data.filename })
        }
      >
        <Text>
          <Icon name="ellipsis-vertical-outline" size={20} color="#fff" />
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default Song
