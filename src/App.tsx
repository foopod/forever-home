import { useState } from 'react'
import './App.css'
import LayeredImage from './components/LayeredImage'
import { PetImage, generatePetImage } from './data/layers'
import Join from './components/Join'
import Trade from './components/Trade'

function App() {
  const [tradeOpen, setTradeOpen] = useState(false)
  const cat_image: PetImage = generatePetImage()

  return (
    <main className='font-roboto'>
      <Join />
      <h1 className='mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl font-exo'>Forever Home</h1>
      <Trade userID='128471d' isOpen={tradeOpen} setIsOpen={setTradeOpen}/>
      {! tradeOpen &&
        <div className='flex flex-col items-center'>
          <div className='m-3 flex space-around'>
            <span className='bg-green-500 text-white px-4 py-2 rounded-md mx-2'>78% Match</span>
            <button onClick={() => {setTradeOpen(true)}} className='bg-slate-200 px-4 py-2 rounded-md mx-2'>Trade Pets</button>
          </div>
          <div className='m-2'>
            <p>Margaret</p>
            <img src="https://placehold.co/400"/>
          </div>
          <div className='m-2'>
            <p>Bubbles</p>
            <img src="https://placehold.co/400"/>
          </div>
          <LayeredImage pet={cat_image} />
        </div>
      }
    </main>
  )
}

export default App
