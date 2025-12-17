import { Video, VideoOff } from 'lucide-react';
import { useState } from 'react';

export default function CameraFeed() {
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <div className="glass-strong rounded-lg p-4 w-80 h-56">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-white">Camera Feed</h3>
        <button
          onClick={() => setIsStreaming(!isStreaming)}
          className={`p-2 rounded-lg transition-colors ${
            isStreaming
              ? 'bg-error/20 text-error hover:bg-error/30'
              : 'bg-success/20 text-success hover:bg-success/30'
          }`}
        >
          {isStreaming ? (
            <VideoOff className="w-4 h-4" />
          ) : (
            <Video className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-36 bg-black rounded-lg overflow-hidden">
        {isStreaming ? (
          <>
            {/* Simulated Camera Feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-primary rounded-full opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-8 bg-primary opacity-70" />
                    <div className="absolute w-8 h-1 bg-primary opacity-70" />
                  </div>
                </div>
              </div>

              {/* Scan Line Effect */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 scan-line" />

              {/* HUD Overlay */}
              <div className="absolute top-2 left-2 right-2 flex justify-between text-xs">
                <div className="glass rounded px-2 py-1">
                  <span className="text-error">● REC</span>
                </div>
                <div className="glass rounded px-2 py-1">
                  <span className="text-white font-mono">1920x1080</span>
                </div>
              </div>

              {/* Corner Brackets */}
              {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(
                (pos, i) => (
                  <div key={i} className={`absolute ${pos}`}>
                    <div className="w-4 h-4 border-2 border-primary opacity-50" />
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <VideoOff className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Camera Offline</p>
              <p className="text-xs text-gray-600 mt-1">Click to start stream</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      {isStreaming && (
        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>FPS: <span className="text-success font-bold">30</span></span>
          <span>Bitrate: <span className="text-primary font-bold">2.5 Mbps</span></span>
          <span>Latency: <span className="text-warning font-bold">85ms</span></span>
        </div>
      )}
    </div>
  );
}
