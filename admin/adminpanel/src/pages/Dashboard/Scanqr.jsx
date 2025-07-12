import { useEffect, useRef, useState } from "react";
import API from "../../services/api";

function ScanQR() {
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);
  const html5QrCodeRef = useRef(null);
  const isRunningRef = useRef(false); // 🔥 NEW

  useEffect(() => {
    if (!scanning) return;

    setCameraStarting(true);

    import("html5-qrcode").then(({ Html5Qrcode }) => {
      html5QrCodeRef.current = new Html5Qrcode("reader");

      html5QrCodeRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          isRunningRef.current = false; // set not running
          await html5QrCodeRef.current.stop();
          setScanning(false);

          setScanResult("🔍 Validating...");
          
          try {
              const res = await API.post("/bookings/validate", { qrData: decodedText });
              new Audio("/correct.mp3").play().catch(() => {});
              setScanResult(`✅ Ticket Valid: ${res.data.name} (${res.data.status})`);
            } catch (err) {
                new Audio("/errorsound.mp3").play().catch(() => {});
                setScanResult("❌ Invalid or already used ticket!");
          }
        },
        () => {}
      ).then(() => {
        setCameraStarting(false);
        isRunningRef.current = true; // ✅ mark as running
      }).catch(() => {
        setCameraStarting(false);
      });
    });

    return () => {
      if (html5QrCodeRef.current && isRunningRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
        isRunningRef.current = false;
      }
    };
  }, [scanning]);

  const handleStopScanning = async () => {
    if (html5QrCodeRef.current && isRunningRef.current) {
      await html5QrCodeRef.current.stop();
      isRunningRef.current = false;
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-green-50">
      <h2 className="text-3xl font-bold mb-6 text-green-800">🎯 Scan Ticket QR</h2>

      {!scanning && (
        <button
          onClick={() => {
            setScanResult(null);
            setScanning(true);
          }}
          className="px-6 py-3 bg-green-600 text-white rounded-xl text-xl shadow hover:bg-green-700 transition"
        >
          {scanResult ? "Scan Another Ticket" : "Start Scanning"}
        </button>
      )}

      {scanning && !cameraStarting && (
        <button
          onClick={handleStopScanning}
          className="mb-4 px-6 py-2 bg-red-600 text-white rounded-xl text-md shadow hover:bg-red-700 transition"
        >
          Stop Scanning
        </button>
      )}

      {cameraStarting && (
        <div className="my-6 flex items-center space-x-3 text-green-700">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
          <span className="text-lg font-semibold">Starting Camera...</span>
        </div>
      )}

      <div id="reader" className="w-full max-w-sm rounded shadow mt-6" />

      {scanResult && (
        <div className={`mt-6 p-4 rounded text-center text-xl font-semibold 
          ${scanResult.startsWith("✅") ? "bg-green-200 text-green-800" : 
            scanResult.startsWith("❌") ? "bg-red-200 text-red-800" : 
            "bg-yellow-100 text-yellow-800"}`}>
          {scanResult}
        </div>
      )}
    </div>
  );
}

export default ScanQR;
