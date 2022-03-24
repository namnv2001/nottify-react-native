import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from 'screens/Home'
import Register from 'screens/Register'
import Login from 'screens/Login'
import Playlist from 'screens/Playlist'

function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Playlist'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Playlist' component={Playlist} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
