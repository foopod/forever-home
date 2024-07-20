import { useContext, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from "react-use-websocket"
import './App.css'
import LayeredImage from './components/LayeredImage'
import Join from './components/Join'
import Trade from './components/Trade'
import { GameContext } from './context/GameContext'
import Score from './components/dashboard/Score'
import { API_ENDPOINT } from './environment'

function App() {
  const [joinOpen, setJoinOpen] = useState(true)
  const [tradeOpen, setTradeOpen] = useState(false)
  const { currentState, refreshState } = useContext(GameContext)

  const WS_URL = `${API_ENDPOINT}/ws/${currentState?.player?.id}`

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )

  useEffect(() => {
    console.log("Connection state changed")
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "general-chatroom",
        },
      })
    }
  }, [readyState])

  useEffect(() => {
    console.log("Recieved Message")
    if(currentState){
      refreshState()
      setTradeOpen(false)
    }
  }, [lastJsonMessage])

  return (
    <main className='font-roboto'>
      <Join isOpen={joinOpen} setIsOpen={setJoinOpen}/>

      {!joinOpen &&
        <>
          <h1 className='mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl font-exo'>Forever Home</h1>
          <Trade isOpen={tradeOpen} setIsOpen={setTradeOpen}/>
          {! tradeOpen &&
            <div className='flex flex-col items-center'>
              <div className='m-3 flex space-x-8'>
                <Score score={currentState.player.pet_compatibility} />
                <button onClick={() => {setTradeOpen(true)}} className='bg-slate-200 px-4 py-2 rounded-md mx-2'>Trade Pets</button>
              </div>
              <div className='m-2'>
                <p>Margaret</p>
                {/* <img src="https://placehold.co/400"/> */}
                <LayeredImage attributes={currentState.player.attributes} />
              </div>
              <div className='m-2'>
                <p>Bubbles</p>
                {/* <img src="https://placehold.co/400"/> */}
                <LayeredImage attributes={currentState.player.pet.attributes} />
              </div>
              <div>
                <code>DEBUG:
                {JSON.stringify(currentState)}</code>
              </div>

            </div>
          }
        </>
      }
    </main>
  )
}

export default App
