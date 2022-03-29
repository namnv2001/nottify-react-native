import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import tw from 'twrnc'

import Controller from 'components/Controller'
import Progress from 'components/Progress'

function PlayBox(props) {
  const { currentAudio } = props
  const [fullScreen, setFullScreen] = useState(false)

  const getFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  return (
    <TouchableWithoutFeedback>
      <View
        style={
          fullScreen
            ? tw`bg-neutral-800 py-4 flex-col-reverse w-full h-full absolute z-50 left-8 bottom-0 right-0`
            : tw`bg-neutral-800 py-4 flex-col-reverse w-full absolute z-50 left-8 bottom-0 right-0`
        }
      >
        <Controller fullScreen={fullScreen} />
        {fullScreen && (
          <Progress time={0} duration={currentAudio?.duration || 0} />
        )}
        <View style={tw`mb-4 flex flex-row justify-between items-center`}>
          <Text style={tw`text-xl font-bold text-white w-10/12`}>
            {currentAudio?.filename || 'Pick a song'}
          </Text>
          <TouchableOpacity onPress={getFullScreen} style={tw`w-1/12`}>
            <Icon
              name={fullScreen ? 'chevron-down-outline' : 'chevron-up-outline'}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        {fullScreen && (
          <View>
            <Image
              style={tw`w-80 h-80 mx-auto mb-28`}
              source={require('assets/spotify-app-icon-28.jpg')}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PlayBox
