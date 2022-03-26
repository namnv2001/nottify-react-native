import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import { useState, useEffect } from 'react'
import { Audio } from 'expo-av'
import tw from 'twrnc'

function Playing({ route, navigation }) {
  const { currentSong, audioFiles } = route.params

  const [favorite, setFavorite] = useState(true)
  const [shuffle, setShuffle] = useState(true)
  const [repeat, setRepeat] = useState(true)
  const [play, setPlay] = useState(false)
  const [firstTime, setFirstTime] = useState(true)

  const [sound, setSound] = useState()

  const handlePressPlay = async () => {
    // play
    if (!play && firstTime) {
      try {
        console.log('Loading sound...')
        const { sound } = await Audio.Sound.createAsync({
          uri: currentSong.uri,
        })
        setSound(sound)
        console.log('Playing sound...')
        await sound.playAsync()
        setPlay(true)
        setFirstTime(false)
      } catch (err) {
        console.log('[Error PLAYING SOUND]: ', err.message)
      }
    }
    // resume
    if (!play && !firstTime) {
      try {
        console.log('Resuming sound...')
        await sound.playAsync()
        setPlay(true)
      } catch (err) {
        console.log('[Error RESUME SOUND]: ', err.message)
      }
    }
    // pause
    if (play) {
      try {
        console.log('Pausing sound...')
        await sound.pauseAsync()
        setPlay(false)
      } catch (err) {
        console.log('[Error PAUSE SOUND]: ', err.message)
      }
    }
  }

  const handlePressNext = () => {
    console.log('Next')
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading sound!')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <KeyboardAwareScrollView
      style={tw`flex flex-col-reverse px-8 pb-16 bg-neutral-800`}
    >
      {/* IMAGE */}
      <View>
        <Image
          style={tw`w-80 h-80 mx-auto mb-28`}
          source={require('assets/spotify-app-icon-28.jpg')}
        />
      </View>
      {/* TITLE AND FAVORITE */}
      <View style={tw`flex flex-row items-center justify-between`}>
        <View style={tw`w-10/12`}>
          <Text style={tw`text-2xl font-bold text-white`}>
            {currentSong.filename}
          </Text>
          <Text style={tw`text-sm text-white`}>Author name</Text>
        </View>
        <TouchableOpacity style={tw`w-1/12`}>
          <Icon
            name="heart-outline"
            size={30}
            color={favorite ? '#30fc03' : '#ccc'}
          />
        </TouchableOpacity>
      </View>
      {/* SLIDER AND TIMER */}
      <View>
        <Slider
          style={tw`mt-4 w-full`}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#ccc"
        />
        <View style={tw`flex flex-row items-center justify-between`}>
          <Text style={styles.time}>0:00 </Text>
          <Text style={styles.time}>12:09 </Text>
        </View>
      </View>
      {/* CONTROLS */}
      <View style={tw`flex flex-row items-center justify-between`}>
        <TouchableOpacity>
          <Icon
            name="shuffle-outline"
            size={30}
            color={shuffle ? '#30fc03' : '#fff'}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="play-skip-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            onPress={handlePressPlay}
            style={tw`p-4 rounded-full bg-green-500`}
            name={play ? 'pause-outline' : 'play-outline'}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressNext}>
          <Icon name="play-skip-forward-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="repeat-outline"
            size={30}
            color={repeat ? '#30fc03' : '#fff'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  time: {
    fontSize: 12,
    color: '#fff',
  },
})

export default Playing
