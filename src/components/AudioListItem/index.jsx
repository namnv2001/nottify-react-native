import {
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'
import { formatTime, getThumbnailText } from 'helpers/commons'

function AudioListItem(props) {
  const {
    name,
    duration,
    optionPressed,
    onAudioPressed,
    isPlaying,
    activeItem,
  } = props

  const renderIcon = (isPlaying) => {
    return (
      <Icon
        style={tw`p-4 rounded-full`}
        name={isPlaying ? 'pause-outline' : 'play-outline'}
        size={30}
        color="#fff"
      />
    )
  }

  return (
    <View style={tw`flex flex-row justify-between items-center py-2`}>
      <TouchableWithoutFeedback onPress={onAudioPressed}>
        <View style={tw`flex flex-row items-center`}>
          <View
            style={tw`w-12 h-12 rounded-full mr-2 flex items-center justify-center ${
              activeItem ? 'bg-green-500' : 'bg-gray-500'
            }`}
          >
            <Text style={tw`text-white font-bold text-xl`}>
              {activeItem ? renderIcon(isPlaying) : getThumbnailText(name)}
            </Text>
          </View>
          <View style={tw`w-9/12`}>
            <Text
              style={tw`font-bold text-base ${
                activeItem ? 'text-green-500' : 'text-white'
              }`}
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text style={tw`text-white`}>{formatTime(duration)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={optionPressed} style={tw`p-2`}>
        <Text>
          <Icon name="ellipsis-vertical-outline" size={20} color="#fff" />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AudioListItem
