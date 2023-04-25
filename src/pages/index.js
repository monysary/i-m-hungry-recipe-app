import { useState } from "react"
import axios from "axios"

export default function Home() {
  const [test, setTest] = useState('')

  const testingAPI = async () => {
    try {
      const res = await axios.get('/api/hello')
      setTest(res.data.name)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Homepage</h1>
      <button onClick={testingAPI}>Check API</button>
      <p>{test}</p>
    </>
  )
}
