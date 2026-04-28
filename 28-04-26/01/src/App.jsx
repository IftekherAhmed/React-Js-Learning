import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    // 1. Create a "Guaranteed" array
    let guaranteedChars = [];

    if (numberAllowed) {
      str += "0123456789";
      // Pick one random number immediately
      const nums = "0123456789";
      guaranteedChars.push(nums.charAt(Math.floor(Math.random() * nums.length)));
    }

    if (charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
      // Pick one random character immediately
      const chars = "!@#$%^&*-_+=[]{}~`";
      guaranteedChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }

    // 2. Fill the rest of the password length
    // We subtract the length of our guaranteed characters
    const remainingLength = length - guaranteedChars.length;

    for (let i = 1; i <= remainingLength; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    // 3. Combine them and "Shuffle"
    // We add our guaranteed characters to the random string
    let finalResult = pass + guaranteedChars.join("");
    
    // Shuffle so the numbers aren't always at the end!
    finalResult = finalResult.split('').sort(() => Math.random() - 0.5).join('');

    setPassword(finalResult);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  const copyToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    // Main Wrapper: Centered, Dark Background
    <div className="w-full h-screen flex justify-center items-center bg-gray-900 px-4">
      
      {/* Card Container */}
      <div className="w-full max-w-md mx-auto shadow-2xl rounded-2xl p-8 bg-gray-800 text-orange-500 border border-gray-700">
        <h1 className="text-white text-3xl text-center font-bold mb-6">Password Generator</h1>
        
        {/* Input & Action Section */}
        <div className="flex shadow rounded-lg overflow-hidden mb-6 border border-gray-600">
          <input 
            type="text" 
            value={password} 
            className="outline-none w-full py-2 px-4 bg-gray-700 text-white font-mono text-lg"
            placeholder="Password"
            readOnly 
            ref={passwordRef} 
          />
          <button 
            onClick={copyToClipboard}
            className="outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 shrink-0 transition-all active:scale-95"
          >
            Copy
          </button>
        </div>

        {/* Configuration Section */}
        <div className="flex flex-col gap-y-4 text-sm font-medium">
          
          {/* Slider */}
          <div className="flex items-center gap-x-4">
            <input 
              type="range" 
              min={6} max={50} 
              value={length} 
              className="cursor-pointer accent-orange-500 w-full"
              onChange={(e) => setLength(e.target.value)} 
            />
            <label className="w-30">Length: {length}</label>
          </div>

          {/* Toggles & Refresh */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <input 
                type="checkbox" 
                className="w-4 h-4 accent-orange-500 cursor-pointer"
                defaultChecked={numberAllowed} 
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)} 
              />
              <label htmlFor="numberInput" className="cursor-pointer">Numbers</label>
            </div>

            <div className="flex items-center gap-x-2">
              <input 
                type="checkbox" 
                className="w-4 h-4 accent-orange-500 cursor-pointer"
                defaultChecked={charAllowed} 
                id="charInput"
                onChange={() => setCharAllowed((prev) => !prev)} 
              />
              <label htmlFor="charInput" className="cursor-pointer">Characters</label>
            </div>
          </div>

          {/* Random / Regenerate Button */}
          <button 
            onClick={generatePassword}
            className="w-full mt-2 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🔄</span> Generate New
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;