import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from './components/layouts/MainLayout';
import MainMenu from './modules/MainMenu';
import DroneModule from './modules/drone/DroneModule';
import DroneCockpit from './modules/drone/DroneCockpit';
import DroneCockpitPro from './modules/drone/DroneCockpitPro';
import RobotModule from './modules/robot/RobotModule';
import VehicleModule from './modules/vehicle/VehicleModule';
import HomeAutomation from './modules/home/HomeAutomation';
import ModuleManagement from './modules/management/ModuleManagement';
import TelemetryPanel from './modules/telemetry/TelemetryPanel';
import CameraModule from './modules/camera/CameraModule';
import DeveloperMode from './modules/developer/DeveloperMode';
import MarketPlace from './modules/market/MarketPlace';
import Settings from './modules/settings/Settings';
import { useAppStore } from './store/appStore';

function App() {
  const { theme, updateTelemetry, setLicenseStatus } = useAppStore();

  useEffect(() => {
    // Load license status
    if (window.electronAPI) {
      window.electronAPI.license.getStatus().then((status) => {
        setLicenseStatus(status.type as 'free' | 'pro' | 'admin');
      });
    }

    // Start telemetry simulation
    const interval = setInterval(() => {
      updateTelemetry({
        battery: Math.max(0, 85 + Math.random() * 10 - 5),
        voltage: 12.4 + Math.random() * 0.4 - 0.2,
        altitude: Math.max(0, Math.random() * 500),
        speed: Math.max(0, Math.random() * 100),
        temperature: 25 + Math.random() * 10 - 5,
        rssi: -45 + Math.random() * 20 - 10,
        roll: Math.random() * 20 - 10,
        pitch: Math.random() * 20 - 10,
        yaw: Math.random() * 360,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [updateTelemetry, setLicenseStatus]);

  return (
    <Router>
      <div className={`theme-${theme} w-full h-full`}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/drone" element={<DroneModule />} />
            <Route path="/drone/cockpit/:droneId" element={<DroneCockpit />} />
            <Route path="/drone/cockpit-pro/:droneId" element={<DroneCockpitPro />} />
            <Route path="/robot" element={<RobotModule />} />
            <Route path="/vehicle" element={<VehicleModule />} />
            <Route path="/home" element={<HomeAutomation />} />
            <Route path="/management" element={<ModuleManagement />} />
            <Route path="/telemetry" element={<TelemetryPanel />} />
            <Route path="/camera" element={<CameraModule />} />
            <Route path="/developer" element={<DeveloperMode />} />
            <Route path="/market" element={<MarketPlace />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
