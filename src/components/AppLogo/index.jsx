import { Image } from 'react-native'
import tw from 'twrnc'

function AppLogo() {
  return (
    <Image
      style={tw`w-50 mt-8 h-50 mx-auto`}
      source={require('assets/Spotify_logo_without_text.svg.webp')}
    />
  )
}

export default AppLogo
