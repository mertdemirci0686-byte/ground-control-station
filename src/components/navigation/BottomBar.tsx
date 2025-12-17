import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  const toggleFullscreen = async () => {
    if (window.electronAPI) {
      await window.electronAPI.window.fullscreen(!isFullscreen);
      setIsFullscreen(!isFullscreen);
    }
  };

  const isHome = location.pathname === '/';

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="glass-strong border-t border-white/10 px-6 py-3 flex items-center justify-between z-50"
    >
      {/* Left Section - Navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleBack}
          disabled={isHome}
          className={`p-3 rounded-lg transition-all hover-scale ${
            isHome
              ? 'bg-white/5 text-gray-600 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-primary/20'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleHome}
          disabled={isHome}
          className={`p-3 rounded-lg transition-all hover-scale ${
            isHome
              ? 'bg-primary/20 text-primary cursor-default'
              : 'bg-white/10 text-white hover:bg-primary/20'
          }`}
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      {/* Center Section - Current Route */}
      <div className="text-center">
        <p className="text-sm text-gray-400">Current Module</p>
        <p className="text-lg font-bold text-white capitalize">
          {location.pathname === '/' ? 'Main Menu' : location.pathname.slice(1).replace(/\//g, ' › ')}
        </p>
      </div>

      {/* Right Section - Window Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleFullscreen}
          className="p-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all hover-scale"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
