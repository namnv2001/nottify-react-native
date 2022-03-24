import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react'

import { MusicFileProvider } from 'context/MusicFileContext'
import usePermission from 'hooks/usePermission'
import Home from 'screens/Home'
import Register from 'screens/Register'
import Login from 'screens/Login'
import Playlist from 'screens/Playlist'

function App() {
  const Stack = createNativeStackNavigator()
  const [audioFiles, setAudioFiles] = useState([])
  const { getPermissions } = usePermission(setAudioFiles)

  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <MusicFileProvider value={{ audioFiles, setAudioFiles }}>
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
    </MusicFileProvider>
  )
}

export default App
