import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

function Controller(props) {
  const {
    handlePressNext,
    handlePressPrevious,
    handlePressPlay,
    handlePressRepeat,
    handlePressShuffle,
    play,
  } = props

  const [shuffle, setShuffle] = useState(true)
  const [repeat, setRepeat] = useState(true)

  return (
    <View style={tw`flex-row items-center justify-between py-4`}>
      <TouchableOpacity>
        <Icon
          name="shuffle-outline"
          size={30}
          color={shuffle ? '#30fc03' : '#fff'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressPrevious}>
        <Icon name="play-skip-back-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          onPress={handlePressPlay}
          style={tw`p-4 rounded-full bg-green-500`}
          name={play ? 'pause-outline' : 'play-outline'}
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressNext}>
        <Icon name="play-skip-forward-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="repeat-outline"
          size={30}
          color={repeat ? '#30fc03' : '#fff'}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Controller
