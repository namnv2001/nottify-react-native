import { createContext, Component } from 'react'

export const AppContext = createContext()

export class AppProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
    }
  }

  updateState = (prevState, newState) => {
    this.setState({ ...prevState, ...newState })
  }

  render() {
    const { loggedIn } = this.state
    return (
      <AppContext.Provider value={{ loggedIn, updateState: this.updateState }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppProvider
