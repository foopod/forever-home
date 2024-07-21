import { useEffect, useState } from 'react'
import QRCode from "react-qr-code"
// import useWebSocket, { ReadyState } from "react-use-websocket"
import './App.css'
// import LayeredImage from './components/LayeredImage'
// import { PetImage, generatePetImage } from './data/layers'
import LeaderboardPlayer from './components/dashboard/LeaderboardPlayer'
import TradeEvent from './components/dashboard/TradeEvent'
import { WS_ENDPOINT, API_ENDPOINT } from './environment'
import useWebSocket, { ReadyState } from 'react-use-websocket'

function Dashboard() {
  const WS_URL = `${WS_ENDPOINT}/dashboard/ws/`
  const [tradeEvents, setTradeEvents] = useState([])
  const [leaders, setLeaders] = useState([])
  const [playerCount, setPlayerCount] = useState([])

  const onMessage = (message: any) => {
    const data = JSON.parse(message.data)
    if(data.msgtype == "notify-trade"){
      const updated_events = JSON.parse(JSON.stringify(tradeEvents))
      // pop front if longer than 5
      if(updated_events.length > 5){
        updated_events.pop()
      }
      updated_events.unshift({
        person1: data.player1,
        person2: data.player2
      })
      setTradeEvents(updated_events)
    } else if(data.msgtype == "update-leaderboard"){
      if(data.leaders){
        setLeaders(data.leaders)
        setPlayerCount(data.player_count)
      }
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
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "dashboard",
        },
      })
    }
  }, [readyState])

  return (
    <main className='text-left font-roboto w-full h-full'>
      <h1 className='mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl font-exo'>Forever Home</h1>
      <div className="flex flex-col gap-8">
        <div className="flex w-full gap-8">
          <div className="w-2/5">
            <h2 className='mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl font-exo'>Leaderboard</h2>
            <div className="flex flex-col gap-2">
              {
                leaders.map(function(player, index){
                  return <LeaderboardPlayer player={player} position={index+1} key={JSON.stringify(player)} />
                })
              }
            </div>
          </div>
          <div className="w-2/5">
            <h2 className='mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl font-exo'>Last Trades</h2>
              <div className="flex flex-col gap-2">
                {
                  tradeEvents.map(function(trade){
                    return <TradeEvent trade={trade} key={JSON.stringify(trade)} />
                  })
                }
              </div>
            </div>
          <div className="w-1/5">
            <span className="text-4xl font-extrabold">Join here:</span>
            <QRCode
                size={256}
                className="max-md:h-max max-md:w-full"
                value={API_ENDPOINT}
                viewBox={`0 0 256 256`}
            />
          </div>
          </div>

        <div className="w-full flex justify-between items-end">
          <div className="text-4xl">
            <div className="flex gap-4">
              <span className="w-16 font-extrabold">{playerCount}</span>
              <span>players</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
