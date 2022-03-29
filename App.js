import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { MusicFileProvider } from 'context/MusicFileContext'
import usePermission from 'hooks/usePermission'
import Register from 'screens/Register'
import Login from 'screens/Login'
import Playlist from 'screens/Playlist'
import Options from 'screens/Options'
import Playing from 'screens/Playing'

function App() {
  const Stack = createNativeStackNavigator()
  const [audioFiles, setAudioFiles] = useState([])
  const { getPermissions } = usePermission(setAudioFiles)

  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <MusicFileProvider value={{ audioFiles, setAudioFiles }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Playlist'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Playlist' component={Playlist} />
          <Stack.Screen name='Options' component={Options} />
          <Stack.Screen name='Playing' component={Playing} />
        </Stack.Navigator>
      </NavigationContainer>
    </MusicFileProvider>
  )
}

export default App
