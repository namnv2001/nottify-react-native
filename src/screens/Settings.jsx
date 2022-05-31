import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'style/tailwind';
import React, {useContext, useState} from 'react';
import { authentication } from 'helpers/services'
import { AppContext } from 'context/AppProvider'
import Navigator from 'components/Navigator'



function Settings({navigation}) {

    const appContext = useContext(AppContext)
    const data = { username: appContext.username}

    const [logoutError, setLogoutError] = useState('')
    
    const handleLogout = React.useCallback(async () => {
      
      const res = await authentication({ action: 'logout', data })
      try {
        if (res.status === 401) {
          setLogoutError(res.message)
        } else {    
          appContext.updateState(appContext, {
            loggedIn: false,
          })
          navigation.navigate({ name: 'Login' })  
        }
      } catch (error) {
        console.log(error.message)
        setLogoutError = error.message;
      }
    },[])

  return (
    <View style={tw`px-8 bg-secondary h-full justify-center `}>
        <TouchableOpacity style={tw`mt-8 flex-row items-center bg-thirdly rounded-xl justify-center`}
          onPress={handleLogout}>
          <Text style={tw`text-lg p-4 px-4 text-white `}> Logout </Text>
        </TouchableOpacity>
        <Text style={styles.error}>{logoutError}</Text>
    </View>
  )
}

  const styles = StyleSheet.create({
    error: {
      fontSize: 12,
      color: 'red',
      marginTop: 8,
      textAlign: 'center'
    }
  })

export default Settings
