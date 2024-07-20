import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import QRCode from "react-qr-code"
import Scanner from "./Scanner"

interface Props {
    userID: string
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Trade: React.FC<Props> = ({userID, isOpen, setIsOpen}) => {
    const [scannerOpen, setScannerOpen] = useState(false)
    const [scanResult, setScanResult] = useState('')

    const toggleScan = () => {
      setScannerOpen(prev => !prev)
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
                    <p>{scanResult}</p>
                    
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
                    {scannerOpen &&
                        <>
                            <Scanner isActive={scannerOpen} setIsActive={setScannerOpen} setResult={setScanResult}/>
                        </>
                    }
                </div>

            }
        </>
    )
}

export default Trade