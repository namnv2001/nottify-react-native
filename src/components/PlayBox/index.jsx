import Controller from 'components/Controller'
import Progress from 'components/Progress'
import { useState } from 'react'
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import tw from 'twrnc'

function PlayBox(props) {
  const { currentAudio } = props
  const [fullScreen, setFullScreen] = useState(false)

  const getFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  return (
    <TouchableWithoutFeedback onPress={getFullScreen}>
      <View
        style={
          fullScreen
            ? tw`bg-neutral-800 p-4 rounded-md py-4 flex-col-reverse w-full h-full absolute z-50 left-4 -bottom-1 right-0`
            : tw`bg-neutral-700 p-4 rounded-md py-4 flex-row-reverse items-center justify-between w-full absolute z-50 left-4 -bottom-1 right-0`
        }
      >
        <Controller fullScreen={fullScreen} />
        {fullScreen && (
          <Progress time={0} duration={currentAudio?.duration || 0} />
        )}
        <View style={tw`flex-row items-center`}>
          <Text
            style={
              fullScreen
                ? tw`text-xl font-bold text-white w-10/12`
                : tw`text-sm font-bold text-white w-9/12`
            }
          >
            {currentAudio?.filename || 'Pick a song'}
          </Text>
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
