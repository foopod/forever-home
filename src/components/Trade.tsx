import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import QRCode from "react-qr-code"
import Scanner from "./Scanner"
import { Audio } from "react-loader-spinner"
import { GameContext } from "../context/GameContext"

interface Props {
    userID: string
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Trade: React.FC<Props> = ({userID, isOpen, setIsOpen}) => {
    const [scannerOpen, setScannerOpen] = useState(false)
    const [scanResult, setScanResult] = useState('')
    const [loading, setLoading] = useState(false)
    const { currentState, setCurrentState } = useContext(GameContext)

    const toggleScan = () => {
      setScannerOpen(prev => !prev)
    }

    const handleScan = async (result: string) => {
        // result should be a userID
        setLoading(true)

        // call trade api
        const response = await fetch(`http://localhost:8080/api/swap/${currentState.player.id}/${result}`)
        const json = await response.json()
        setCurrentState(json)

        setLoading(false)
        // At the end close scanner
        setScannerOpen(false)
    }
    
    useEffect(() => {
        const close = () => { setScannerOpen(false)}
        window.history.pushState({}, '', '/')
        window.addEventListener("popstate", close)
  
        return (window.removeEventListener("popstate", close))
      }, [])

    return(
        <> {
            isOpen &&
                <div className="w-full h-full bg-white absolute top-0 left-0 flex flex-col justify-center">
                    { !loading &&
                        <>
                            <div className="m-5">
                                <QRCode
                                    size={256}
                                    className="max-md:h-max max-md:w-full"
                                    value={userID}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <button onClick={toggleScan} className='bg-slate-200 px-4 py-2 rounded-md mx-2'>Scan a QR</button>
                            <div className='absolute top-0 right-0' onClick={() =>  {setIsOpen(false)}}>
                                <FaTimes color='black' size={"4em"}/>
                            </div>
                        </>
                    }
                    { loading &&
                        <Audio
                            height="100"
                            width="100"
                            color="#4fa94d"
                            ariaLabel="audio-loading"
                            wrapperStyle={{}}
                            wrapperClass="wrapper-class"
                            visible={true}
                        />
                    }
                    {scannerOpen &&
                        <>
                            <Scanner isActive={scannerOpen} setIsActive={setScannerOpen} handleScan={handleScan}/>
                        </>
                    }
                </div>

            }
        </>
    )
}

export default Trade