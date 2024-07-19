import './App.css'
import LayeredImage from './components/LayeredImage'
import Scanner from './components/Scanner'
import { generateCat } from './data/attributes'
import { CatImage, generateCatImage } from './data/layers'

function App() {

  const cat_image: CatImage = generateCatImage()

  const cat = generateCat()

  return (
    <main>
      <h1>Forever Home</h1>
      <LayeredImage cat={cat_image} />
      <p>Name : {cat.name}</p>
      <Scanner/>
    </main>
  )
}

export default App
