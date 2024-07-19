import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';

interface Props {
}

const Scanner: React.FC<Props> = ({}) => {
    const scanner = useRef<QrScanner>();
    const videoEl = useRef<HTMLVideoElement>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);

    const [scannedResult, setScannedResult] = useState<string | undefined>("");

    // Success
    const onScanSuccess = (result: QrScanner.ScanResult) => {
        // 🖨 Print the "result" to browser console.
        console.log(result);
        // ✅ Handle success.
        // 😎 You can do whatever you want with the scanned result.
        setScannedResult(result?.data);
    };

    // Fail
    const onScanFail = (err: string | Error) => {
        // 🖨 Print the "err" to browser console.
        console.log(err);
    };

    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
          // 👉 Instantiate the QR Scanner
          scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
            onDecodeError: onScanFail,
            // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
            preferredCamera: "environment",
            // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
            highlightScanRegion: true,
            // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
            highlightCodeOutline: true,
            // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
            // overlay: qrBoxEl?.current || undefined,
          });
    
          // 🚀 Start QR Scanner
          scanner?.current
            ?.start()
            .then(() => setQrOn(true))
            .catch((err) => {
              if (err) setQrOn(false);
            });
        }
    
        // 🧹 Clean up on unmount.
        // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
        return () => {
          if (!videoEl?.current) {
            scanner?.current?.stop();
          }
        };
      }, []);

    

    return <div>
       {!scannedResult && <video ref={videoEl}></video>}
       {scannedResult && (
        <p>
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
}

export default Scanner