import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    getUsername()
  }, [username])

  const getUsername = async () => {
    const result = await window.api.getProfileInfo()
    setUsername(result)
  }

  console.log(username)

  return <h1 className="text-3xl font-bold underline">{username}</h1>
}

export default App
