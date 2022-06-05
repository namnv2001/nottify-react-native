import { AppContext } from 'context/AppProvider'
import { authentication } from 'helpers/services'
import React, { useContext, useState, useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'style/tailwind'

function Settings() {
  const appContext = useContext(AppContext)
  const data = { username: appContext.username }

  const [logoutError, setLogoutError] = useState('')

  const handleLogout = useCallback(async () => {
    const res = await authentication({ action: 'logout', data })
    try {
      if (res.status === 401) {
        setLogoutError(res.message)
      } else {
        appContext.updateState(appContext, {
          loggedIn: false,
        })
      }
    } catch (error) {
      setLogoutError = error.message
    }
  }, [data])

  return (
    <View style={tw`px-8 bg-secondary h-full justify-center`}>
      <TouchableOpacity
        style={tw`mt-8 flex-row items-center bg-thirdly rounded-xl justify-center`}
        onPress={handleLogout}
      >
        <Text style={tw`text-lg p-4 px-4 text-white`}>Logout </Text>
      </TouchableOpacity>
      {logoutError ? <Text style={styles.error}>{logoutError}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
})

export default Settings
