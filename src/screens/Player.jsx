import AppLogo from 'components/AppLogo'
import Controller from 'components/Controller'
import { AudioContext } from 'context/AudioProvider'
import { changeAudio, selectAudio } from 'misc/audioController'
import { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import Progress from "../components/Progress";

function Player() {
  const context = useContext(AudioContext)
  const [currentPosition, setCurrentPosition] = useState(0)
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
    await selectAudio(context.currentAudio, context)
  }

  const handleNext = async () => {
    await changeAudio(context, 'next')
  }

  const handlePrevious = async () => {
    await changeAudio(context, 'previous')
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
            setCurrentPosition,
            currentPosition,
            context,
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

export default Player
