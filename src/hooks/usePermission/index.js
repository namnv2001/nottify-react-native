import * as MediaLibrary from 'expo-media-library'

function usePermission(setAudioFiles) {
  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })
    setAudioFiles(media.assets)
  }

  const getPermissions = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    if (permission.granted) {
      getAudioFiles()
    }
    if (!permission.canAskAgain && !permission.granted) {
      console.log('User denied and we can not ask again')
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync()
      if (status === 'denied' && canAskAgain) {
        alert('You need to allow access to your media library')
        getPermissions()
      }
      if (status === 'granted') {
        getAudioFiles()
      }
      if (status === 'denied' && !canAskAgain) {
        alert('You need to allow access to your media library')
      }
    }
  }
  return { getPermissions }
}

export default usePermission