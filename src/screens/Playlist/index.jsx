import { View, Text, Image, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/Ionicons'
import { useContext, useState } from 'react'
import { Audio } from 'expo-av'

import MusicFileContext from 'context/MusicFileContext'
import Song from 'components/Song'
import PlayBox from 'components/PlayBox'
import { play, pause, resume, playNext } from 'misc/audioController.js'

function Playlist({ navigation }) {
  const { audioFiles } = useContext(MusicFileContext)

  const [playbackObj, setPlaybackObj] = useState(null)
  const [soundObj, setSoundObj] = useState(null)
  const [currentAudio, setCurrentAudio] = useState(null)

  const handlePlay = () => {
    console.log('play')
  }

  const handleAudioPress = async (audio) => {
    // play audio for the first time
    if (soundObj === null) {
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, audio.uri)
      // console.log('status: ', status)
      setPlaybackObj(playbackObj)
      setCurrentAudio(audio)
      setSoundObj(status)
      return
    }

    // pause audio
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj)
      setSoundObj(status)
      return
    }

    // resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj)
      setSoundObj(status)
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri)
      setSoundObj(status)
      setCurrentAudio(audio)
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
              onPress={() => handleAudioPress(audioFile)}
              navigation={navigation}
              data={audioFile}
            />
          ))}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Playlist
