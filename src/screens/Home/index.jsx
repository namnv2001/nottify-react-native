import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OnlineSearch from 'components/OnlineSearch'
import SongList from 'components/SongList'
import MusicFileContext from 'context/MusicFileContext'
import { Audio } from 'expo-av'
import { screenOptions } from 'helpers/screenOptions'
import { pause, play, playNext, resume } from 'misc/audioController'
import { useContext, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

function Home() {
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
  }

  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      style={styles.container}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <Tab.Screen
        name="Playlist"
        children={() => (
          <SongList
            audioFiles={audioFiles}
            currentAudio={currentAudio}
            handleAudioPress={handleAudioPress}
          />
        )}
      />
      <Tab.Screen name="Search" children={() => <OnlineSearch />} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.5,
  },
})

export default Home
