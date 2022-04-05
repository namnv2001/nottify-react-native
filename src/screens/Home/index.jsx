import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OnlineSearch from 'components/OnlineSearch'
import SongList from 'components/SongList'
import MusicFileContext from 'context/MusicFileContext'
import { Audio } from 'expo-av'
import { screenOptions } from 'helpers/screenOptions'
import { pause, play, playNext, resume } from 'misc/audioController'
import { useContext, useState } from 'react'
import PlayBox from 'components/PlayBox'

function Home() {
  const { audioFiles, setPlaybackDuration, setPlaybackPosition } =
    useContext(MusicFileContext)

  const [playbackObj, setPlaybackObj] = useState(null)
  const [soundObj, setSoundObj] = useState(null)
  const [currentAudio, setCurrentAudio] = useState(null)

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      setPlaybackPosition(playbackStatus.positionMillis)
      setPlaybackDuration(playbackStatus.durationMillis)
    }
  }

  const handleAudioPress = async (audio) => {
    // play audio for the first time
    if (soundObj === null) {
      const playbackObj = new Audio.Sound()
      setCurrentAudio(audio)
      const status = await play(playbackObj, audio.uri)
      // console.log('status: ', status)
      setPlaybackObj(playbackObj)
      setSoundObj(status)
      return playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        headerShown: false,
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
      <Tab.Screen
        name="Playing"
        children={() => <PlayBox {...{ currentAudio }} />}
      />
      <Tab.Screen name="Search" children={() => <OnlineSearch />} />
    </Tab.Navigator>
  )
}

export default Home
