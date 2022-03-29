import { View, Text, TouchableWithoutFeedback } from 'react-native'
import tw from 'twrnc'

import Controller from 'components/Controller'
import Progress from 'components/Progress'

function PlayBox(props) {
  const { songName } = props

  const getFullScreen = () => {
    console.log('getFullScreen')
  }

  return (
    <TouchableWithoutFeedback onPress={getFullScreen}>
      <View
        style={tw`bg-neutral-800 py-4 w-full absolute z-50 left-8 bottom-0 right-0`}
      >
        <Text style={tw`mb-4 text-xl font-bold text-white`}>
          {songName || 'Default song name'}
        </Text>
        <Progress />
        <Controller />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PlayBox
