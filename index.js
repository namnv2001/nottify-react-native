import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppContext } from 'context/AppProvider'
import AudioProvider from 'context/AudioProvider'
import AppNavigator from 'navigation/AppNavigator'
import { useContext } from 'react'
import { StatusBar } from 'react-native'
import Login from 'screens/Login'
import Register from 'screens/Register'

function Index() {
  const { loggedIn } = useContext(AppContext)
  const Stack = createNativeStackNavigator()

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

export default Index
