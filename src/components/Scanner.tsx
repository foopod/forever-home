import QrScanner from 'qr-scanner';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';


interface Props {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  handleScan: (result: string) => void
}

const Scanner: React.FC<Props> = ({ isActive, setIsActive, handleScan }) => {
    const scanner = useRef<QrScanner>();
    const videoEl = useRef<HTMLVideoElement>(null);
    const [scanResult, setScanResult] = useState("")

    useEffect(() => {
      const close = () => { setIsActive(false)}
      window.history.pushState({}, '', '/')
      window.addEventListener("popstate", close)

      return (window.removeEventListener("popstate", close))
    }, [])

    const onScanSuccess = (result: QrScanner.ScanResult) => {
      setScanResult(result?.data)
    };
    
    const onScanFail = (err: string | Error) => {
        console.log(err);
    };

    useEffect(() => {
      const waitForScan = async() => {
        await handleScan(scanResult);
        setScanResult('')
        setIsActive(false)
      }

      if(scanResult){
        waitForScan()
      }
    }, [scanResult])

    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
          scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
            onDecodeError: onScanFail,
            preferredCamera: "environment",
            highlightScanRegion: true,
            highlightCodeOutline: true,
          });
    
          // 🚀 Start QR Scanner
          scanner?.current
            ?.start()
            .then(() => setIsActive(true))
            .catch((err) => {
              if (err) setIsActive(false);
            });
        }
        return () => {
          if (!videoEl?.current) {
            scanner?.current?.stop();
          }
        };
      }, []);

    

    return <div>
       {isActive && 
       <div className='w-full h-full bg-slate-950 absolute top-0 left-0 flex justify-center'>
          <video ref={videoEl}></video>
          <div className='absolute top-0 right-0' onClick={() =>  {setIsActive(false)}}>
            <FaTimes color='white' size={"4em"}/>
          </div>
        </div>  
        }
    </div>
}

export default Scanner