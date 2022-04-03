import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MusicFileProvider } from 'context/MusicFileContext'
import usePermission from 'hooks/usePermission'
import { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import Home from 'screens/Home'
import Login from 'screens/Login'
import Options from 'screens/Options'
import Register from 'screens/Register'

function App() {
  const Stack = createNativeStackNavigator()
  const [audioFiles, setAudioFiles] = useState([])
  const { getPermissions } = usePermission(setAudioFiles)

  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <MusicFileProvider value={{ audioFiles, setAudioFiles }}>
      <StatusBar showHideTransition='true' />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Options' component={Options} />
          {/* <Stack.Screen name='Playing' component={Playing} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </MusicFileProvider>
  )
}

export default App
