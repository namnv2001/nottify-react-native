import Option from 'components/Option'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'

function Options({ route, navigation }) {
  const { data } = route.params

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
      <View style={tw`mx-auto mb-48 items-center`}>
        {/* <Image
          style={tw`w-50 h-50 mx-auto`}
          source={require('assets/spotify-app-icon-28.jpg')}
        /> */}
        <View style={tw`w-50 h-50 rounded-full bg-gray-500`}>
          <Text
            style={tw`text-white font-bold text-9xl text-center leading-normal`}
          >
            {data.filename[0]}
          </Text>
        </View>
        <Text style={tw`text-center text-white font-bold text-lg`}>
          {data.filename}
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
