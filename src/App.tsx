import { useState } from 'react'
import './App.css'
import LayeredImage from './components/LayeredImage'
import Scanner from './components/Scanner'
import { generateCat } from './data/attributes'
import { CatImage, generateCatImage } from './data/layers'

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
      <h1>Forever Home</h1>
      {scannerOpen &&
        <>
          <Scanner isActive={scannerOpen} setIsActive={setScannerOpen} setResult={setScanResult}/>
        </>
        
      }
      {! scannerOpen &&
        <>
          <button onClick={toggleScan}>Scan</button>
          <LayeredImage cat={cat_image} />
          <p>Name : {cat.name}</p>
          <p>Result: {scanResult}</p>
        </>
      }
    </main>
  )
}

export default App
