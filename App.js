import AppProvider from 'context/AppProvider'
import Index from './index'
import { registerRootComponent } from 'expo'
import React from 'react'

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <Index />
      </AppProvider>
    )
  }
}

registerRootComponent(App)
