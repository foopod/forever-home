import { useState } from 'react'
import './App.css'
import LayeredImage from './components/LayeredImage'
import Scanner from './components/Scanner'
import { generateCat } from './data/attributes'
import { CatImage, generateCatImage } from './data/layers'
import Join from './components/Join'

function App() {

  const [scannerOpen, setScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState('')

  const cat_image: CatImage = generateCatImage()
  const cat = generateCat()

  const toggleScan = () => {
    setScannerOpen(prev => !prev)
  }

  return (
    <main>
      <Join />
      <h1 className='text-3xl font-bold underline'>Forever Home</h1>
      {scannerOpen &&
        <>
          <Scanner isActive={scannerOpen} setIsActive={setScannerOpen} setResult={setScanResult}/>
        </>
        
      }
      {! scannerOpen &&
        <>
          <button onClick={toggleScan} className='bg-slate-200 px-4 py-2 rounded-md'>Scan</button>
          <LayeredImage cat={cat_image} />
          <p>Name : {cat.name}</p>
          <p>Result: {scanResult}</p>
        </>
      }
    </main>
  )
}

export default App
