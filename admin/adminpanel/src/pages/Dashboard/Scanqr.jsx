import { useEffect, useRef, useState } from "react";
import API from "../../services/api";
import './Scanqr.css'

function ScanQR() {
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const html5QrCodeRef = useRef(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    if (!scanning) return;

    setCameraStarting(true);

    // Use requestAnimationFrame to ensure DOM is fully updated
    const initializeScanner = async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        
        // Wait for DOM to be updated and element to be rendered
        const waitForElement = (selector, timeout = 5000) => {
          return new Promise((resolve, reject) => {
            const startTime = Date.now();
            
            const checkElement = () => {
              const element = document.getElementById(selector);
              if (element) {
                resolve(element);
                return;
              }
              
              if (Date.now() - startTime > timeout) {
                reject(new Error(`Element with id="${selector}" not found within ${timeout}ms`));
                return;
              }
              
              requestAnimationFrame(checkElement);
            };
            
            checkElement();
          });
        };

        // First set cameraStarting to false to render the reader element
        setCameraStarting(false);
        
        // Wait for the reader element to be rendered
        await waitForElement("reader");

        html5QrCodeRef.current = new Html5Qrcode("reader");

        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          async (decodedText) => {
            setCapturing(true);
            
            setTimeout(async () => {
              try {
                if (html5QrCodeRef.current && isRunningRef.current) {
                  isRunningRef.current = false;
                  await html5QrCodeRef.current.stop();
                }
              } catch (stopError) {
                console.warn("Error stopping scanner:", stopError);
              }
              
              setScanning(false);
              setCapturing(false);

              setScanResult("🔍 Validating...");

              try {
                const res = await API.post("/bookings/validate", { qrData: decodedText });
                new Audio("/correct.mp3").play().catch(() => {});
                setScanResult(`✅ Ticket Valid: ${res.data.name} (${res.data.status})`);
              } catch (err) {
                new Audio("/errorsound.mp3").play().catch(() => {});
                setScanResult("❌ Invalid or already used ticket!");
              }
            }, 1000);
          },
          () => {} // Error callback
        );

        isRunningRef.current = true;
        
      } catch (error) {
        console.error("Error initializing scanner:", error);
        setCameraStarting(false);
        setScanning(false);
      }
    };

    initializeScanner();

    return () => {
      if (html5QrCodeRef.current && isRunningRef.current) {
        html5QrCodeRef.current.stop().catch((error) => {
          console.warn("Error stopping scanner on cleanup:", error);
        });
        isRunningRef.current = false;
      }
    };
  }, [scanning]);

  const handleStopScanning = async () => {
    if (isRunningRef.current && html5QrCodeRef.current) {
      try {
        isRunningRef.current = false;
        await html5QrCodeRef.current.stop();
      } catch (error) {
        console.warn("Error stopping scanner:", error);
      }
    }
    setScanning(false);
    setCapturing(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-lime-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-yellow-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-14 h-14 bg-green-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-lime-400 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-18 h-18 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Enhanced Header */}
         <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight animate-pulse">
            <span className="text-4xl sm:text-5xl md:text-6xl">🔍 </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-600 to-yellow-600 mx-2">
              Scan Ticket QR
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl">🔍 </span>
          </h1>
          <p className="text-lg sm:text-xl text-green-700 font-semibold tracking-wide">
            Point your camera at the QR code to validate tickets
          </p>
        </div>

        {/* Start/Stop Scanning Button */}
        {!scanning && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => {
                setScanResult(null);
                setScanning(true);
              }}
              className="group relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg sm:text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-float"
              style={{
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)',
                animation: 'pulse-glow 2s ease-in-out infinite, float 3s ease-in-out infinite'
              }}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-shimmer"></div>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-xl sm:text-2xl animate-bounce">📱</span>
                <span className="tracking-wide">
                  {scanResult ? "Scan Another Ticket" : "Start Scanning"}
                </span>
              </span>
            </button>
          </div>
        )}

        {/* Stop Scanning Button */}
        {scanning && !cameraStarting && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleStopScanning}
              className="group relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg sm:text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)'
              }}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-xl sm:text-2xl">⏹️</span>
                <span className="tracking-wide">Stop Scanning</span>
              </span>
            </button>
          </div>
        )}

        {/* Camera Starting State */}
        {cameraStarting && (
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative w-80 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-2xl border-4 border-green-200 overflow-hidden">
              {/* Loading animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              {/* Pulse effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-lime-400 opacity-30 animate-pulse"></div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-semibold text-lg">Starting Camera...</span>
              </div>
            </div>
          </div>
        )}

        {/* Camera View with Enhanced Animations */}
        {scanning && !cameraStarting && (
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative">
              {/* Main camera container */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 bg-black rounded-3xl shadow-2xl border-4 border-green-300 overflow-hidden">
                {/* Camera view */}
                <div id="reader" className="w-full h-full">
                  {/* This will be populated by html5-qrcode */}
                </div>
                
                {/* QR Code Detection Box */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`relative w-64 h-64 border-4 transition-all duration-300 ${
                    capturing ? 'border-green-400 shadow-green-glow' : 'border-white/50'
                  }`}>
                    {/* Corner decorations */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-white"></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-r-4 border-t-4 border-white"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-4 border-b-4 border-white"></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-white"></div>
                    
                    {/* Scanning line animation */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-scan-line"></div>
                    </div>
                    
                    {/* Capturing animation */}
                    {capturing && (
                      <>
                        {/* Success pulse */}
                        <div className="absolute inset-0 bg-green-400 opacity-30 animate-pulse"></div>
                        
                        {/* Ripple effect */}
                        <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-ripple"></div>
                        <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-ripple-delayed"></div>
                        
                        {/* Checkmark animation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl text-green-400 animate-bounce">✓</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  capturing 
                    ? 'bg-green-500 text-white animate-pulse' 
                    : 'bg-lime-500 text-white'
                }`}>
                  {capturing ? '📸 Capturing QR Code...' : '🔍 Looking for QR Code'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Scan Result */}
        {scanResult && (
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-lime-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative px-6 py-4 sm:px-8 sm:py-6 bg-white rounded-2xl shadow-xl border-2 border-green-200">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Scan Result</div>
                  <div className="text-xl sm:text-2xl font-semibold text-green-600">
                    {scanResult}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}

export default ScanQR;