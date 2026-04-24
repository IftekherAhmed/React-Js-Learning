import { useState } from 'react'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(10)

  return (
    <>  
      <h1 className='text-3xl font-bold underline text-center text-blue-500'>
        Hello world!
      </h1>
      <b className='text-center block mt-2 text-gray-600'>
         The count is: {count}
      </b>
      <div className='flex justify-center gap-4 mt-4'>
        <button 
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg'
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
      </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10'>
          <Card />
          <Card />
          <Card />
        </div>
      

    </>
  )
}

export default App
