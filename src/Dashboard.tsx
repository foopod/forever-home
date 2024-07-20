import { useState } from 'react'
import QRCode from "react-qr-code"
// import useWebSocket, { ReadyState } from "react-use-websocket"
import './App.css'
// import LayeredImage from './components/LayeredImage'
// import { PetImage, generatePetImage } from './data/layers'
import LeaderboardPlayer from './components/dashboard/LeaderboardPlayer'
import TradeEvent from './components/dashboard/TradeEvent'


function Dashboard() {
  const generatePetImage = () => {
    return {"accessory":"acc_tan","base":"body_brown","eyes":"eyes_gold","mouth":"mouth_whiskers","species":"cat"}
  }

  // const cat_image: any = generatePetImage()
  // const WS_URL = "http://127.0.0.1:3000/dashboard/ws"

  const [leaderboard] = useState([{
    id: 123213,
    name: "Henry Jenkins",
    attributes: generatePetImage(),
    currentPet: {
      id: 12312,
      name: "Spunky",
      attributes: generatePetImage(),
    }
  }, {
    id: 11212,
    name: "Bok Choi",
    attributes: generatePetImage(),
    currentPet: {
      id: 12312,
      name: "Charles III",
      attributes: generatePetImage(),
    }
  }, {
    id: 11212,
    name: "Bok Choi",
    attributes: generatePetImage(),
    currentPet: {
      id: 12312,
      name: "Charles III",
      attributes: generatePetImage(),
    }
  }, {
    id: 11212,
    name: "Bok Choi",
    attributes: generatePetImage(),
    currentPet: {
      id: 12312,
      name: "Charles III",
      attributes: generatePetImage(),
    }
  }, {
    id: 11212,
    name: "Bok Choi",
    attributes: generatePetImage(),
    currentPet: {
      id: 12312,
      name: "Charles III",
      attributes: generatePetImage(),
    }
  }])
  const [tradeEvents] = useState([{
    person1: {
      id: 123213,
      name: "Henry Jenkins",
      attributes: generatePetImage(),
    },
    pet1: {
      id: 12312,
      name: "Spunky",
      attributes: generatePetImage(),
    },
    person2: {
      id: 11212,
      name: "Bok Choi",
      attributes: generatePetImage(),
    },
    pet2: {
      id: 12312,
      name: "Charles III",
      attributes: generatePetImage(),
    },
  }, {
    person1: {
      id: 123213,
      name: "Henry Jenkins",
      attributes: generatePetImage(),
    },
    pet1: {
      id: 12312,
      name: "Spunky",
      attributes: generatePetImage(),
    },
    person2: {
      id: 11212,
      name: "Bok Choi",
      attributes: generatePetImage(),
    },
    pet2: {
      id: 12312,
      name: "Charles III",
      attributes: generatePetImage(),
    },
  }, {
    person1: {
      id: 123213,
      name: "Henry Jenkins",
      attributes: generatePetImage(),
    },
    pet1: {
      id: 12312,
      name: "Spunky",
      attributes: generatePetImage(),
    },
    person2: {
      id: 11212,
      name: "Bok Choi",
      attributes: generatePetImage(),
    },
    pet2: {
      id: 12312,
      name: "Charles III",
      attributes: generatePetImage(),
    },
  }])

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
    <main className='text-left font-roboto w-full h-full'>
      <h1 className='mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl font-exo'>Forever Home</h1>
      <div className="flex flex-col gap-8">
        <div className="flex w-full gap-8">
          <div className="w-3/5">
            <h2 className='mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl font-exo'>Leaderboard</h2>
            <div className="flex flex-col gap-2">
              {
                leaderboard.map(function(player, index){
                  return <LeaderboardPlayer player={player} position={index+1} />
                })
              }
            </div>
          </div>
          <div className="w-2/5">
          <h2 className='mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl font-exo'>Last Trades</h2>
            <div className="flex flex-col gap-2">
              {
                tradeEvents.map(function(trade){
                  return <TradeEvent trade={trade} />
                })
              }
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between items-end">
          <div className="text-4xl">
            <div className="flex gap-4">
              <span className="w-16 font-extrabold">52</span>
              <span>players</span>
            </div>
            <div className="flex gap-4">
              <span className="w-16 font-extrabold">75%</span>
              <span>total harmony</span>
            </div>
            <div className="flex gap-4">
              <span className="w-16 font-extrabold">75%</span>
              <span>total helpfulness</span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-4xl font-extrabold">Join here:</span>
            <QRCode
                size={256}
                className="max-md:h-max max-md:w-full"
                value={"http://127.0.0.1:3000/"}
                viewBox={`0 0 256 256`}
            />
          </div>

        </div>
      </div>
    </main>
  )
}

export default Dashboard
