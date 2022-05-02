import Slider from '@react-native-community/slider'
import { formatTime } from 'helpers/commons'
import { moveAudio, pause } from 'misc/audioController'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc'

function Progress(props) {
  const {
    time,
    duration,
    calculateProgressBar,
    setCurrentPosition,
    currentPosition,
    context,
  } = props

  return (
    <View>
      <Slider
        style={tw`mt-4 w-full`}
        minimumValue={0}
        maximumValue={1}
        value={calculateProgressBar()}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#ccc"
        onValueChange={(value) => {
          setCurrentPosition(formatTime(value * duration))
        }}
        onSlidingStart={async () => {
          if (!context.isPlaying) return
          try {
            await pause(context.playbackObj)
          } catch (error) {
            console.log('[Error inside slidingStart]: ', error.message)
          }
        }}
        onSlidingComplete={async (value) => {
          await moveAudio(context, value)
          setCurrentPosition(0)
        }}
      />
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={styles.time}>
          {currentPosition ? currentPosition : formatTime(time)}{' '}
        </Text>
        <Text style={styles.time}>{formatTime(duration)} </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  time: {
    fontSize: 12,
    color: '#fff',
  },
})

export default Progress
