import * as MediaLibrary from 'expo-media-library'
import { Alert } from 'react-native'

function usePermission(setAudioFiles) {
  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })
    // ascending order
    media.assets.sort((a, b) =>
      a.filename > b.filename ? 1 : b.filename > a.filename ? -1 : 0,
    )
    setAudioFiles(media.assets)
  }

  const permissionAlert = () => {
    Alert.alert('Permission', 'Please allow access to your audio files', [
      {
        text: 'Ok',
        onPress: () => getPermissions(),
      },
      {
        text: 'Cancel',
        onPress: () => permissionAlert(),
      },
    ])
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
        permissionAlert()
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
