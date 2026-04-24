import { useState } from 'react'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(10)
  const [bgColor, setBgColor] = useState('bg-white')

  return (
    <>  
      {/* counter section */}
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
      {/* End of the counter section. */}

      {/* Card section */}
      <div className='container-md mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10'>
          <Card 
            title="Card 1" 
            description="This is the first card." 
            imageUrl="https://picsum.photos/301" 
          />
          <Card 
            title="Card 2" 
            description="This is the second card." 
            imageUrl="https://picsum.photos/302" 
          />
          <Card 
            title="Card 3" 
            description="This is the third card." 
            imageUrl="https://picsum.photos/303" 
          />
        </div>
      </div>
      {/* End of the card section. */}

      {/* Background Color Changer */}
      <div className='my-10 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Background Color Changer</h2>
          <div className={`p-10 rounded-lg mb-4 max-w-md mx-auto border border-gray-300 ${bgColor}`}>
            <p className='text-gray-700'>Click a button below to change the background color of this box.</p>
          </div>  

        <div className='flex justify-center gap-4'>
          <button 
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'
            onClick={() => setBgColor('bg-green-200')}
          >
            Green
          </button>

          <button 
            className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg'
            onClick={() => setBgColor('bg-yellow-200')}
          >
            Yellow
          </button>

          <button 
            className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg'
            onClick={() => setBgColor('bg-purple-200')}
          >
            Purple
          </button>

          <button 
            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg'
            onClick={() => setBgColor('bg-gray-200')}
          >
            Gray
          </button>
        </div>
      </div>
      {/* End of  Background Color Changer */}
      

    </>
  )
}

export default App
