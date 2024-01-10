import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charsAllowed, setCharsAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numberAllowed) string += "0123456789"
    if (charsAllowed) string += "!@#$%^&*()_+~`|}{[]:;?><,./-="


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1)
      pass += string.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charsAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    // as we are working in react we can directly use window object. If we were to use Next.js where code is rendered on server side, the window object is not availabe with us.
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charsAllowed, passwordGenerator])


  function changeEnterButtonStyle() {
    const button = document.querySelector('button')
    button.classList.add('bg-blue-600')
    button.classList.remove('bg-blue-700')
  }

  function changeLeaveButtonStyle() {
    const button = document.querySelector('button')
    button.classList.add('bg-blue-700')
    button.classList.remove('bg-blue-600')
  }

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef} 
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard} onMouseEnter={changeEnterButtonStyle} onMouseLeave={changeLeaveButtonStyle}>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={5}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charsAllowed}
              id="charsInput"
              onChange={() => {
                setCharsAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charsInput">Characters</label>
          </div>
          
        </div>
        
      </div>
    </>
  )
}

export default App
