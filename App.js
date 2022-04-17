import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AudioProvider from 'context/AudioProvider'
import { useState } from 'react'
import { StatusBar } from 'react-native'
import Login from 'screens/Login'
import Register from 'screens/Register'
import AppNavigator from 'navigation/AppNavigator'

function App() {
  const Stack = createNativeStackNavigator()
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <AudioProvider>
      <NavigationContainer>
        <StatusBar showHideTransition='true' />
        {!loggedIn ? (
          <>
            <Stack.Navigator
              initialRouteName='Register'
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name='Register' component={Register} />
              <Stack.Screen name='Login' component={Login} />
            </Stack.Navigator>
          </>
        ) : (
          <AppNavigator />
        )}
      </NavigationContainer>
    </AudioProvider>
  )
}

export default App
