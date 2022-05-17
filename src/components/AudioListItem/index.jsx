import { AppContext } from 'context/AppProvider'
import { formatTime, getThumbnailText } from 'helpers/commons'
import { useContext } from 'react'
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'style/tailwind'

function AudioListItem(props) {
  const {
    name,
    duration,
    optionPressed,
    onAudioPressed,
    isPlaying,
    activeItem,
  } = props

  const { focusColor } = useContext(AppContext)

  const renderIcon = (isPlaying) => {
    return (
      <Icon
        style={tw`p-4 rounded-full`}
        name={isPlaying ? 'pause' : 'play'}
        size={30}
        color="#fff"
      />
    )
  }

  return (
    <View
      style={tw`flex-row justify-between items-center bg-thirdly p-2 rounded-2xl mt-2`}
    >
      <TouchableWithoutFeedback onPress={onAudioPressed} style={tw`w-9/12`}>
        <View style={tw`flex flex-row items-center`}>
          <View
            style={tw`w-16 h-16 rounded-xl mr-2 flex items-center justify-center ${
              activeItem ? 'bg-target' : 'bg-minimal'
            }`}
          >
            <Text style={tw`text-black font-bold text-xl`}>
              {activeItem ? renderIcon(isPlaying) : getThumbnailText(name)}
            </Text>
          </View>
          <View style={tw`w-8/12`}>
            <Text
              style={tw`font-bold text-base ${
                activeItem ? `text-[${focusColor}]` : 'text-white'
              }`}
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text style={tw`text-white`}>{formatTime(duration)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={optionPressed} style={tw`p-3 w-3/12`}>
        <Text>
          <Icon name="ellipsis-vertical" size={20} color="#fff" />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AudioListItem
