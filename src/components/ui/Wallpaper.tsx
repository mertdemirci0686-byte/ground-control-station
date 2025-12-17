import { useAppStore } from '../../store/appStore';

export default function Wallpaper() {
  const { wallpaperBlur } = useAppStore();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/20 to-purple-900/20"
        style={{ filter: `blur(${wallpaperBlur}px)` }}
      />
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '6s', animationDelay: '1s' }}
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 grid-bg" />
    </div>
  );
}
