// imports
import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

// Main App Function
function App() {
  // States
  const [length, setLength] = useState('8');
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [password, setPassword] = useState('');


  //Password Reference
  const passwordRef = useRef(null);

  //Password Generator function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";

    for (let i = 1; i <= Number(length); i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  //Display message function
  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  }

  //Copy to clipboard function
  const copyPwdToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    handleClick()
  }, [password])

  //Calling Password Generator Function
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      {/* Main Container */}
      <div className="min-h-screen w-full
      bg-gray-900 flex items-center justify-center p-4">

        {/* Card Container */}
        <div className="bg-slate-950 max-w-xl text-white p-8 rounded-2xl shadow-lg w-full">

          <h1 className="text-4xl font-bold text-center mb-8">Password Generator</h1>

          {/* Password Input */}
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 mb-4 placeholder-gray-400"
            readOnly
            ref={passwordRef}
          />

          {/* Copy Button */}
          <button
            onClick={copyPwdToClipboard}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors p-3 rounded-lg font-semibold mb-6 cursor-pointer">
            Copy
          </button>

          {/* Length Slider */}
          <div className="mb-6">
            <label
              htmlFor="length"
              className="block mb-2 font-medium text-gray-300"
            >Password Length: <span className="font-bold">{length}</span></label>
            <input
              type="range"
              id="length"
              min={6}
              max={32}
              value={length}
              className="w-full cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-row gap-4">

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                onChange={() => {
                  setNumAllowed(prev => !prev);
                }}
                className="form-checkbox h-5 w-5 text-indigo-600 cursor-pointer" />
              <span className="ml-3 text-gray-300">Include Numbers</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed(prev => !prev);
                }}
                className="form-checkbox h-5 w-5 text-indigo-600 cursor-pointer" />
              <span className="ml-3 text-gray-300">Include Symbols</span>
            </label>

            {/* Copy Text Msg */}
            <span className={`ml-24 text-orange-500 font-semibold transition-opacity duration-800 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>Copied!!!</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default App