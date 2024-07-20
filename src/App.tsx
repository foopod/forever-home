import { useState } from 'react'
import './App.css'
import LayeredImage from './components/LayeredImage'
import Scanner from './components/Scanner'
import { PetImage, generatePetImage } from './data/layers'
import Join from './components/Join'

function App() {

  const [scannerOpen, setScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState('')

  const cat_image: PetImage = generatePetImage()

  const toggleScan = () => {
    setScannerOpen(prev => !prev)
  }

  return (
    <main>
      <Join />
      <h1 className='mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl'>Forever Home</h1>
      {scannerOpen &&
        <>
          <Scanner isActive={scannerOpen} setIsActive={setScannerOpen} setResult={setScanResult}/>
        </>
        
      }
      {! scannerOpen &&
        <div className='flex flex-col items-center'>
          <div className='m-3 flex space-around'>
            <span className='bg-green-500 text-white px-4 py-2 rounded-md mx-2'>78% Match</span>
            <button onClick={toggleScan} className='bg-slate-200 px-4 py-2 rounded-md mx-2'>Trade Pets</button>
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
