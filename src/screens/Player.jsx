import AppLogo from 'components/AppLogo'
import Controller from 'components/Controller'
import Progress from 'components/Progress'
import { AudioContext } from 'context/AudioProvider'
import { formatTime } from 'helpers/commons'
import { changeAudio, selectAudio } from 'misc/audioController'
import { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'

function Player() {
  const context = useContext(AudioContext)
  const [currentPosition, setCurrentPosition] = useState(0)
  const { playbackDuration, playbackPosition, currentAudio } = context

  const calculateProgressBar = () => {
    if (playbackDuration !== null && playbackPosition !== null) {
      return playbackPosition / playbackDuration
    }

    if (currentAudio.lastPosition) {
      return currentAudio.lastPosition / (currentAudio.duration * 1000)
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

  const renderCurrentTime = () => {
    if (!context.soundObj && currentAudio.lastPosition) {
      return formatTime(currentAudio.lastPosition / 1000)
    }
    return formatTime(playbackPosition / 1000)
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
            currentPosition: currentPosition
              ? currentPosition
              : renderCurrentTime(),
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
