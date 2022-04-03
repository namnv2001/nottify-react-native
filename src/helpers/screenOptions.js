import Icon from 'react-native-vector-icons/Ionicons'

// icons for tab navigation
export const screenOptions = (route, color) => {
  let iconName
  switch (route.name) {
    case 'Playlist':
      iconName = 'musical-notes-outline'
      break
    case 'Search':
      iconName = 'search-outline'
      break
    default:
      break
  }
  return <Icon name={iconName} color={color} size={24} />
}
