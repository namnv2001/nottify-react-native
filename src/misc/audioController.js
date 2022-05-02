import { storeAudioForNextOpening } from 'helpers/audio'

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

/* type definition
  status: {
    didJustFinish: boolean,
    isLoaded: boolean,
    isPlaying: boolean,
    isBuffering: boolean,
    rate: number,
    shouldPlay: boolean,
    volume: number,
    isMuted: boolean,
    isLooping: boolean,
    didJustFinish: boolean,
    positionMillis: number,
    durationMillis: number,
  }
  audio: {
     Object {
    "albumId": number,
    "creationTime": number,
    "duration": number,
    "filename": string,
    "height": number,
    "id": number,
    "mediaType": string,
    "modificationTime": number,
    "uri": string,
    "width": number,
  },
  }
*/

export const selectAudio = async (audio, context) => {
  const {
    playbackObj,
    soundObj,
    currentAudio,
    updateState,
    audioFiles,
    onPlaybackStatusUpdate,
  } = context
  try {
    // first time
    if (soundObj === null) {
      const status = await play(playbackObj, audio.uri)
      const index = audioFiles.indexOf(audio)
      updateState(context, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: index,
      })
      playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
      return storeAudioForNextOpening(audio, index)
    }

    // pause
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj)
      return updateState(context, {
        soundObj: status,
        isPlaying: false,
        playbackPosition: status.positionMillis,
      })
    }

    // resume
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj)
      return updateState(context, { soundObj: status, isPlaying: true })
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const index = audioFiles.indexOf(audio)
      const status = await playNext(playbackObj, audio.uri)
      updateState(context, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: index,
      })
      return storeAudioForNextOpening(audio, index)
    }
  } catch (error) {
    console.log('[Error inside selectAudio]: ', error.message)
  }
}

export const changeAudio = async (context, select) => {
  const {
    playbackObj,
    currentAudioIndex,
    totalAudioCount,
    shuffle,
    audioFiles,
    updateState,
  } = context
  try {
    let nextSongIndex
    if (shuffle) nextSongIndex = Math.floor(Math.random() * totalAudioCount)
    else if (select === 'next') nextSongIndex = currentAudioIndex + 1
    else if (select === 'previous') nextSongIndex = currentAudioIndex - 1
    const { isLoaded } = await playbackObj.getStatusAsync()
    const isLastAudio = nextSongIndex === totalAudioCount
    const isFirstAudio = currentAudioIndex <= 0
    let audio = audioFiles[nextSongIndex]
    let index
    let status
    // next
    if (select === 'next') {
      if (!isLoaded && !isLastAudio) {
        index = nextSongIndex
        status = await play(playbackObj, audio.uri)
      }
      if (isLoaded && !isLastAudio) {
        index = nextSongIndex
        status = await playNext(playbackObj, audio.uri)
      }
      if (isLastAudio) {
        index = 0
        audio = audioFiles[index]
        if (isLoaded) status = await playNext(playbackObj, audio.uri)
        else status = await play(playbackObj, audio.uri)
      }
    }
    if (select === 'previous') {
      // previous
      if (!isLoaded && !isFirstAudio) {
        index = nextSongIndex
        status = await play(playbackObj, audio.uri)
      }
      if (isLoaded && !isFirstAudio) {
        index = nextSongIndex
        status = await playNext(playbackObj, audio.uri)
      }
      if (isFirstAudio) {
        index = totalAudioCount - 1
        audio = audioFiles[index]
        if (isLoaded) status = await playNext(context.playbackObj, audio.uri)
        else status = await play(context.playbackObj, audio.uri)
      }
    }
    updateState(context, {
      currentAudio: audio,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    })
    storeAudioForNextOpening(audio, index)
  } catch (error) {
    console.log('[Error inside changeAudio]: ', error.message)
  }
}

export const moveAudio = async (context, value) => {
  const { soundObj, isPlaying, playbackObj, updateState } = context
  if (soundObj === null || !isPlaying) return
  try {
    const status = await playbackObj.setPositionAsync(
      Math.floor(soundObj.durationMillis * value),
    )
    updateState(context, {
      soundObj: status,
      playbackPosition: status.positionMillis,
    })
    await resume(playbackObj)
    updateState(context, {
      isPlaying: true,
      playbackPosition: status.positionMillis,
    })
  } catch (error) {
    console.log('[Error inside moveAudio]: ', error.message)
  }
}
