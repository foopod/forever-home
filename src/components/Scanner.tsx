import QrScanner from 'qr-scanner';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';


interface Props {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  setResult: Dispatch<SetStateAction<string>>
}

const Scanner: React.FC<Props> = ({ isActive, setIsActive, setResult }) => {
    const scanner = useRef<QrScanner>();
    const videoEl = useRef<HTMLVideoElement>(null);

    const onScanSuccess = (result: QrScanner.ScanResult) => {
        setResult(result?.data);
        setIsActive(false)
    };

    // Fail
    const onScanFail = (err: string | Error) => {
        // 🖨 Print the "err" to browser console.
        console.log(err);
    };

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