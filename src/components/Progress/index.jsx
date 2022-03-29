import { View, Text, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import tw from 'twrnc'

import { formatTime } from 'helpers/commons'

function Progress(props) {
  const { time, duration } = props

  return (
    <View>
      <Slider
        style={tw`mt-4 w-full`}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#ccc"
      />
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={styles.time}>{formatTime(time)} </Text>
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
