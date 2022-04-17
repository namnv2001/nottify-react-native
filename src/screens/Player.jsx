import AppLogo from 'components/AppLogo'
import Controller from 'components/Controller'
import Progress from 'components/Progress'
import { AudioContext } from 'context/AudioProvider'
import { storeAudioForNextOpening } from 'helpers/audio'
import { pause, play, playNext, resume } from 'misc/audioController'
import { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc'

function Player() {
  const context = useContext(AudioContext)
  const { playbackDuration, playbackPosition } = context

  const calculateProgressBar = () => {
    if (playbackDuration !== null && playbackPosition !== null) {
      return playbackPosition / playbackDuration
    }
    return 0
  }

  useEffect(() => {
    context.loadPreviousAudio()
  }, [])

  const handlePlayPause = async () => {
    // play
    if (context.soundObj === null) {
      const audio = context.currentAudio
      const status = await play(context.playbackObj, audio.uri)
      context.playbackObj.setOnPlaybackStatusUpdate(
        context.onPlaybackStatusUpdate,
      )
      return context.updateState(context, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: context.currentAudioIndex,
      })
    }
    // pause
    if (context.soundObj && context.soundObj.isPlaying) {
      const status = await pause(context.playbackObj)
      return context.updateState(context, {
        soundObj: status,
        isPlaying: false,
      })
    }
    // resume
    if (context.soundObj && !context.soundObj.isPlaying) {
      const status = await resume(context.playbackObj)
      return context.updateState(context, {
        soundObj: status,
        isPlaying: true,
      })
    }
  }

  const handleNext = async () => {
    try {
      let nextSongIndex
      if (context.shuffle)
        nextSongIndex = Math.floor(Math.random() * context.totalAudioCount)
      else nextSongIndex = context.currentAudioIndex + 1
      const { isLoaded } = await context.playbackObj.getStatusAsync()
      const isLastAudio = nextSongIndex === context.totalAudioCount
      let audio = context.audioFiles[nextSongIndex]
      let index
      let status
      if (!isLoaded && !isLastAudio) {
        index = nextSongIndex
        status = await play(context.playbackObj, audio.uri)
      }
      if (isLoaded && !isLastAudio) {
        index = nextSongIndex
        status = await playNext(context.playbackObj, audio.uri)
      }
      if (isLastAudio) {
        index = 0
        audio = context.audioFiles[index]
        if (isLoaded) status = await playNext(context.playbackObj, audio.uri)
        else status = await play(context.playbackObj, audio.uri)
      }
      context.updateState(context, {
        currentAudio: audio,
        playbackObj: context.playbackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
        playbackPosition: null,
        playbackDuration: null,
      })
      storeAudioForNextOpening(audio, index)
    } catch (error) {}
  }

  const handlePrevious = async () => {
    try {
      let nextSongIndex
      if (context.shuffle)
        nextSongIndex = Math.floor(Math.random() * context.totalAudioCount)
      else nextSongIndex = context.currentAudioIndex - 1
      const { isLoaded } = await context.playbackObj.getStatusAsync()
      const isFirstAudio = context.currentAudioIndex <= 0
      let audio = context.audioFiles[nextSongIndex]
      let index
      let status
      if (!isLoaded && !isFirstAudio) {
        index = nextSongIndex
        status = await play(context.playbackObj, audio.uri)
      }
      if (isLoaded && !isFirstAudio) {
        index = nextSongIndex
        status = await playNext(context.playbackObj, audio.uri)
      }
      if (isFirstAudio) {
        index = context.totalAudioCount - 1
        audio = context.audioFiles[index]
        if (isLoaded) status = await playNext(context.playbackObj, audio.uri)
        else status = await play(context.playbackObj, audio.uri)
      }
      context.updateState(context, {
        currentAudio: audio,
        playbackObj: context.playbackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
        playbackPosition: null,
        playbackDuration: null,
      })
      storeAudioForNextOpening(audio, index)
    } catch (error) {}
  }

  const handleShuffle = () => {
    context.updateState(context, {
      shuffle: !context.shuffle,
    })
  }

  const handleRepeat = () => {
    context.updateState(context, {
      repeat: !context.repeat,
    })
  }

  if (!context.currentAudio) return null

  return (
    <View style={tw`px-8 bg-neutral-800 justify-between h-full`}>
      <Text style={tw`text-white mt-4 text-right`}>{`${
        context?.currentAudioIndex + 1
      } / ${context?.totalAudioCount}`}</Text>
      <AppLogo />
      <View>
        <Text style={tw`text-lg font-bold text-white`}>
          {context.currentAudio?.filename}
        </Text>
        <Progress
          {...{
            calculateProgressBar,
            time: playbackPosition / 1000,
            duration: playbackDuration / 1000,
          }}
        />
        <Controller
          {...{
            play: context.isPlaying,
            handlePlayPause,
            handleNext,
            handlePrevious,
            handleShuffle,
            handleRepeat,
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

export default Player
