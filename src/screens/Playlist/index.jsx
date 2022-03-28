import { View, Text, Image, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/Ionicons'
import { useContext, useState } from 'react'
import { Audio } from 'expo-av'

import MusicFileContext from 'context/MusicFileContext'
import Song from 'components/Song'
import PlayBox from 'components/PlayBox'

function Playlist({ navigation }) {
  const { audioFiles } = useContext(MusicFileContext)
  const [loadedSong, setLoadedSong] = useState()
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    console.log('play')
  }

  const handlePressSong = async (thisSong) => {
    // First time playing
    if (!loadedSong || (loadedSong && loadedSong.uri !== thisSong.uri)) {
      if (loadedSong) {
        console.log('loadedSong uri: ', loadedSong.uri)
        console.log('thisSong uri: ', thisSong.uri)
        console.log('Unload current song...')
        setPlaying(false)
        await loadedSong.unloadAsync()
      }
      try {
        console.log('Loading sound...')
        const { sound } = await Audio.Sound.createAsync({
          uri: thisSong.uri,
        })
        setLoadedSong(sound)
        console.log('Playing sound...')
        await sound.playAsync()
        setPlaying(true)
      } catch (err) {
        console.log('[Error PLAYING SOUND]: ', err.message)
      }
    }
    // Pause
    if (loadedSong && loadedSong.uri === thisSong.uri && playing) {
      try {
        console.log('Pausing sound...')
        await loadedSong.pauseAsync()
        setPlaying(false)
      } catch (err) {
        console.log('[Error PAUSE SOUND]: ', err.message)
      }
    }
    // Resume
    if (loadedSong && loadedSong.uri === thisSong.uri && !playing) {
      try {
        console.log('Resuming sound...')
        await loadedSong.playAsync()
        setPlaying(true)
      } catch (err) {
        console.log('[Error RESUME SOUND]: ', err.message)
      }
    }
  }

  return (
    <View style={tw`flex relative px-8 pt-8 bg-neutral-800`}>
      <Image
        style={tw`w-60 h-60 mx-auto my-16`}
        source={require('assets/album-cover.jpg')}
      />
      <View style={tw`flex relative flex-row items-center justify-between`}>
        <View>
          <Text style={tw`text-white tracking-wider text-3xl font-bold`}>
            Album name
          </Text>
          <Text style={tw`text-white text-base font-bold`}>Username</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={handlePlay}
            style={tw`bg-green-700 p-3 rounded-full`}
          >
            <Text>
              <Icon name="play-outline" size={30} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <PlayBox />
      <KeyboardAwareScrollView style={tw`mt-4 overflow-scroll h-96`}>
        {audioFiles &&
          audioFiles.map((audioFile) => (
            <Song
              key={audioFile.id}
              onPress={() => handlePressSong(audioFile)}
              navigation={navigation}
              data={audioFile}
            />
          ))}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Playlist
