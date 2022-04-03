import PlayBox from 'components/PlayBox'
import Song from 'components/Song'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SongFilter from 'components/SongFilter'

function SongList(props) {
  const { audioFiles, handleAudioPress, currentAudio, navigation } = props

  return (
    <>
      <SongFilter />
      <PlayBox currentAudio={currentAudio} />
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
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    height: 480,
    overflow: 'scroll',
  },
})

export default SongList
