import { useState } from 'react'

function App() {
  const [count,  setCount]  = useState(10)
  const [count2, setCount2] = useState(20)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  return (
    <>
      <div>
        <h1>Count 1: {count}</h1>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <p>Note: This is a simple counter app built using React. It demonstrates the use of the useState hook to manage state in a functional component.</p>
      </div>
      
      <div>
        <h1>Count 2: {count2}</h1>
        <button onClick={() => setCount2(count2 + 1)}>Increment</button>
        <button onClick={() => setCount2(count2 - 1)}>Decrement</button>
        <p>Note: This is another counter that operates independently from the first one, showcasing how multiple state variables can be managed within the same component.</p>
      </div>
    </>
  )
}

export default App
