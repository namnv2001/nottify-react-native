import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

import { formatTime } from 'helpers/commons'

function Song(props) {
  const { navigation, data, onPress } = props
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
      onPress={onPress}
      style={tw`flex flex-row justify-between items-center py-2`}
    >
      <View style={tw`flex flex-row items-center`}>
        <View
          style={tw`w-12 h-12 rounded-full bg-gray-500 mr-2 flex items-center justify-center`}
        >
          <Text style={tw`text-white font-bold text-xl`}>
            {data.filename[0]}
          </Text>
        </View>
        <View style={tw`w-9/12`}>
          <Text style={tw`text-white font-bold text-base`}>
            {data.filename}
          </Text>
          <Text style={tw`text-white`}>{formatTime(data.duration)}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Options', { data })}
      >
        <Text>
          <Icon name="ellipsis-vertical-outline" size={20} color="#fff" />
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default Song
