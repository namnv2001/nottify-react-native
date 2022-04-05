import PlayBox from 'components/PlayBox'
import Song from 'components/Song'
import SongFilter from 'components/SongFilter'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'

function SongList(props) {
  const { audioFiles, handleAudioPress, currentAudio, navigation } = props

  return (
    <View style={tw`px-4 relative`}>
      <SongFilter />
      {/* <PlayBox currentAudio={currentAudio} /> */}
      <KeyboardAwareScrollView style={styles.list}>
        {audioFiles &&
          audioFiles.map((audioFile) => (
            <Song
              key={audioFile.id}
              onPress={() => handleAudioPress(audioFile)}
              navigation={navigation}
              data={audioFile}
            />
          ))}
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    height: '88%',
    overflow: 'scroll',
  },
})

export default SongList
