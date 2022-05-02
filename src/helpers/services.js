export const authentication = async (props) => {
  const { action, data } = props
  try {
    const response = await fetch(`http://localhost:5000/api/auth/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log('Error inside authentication: ', error)
  }
}

export const zing = async (props) => {
  const { action, keyword } = props
  try {
    const response = await fetch(`http://localhost:5000/api/zing/${action}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(keyword ? keyword : ''),
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log('Error inside zing: ', error)
  }
}
