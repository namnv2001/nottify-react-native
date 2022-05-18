import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions } from 'helpers/screenOptions'
import AudioList from 'screens/AudioList'
import Player from 'screens/Player'
import Playlist from 'screens/Playlist'
import PlaylistDetail from 'screens/PlayListDetail'
import Search from 'screens/Search'
import Settings from 'screens/Settings'
import tw from 'style/tailwind'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const PlayListScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlayList" component={Playlist} />
      <Stack.Screen name="PlayListDetail" component={PlaylistDetail} />
    </Stack.Navigator>
  )
}

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        headerShown: false,
        tabBarStyle: tw`bg-primary py-4 h-20 border-t-0`,
        tabBarActiveTintColor: '#4ECCA3',
        detachInactiveTabs: true,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="AudioList" component={AudioList} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Player" component={Player} />
      <Tab.Screen name="Playlist" component={PlayListScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default AppNavigator
