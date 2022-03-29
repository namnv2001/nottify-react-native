import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'
import { useContext, useState } from 'react'
import { Audio } from 'expo-av'

import MusicFileContext from 'context/MusicFileContext'
import Song from 'components/Song'
import PlayBox from 'components/PlayBox'
import { play, pause, resume, playNext } from 'misc/audioController'

function Playlist({ navigation }) {
  const { audioFiles } = useContext(MusicFileContext)

  const [playbackObj, setPlaybackObj] = useState(null)
  const [soundObj, setSoundObj] = useState(null)
  const [currentAudio, setCurrentAudio] = useState(null)

  const handleAudioPress = async (audio) => {
    // play audio for the first time
    if (soundObj === null) {
      const playbackObj = new Audio.Sound()
      setCurrentAudio(audio)
      const status = await play(playbackObj, audio.uri)
      // console.log('status: ', status)
      setPlaybackObj(playbackObj)
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
      setCurrentAudio(audio)
      const status = await playNext(playbackObj, audio.uri)
      setSoundObj(status)
    }
    console.log(soundObj)
  }

  return (
    <View style={tw`flex relative px-8 bg-neutral-800`}>
      <Image
        style={tw`w-50 h-50 mx-auto mt-16 mb-8`}
        source={require('assets/album-cover.jpg')}
      />
      <View style={tw`flex relative flex-row items-center justify-between`}>
        <View>
          <Text style={tw`text-white tracking-wider text-3xl font-bold`}>
            Album name
          </Text>
          <Text style={tw`text-white text-base font-bold`}>Username</Text>
        </View>
      </View>
      <PlayBox songName={currentAudio?.filename || 'Pick a song'} />
      <KeyboardAwareScrollView style={styles.list}>
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

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    height: 480,
    overflow: 'scroll',
  },
})

export default Playlist
