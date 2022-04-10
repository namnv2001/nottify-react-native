import Icon from 'react-native-vector-icons/Ionicons'

// icons for tab navigation
export const screenOptions = (route, color) => {
  let iconName
  switch (route.name) {
    case 'AudioList':
      iconName = 'musical-notes-outline'
      break
    case 'Player':
      iconName = 'headset-outline'
      break
    case 'Playlist':
      iconName = 'radio-outline'
      break
    case 'Search':
      iconName = 'search-outline'
      break
    case 'Settings':
      iconName = 'settings-outline'
      break
    default:
      break
  }
  return <Icon name={iconName} color={color} size={24} />
}
