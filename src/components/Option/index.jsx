import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

function Option(props) {
  const { onPress, iconName, text } = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>
        <Icon name={iconName} size={30} color="#bbb" />
      </Text>
      <Text style={styles.text}>{text} </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 30,
  },
})

export default Option
