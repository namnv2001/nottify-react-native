import { LOCAL_URL } from '@env'

// don't know why things are not working without this line so don't delete it :)
console.log("LOCAL_URL: ", LOCAL_URL)

export const authentication = async (props) => {
  const { action, data } = props
  try {
    const response = await fetch(`${LOCAL_URL}/api/auth/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log("Error inside authentication: ", error)
  }
}

export const zing = async (props) => {
  const { action, param } = props
  try {
    const response = await fetch(
      `http://localhost:5000/api/zing/${action}?${
        action === "search" ? "keyword" : "id"
      }=${param}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json())
    return response
  } catch (error) {
    console.log("Error inside zing: ", error)
  }
}
