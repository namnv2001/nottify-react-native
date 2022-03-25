import { View, Text, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'

import Option from 'components/Option'

function Options({ route, navigation }) {
  const { songName } = route.params

  const handleAddFavorite = () => {
    console.log('add favorite')
  }

  const handleAddQueue = () => {
    console.log('add queue')
  }

  return (
    <KeyboardAwareScrollView
      style={tw`flex flex-col-reverse px-8 pb-8 bg-gray-800`}
    >
      <View style={tw`mx-auto mb-48`}>
        <Image
          style={tw`w-50 h-50 mx-auto`}
          source={require('assets/spotify-app-icon-28.jpg')}
        />
        <Text style={tw`text-center text-white font-bold text-lg`}>
          {songName}
        </Text>
      </View>
      <View>
        <Option
          onPress={handleAddFavorite}
          iconName="heart-outline"
          text="Add to favorite"
        />
        <Option
          onPress={handleAddQueue}
          iconName="add-circle-outline"
          text="Add to queue"
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Options
