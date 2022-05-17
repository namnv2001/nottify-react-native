import { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { AudioContext } from 'context/AudioProvider'
import { AppContext } from 'context/AppProvider'
import tw from 'style/tailwind'

function Controller(props) {
  const {
    handleNext,
    handlePrevious,
    handlePlayPause,
    handleRepeat,
    handleShuffle,
    play,
  } = props

  const { focusColor } = useContext(AppContext)
  const { shuffle, repeat } = useContext(AudioContext)

  return (
    <View style={tw`flex-row items-center justify-between py-4`}>
      <TouchableOpacity onPress={handleShuffle}>
        <Icon name="shuffle" size={30} color={shuffle ? focusColor : '#fff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePrevious}>
        <Icon name="play-skip-back" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlayPause}>
        <Icon
          style={tw`p-4 rounded-full bg-target`}
          name={play ? 'pause' : 'play'}
          size={40}
          color="#fff"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext}>
        <Icon name="play-skip-forward" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRepeat}>
        <Icon name="repeat" size={30} color={repeat ? focusColor : '#fff'} />
      </TouchableOpacity>
    </View>
  )
}

export default Controller
