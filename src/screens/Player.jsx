import AppLogo from 'components/AppLogo'
import Controller from 'components/Controller'
import Progress from 'components/Progress'
import { AudioContext } from 'context/AudioProvider'
import { useContext } from 'react'
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

  return (
    <View style={tw`px-8 justify-between h-full`}>
      <Text>{`${context.currentAudioIndex + 1} / ${
        context.totalAudioCount
      }`}</Text>
      <AppLogo />
      <View>
        <Text style={tw`text-lg font-bold`}>
          {context.currentAudio.filename}
        </Text>
        <Progress
          {...{
            calculateProgressBar,
            time: playbackPosition / 1000,
            duration: playbackDuration / 1000,
          }}
        />
        <Controller play={context.isPlaying} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

export default Player
