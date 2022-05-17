import { createContext, Component } from 'react'

export const AppContext = createContext()

export class AppProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
      focusColor: '#4ECCA3',
    }
  }

  updateState = (prevState, newState) => {
    this.setState({ ...prevState, ...newState })
  }

  render() {
    const { loggedIn, focusColor } = this.state
    return (
      <AppContext.Provider
        value={{ loggedIn, focusColor, updateState: this.updateState }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppProvider
