import { View, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

function Song(props) {
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
  const { data } = props

  return (
    <View style={tw`flex flex-row justify-between items-center py-2`}>
      <View style={tw`flex flex-row items-center`}>
        <Image
          style={tw`w-10 h-10`}
          source={require('assets/spotify-app-icon-28.jpg')}
        />
        <View>
          <Text style={tw`font-bold text-base`}>{data.filename}</Text>
          <Text>Author name</Text>
        </View>
      </View>
      <View>
        <Text>
          <Icon name="ellipsis-vertical-outline" size={30} color="#000" />
        </Text>
      </View>
    </View>
  )
}

export default Song
