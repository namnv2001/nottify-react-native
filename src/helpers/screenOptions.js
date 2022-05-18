import Icon from 'react-native-vector-icons/Ionicons'

// icons for tab navigation
export const screenOptions = (route, color) => {
  let iconName
  switch (route.name) {
    case 'AudioList':
      iconName = 'musical-notes'
      break
    case 'Player':
      iconName = 'headset'
      break
    case 'Playlist':
      iconName = 'radio'
      break
    case 'Search':
      iconName = 'search'
      break
    case 'Settings':
      iconName = 'settings'
      break
    default:
      break
  }
  return <Icon name={iconName} color={color} size={26} />
}
