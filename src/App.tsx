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
  const [tradeOpen, setTradeOpen] = useState(false)
  const { userID, currentState, refreshState } = useContext(GameContext)

  const WS_URL = `${API_ENDPOINT}/ws/${currentState?.player?.id}`

  const onMessage = () => {
    console.log("Recieved Message")
    if(userID){
      refreshState(userID)
      setTradeOpen(false)
    }
  }

  const { sendJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
      onMessage
    },
  )

  useEffect(() => {
    console.log("Connection state changed")
    console.log(currentState)
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "general-chatroom",
        },
      })
    }
  }, [readyState])

  if (!userID || !currentState){
    return <Join />
  }

  return (
    <main className='font-roboto'>
      {currentState &&
        <>
          <h1 className='mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl font-exo'>Forever Home</h1>
          <Trade isOpen={tradeOpen} setIsOpen={setTradeOpen}/>
          {! tradeOpen &&
            <div className='flex flex-col items-center'>
              <div className='m-3 flex space-x-8'>
                <Score score={currentState.player.pet_compatibility} />
                <button onClick={() => {setTradeOpen(true)}} className='bg-slate-200 px-4 py-2 rounded-md mx-2'>Swap Pets</button>
              </div>
              <div className='m-2 drop-shadow-md my-2'>
                <LayeredImage attributes={currentState.player.attributes} />
                <p className='text-center bg-white text-xl -mt-2 pb-2 '><code>CLIENT NAME:</code><span className='font-grape text-4xl px-2'>{currentState.player.attributes["name"]}</span></p>
              </div>
              <div className='m-2 drop-shadow-md my-2'>
                <LayeredImage attributes={currentState.player.pet.attributes} />
                <p className='text-center bg-white text-xl -mt-2 pb-2'><code>PET NAME:</code><span className='font-grape text-4xl px-2'>{currentState.player.pet.attributes["name"]}</span></p>
              </div>
              {/* <button className='text-slate-300'>Need Help?</button> */}
            </div>
          }
        </>
      }
    </main>
  )
}

export default App
