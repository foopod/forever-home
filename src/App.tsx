import { useContext, useState } from 'react'
// import useWebSocket, { ReadyState } from "react-use-websocket"
import './App.css'
import LayeredImage from './components/LayeredImage'
import { PetImage, generatePetImage } from './data/layers'
import Join from './components/Join'
import Trade from './components/Trade'
import { GameContext } from './context/GameContext'

function App() {
  const [tradeOpen, setTradeOpen] = useState(false)
  const cat_image: PetImage = generatePetImage()
  const { currentState } = useContext(GameContext)

  // const WS_URL = "http://127.0.0.1:3000/ws"

  // const { sendJsonMessage, lastJsonMessage, sendMessage, lastMessage, readyState } = useWebSocket(
  //   WS_URL,
  //   {
  //     share: false,
  //     shouldReconnect: () => true,
  //   },
  // )
  // useEffect(() => {
  //   console.log("Connection state changed")
  //   if (readyState === ReadyState.OPEN) {
  //     sendJsonMessage({
  //       event: "subscribe",
  //       data: {
  //         channel: "general-chatroom",
  //       },
  //     })
  //   }
  // }, [readyState])

  // Run when a new WebSocket message is received (lastJsonMessage)
  // useEffect(() => {
  //   console.log(`Got a new message: ${lastJsonMessage}`)
  // }, [lastJsonMessage])

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
          <div>
            {JSON.stringify(currentState)}
          </div>
          <LayeredImage pet={cat_image} />
        </div>
      }
    </main>
  )
}

export default App
