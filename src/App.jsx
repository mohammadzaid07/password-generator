import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numberAllowed) str += '0123456789'
    if (symbolAllowed) str += '!@#$%&*?'
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, symbolAllowed])

  const copyPwdToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, symbolAllowed])


  return (
    <div className='w-full max-w-lg mx-auto shadow-md rounded-lg p-4 py-3 my-40 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input
          type='text'
          value={password}
          className='w-full bg-white text-gray-700 outline-none py-1 px-3 '
          placeholder='Password'
          readonly
          ref={passwordRef} />
        <button
          onClick={copyPwdToClipboard}
          className='outline-none  bg-blue-700 text-white px-3 py-0.5 shrink-0 '>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            name=''
            id=''
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor='length'>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            name=''
            id=''
            defaultChecked={numberAllowed}
            onChange={() => { setNumberAllowed((prev) => !prev) }}
            className='cursor-pointer'
          />
          <label htmlFor='number'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            name=''
            id=''
            defaultChecked={symbolAllowed}
            onChange={() => { setSymbolAllowed((prev) => !prev) }}
            className='cursor-pointer'
          />
          <label htmlFor='Symbols'>Symbols</label>
        </div>
        <div className='flex items-center gap-x-1'>
          {copied && (
            <span className="ml-5 text-white drop-shadow-[0_0_6px_#ed8936]">
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default App