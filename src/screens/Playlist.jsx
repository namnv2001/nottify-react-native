import { View, Text, StyleSheet } from 'react-native'

function Playlist() {
  return (
    <View style={styles.container}>
      <Text>Playlist</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Playlist
