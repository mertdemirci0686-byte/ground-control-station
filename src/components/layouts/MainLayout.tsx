import { ReactNode } from 'react';
import TopBar from '../navigation/TopBar';
import BottomBar from '../navigation/BottomBar';
import QuickPanel from '../panels/QuickPanel';
import NotificationPanel from '../panels/NotificationPanel';
import Wallpaper from '../ui/Wallpaper';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <Wallpaper />
      <TopBar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
      <BottomBar />
      <QuickPanel />
      <NotificationPanel />
    </div>
  );
}
