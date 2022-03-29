// play audio
export const play = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync({ uri }, { shouldPlay: true })
  } catch (err) {
    console.log('Error inside play helper: ', err.message)
  }
}

// pause audio
export const pause = async (playbackObj) => {
  try {
    return await playbackObj.setStatusAsync({ shouldPlay: false })
  } catch (err) {
    console.log('Error inside pause helper: ', err.message)
  }
}

// resume audio
export const resume = async (playbackObj) => {
  try {
    return await playbackObj.playAsync()
  } catch (err) {
    console.log('Error inside resume helper: ', err.message)
  }
}

// select another audio
export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync()
    await playbackObj.unloadAsync()
    return await play(playbackObj, uri)
  } catch (err) {
    console.log('Error inside playNext helper: ', err.message)
  }
}
