import { useState, useCallback } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charsAllowed, setCharsAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numberAllowed) string += "0123456789"
    if(charsAllowed) string += "!@#$%^&*()_+~`|}{[]:;?><,./-="


    for(let i=1; i<=Array.length; i++){
      let char = Math.floor(Math.randon() * string.length+1)
      pass += string.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charsAllowed, setPassword])

  return (
    <>
      <h1 className='text-4xl text-center text-gray-500'>password generator</h1>
    </>
  )
}

export default App
