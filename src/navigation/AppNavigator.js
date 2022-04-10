import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { screenOptions } from 'helpers/screenOptions'
import AudioList from 'screens/AudioList'
import Player from 'screens/Player'
import Playlist from 'screens/Playlist'
import Search from 'screens/Search'
import Settings from 'screens/Settings'

const Tab = createBottomTabNavigator()

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        headerShown: false,
      })}
    >
      <Tab.Screen name="AudioList" component={AudioList} />
      <Tab.Screen name="Player" component={Player} />
      <Tab.Screen name="Playlist" component={Playlist} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default AppNavigator
