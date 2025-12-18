import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import NeonButton from '../components/ui/NeonButton';
import SciFiPanel from '../components/ui/SciFiPanel';
import { useDeviceStore, DeviceType, Protocol } from '../store/deviceStore';

interface DeviceWizardProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

const deviceTypes = [
  { value: 'drone' as DeviceType, label: 'Drone/UAV', icon: '🚁' },
  { value: 'robot' as DeviceType, label: 'Robot', icon: '🤖' },
  { value: 'vehicle' as DeviceType, label: 'RC Vehicle', icon: '🚗' },
  { value: 'recon' as DeviceType, label: 'RF/SDR Device', icon: '📡' },
  { value: 'home' as DeviceType, label: 'Smart Home', icon: '🏠' },
  { value: 'custom' as DeviceType, label: 'Custom Device', icon: '⚙️' },
];

const protocols = [
  { value: 'serial' as Protocol, label: 'Serial (USB)', description: 'Direct USB/UART connection' },
  { value: 'bluetooth' as Protocol, label: 'Bluetooth', description: 'Wireless BLE connection' },
  { value: 'wifi' as Protocol, label: 'WiFi', description: 'TCP/UDP over WiFi' },
  { value: 'mqtt' as Protocol, label: 'MQTT', description: 'IoT messaging protocol' },
  { value: 'mavlink' as Protocol, label: 'MAVLink', description: 'Drone communication protocol' },
];

export default function DeviceWizard({ onComplete, onCancel }: DeviceWizardProps) {
  const [step, setStep] = useState(0);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState<DeviceType>('drone');
  const [protocol, setProtocol] = useState<Protocol>('serial');
  const { addDevice } = useDeviceStore();

  const steps = ['Device Name', 'Device Type', 'Protocol', 'Review'];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      addDevice({ name: deviceName, type: deviceType, protocol, config: {} });
      onComplete?.();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl mx-4">
        <SciFiPanel>
          <div className="p-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cyan-300 neon-text mb-2">Add New Device</h2>
              <p className="text-gray-400">Step {step + 1} of {steps.length}</p>
            </div>
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {step === 0 && (
                    <input type="text" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} placeholder="Device Name" className="w-full px-4 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg text-white" />
                  )}
                  {step === 1 && (
                    <div className="grid grid-cols-2 gap-4">
                      {deviceTypes.map((type) => (
                        <button key={type.value} onClick={() => setDeviceType(type.value)} className={`p-6 rounded-lg border-2 ${deviceType === type.value ? 'border-cyan-400 bg-cyan-500/20' : 'border-gray-700'}`}>
                          <div className="text-4xl mb-2">{type.icon}</div>
                          <div className="text-white text-sm">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-3">
                      {protocols.map((proto) => (
                        <button key={proto.value} onClick={() => setProtocol(proto.value)} className={`w-full p-4 rounded-lg border-2 text-left ${protocol === proto.value ? 'border-cyan-400 bg-cyan-500/20' : 'border-gray-700'}`}>
                          <div className="text-white font-bold">{proto.label}</div>
                          <div className="text-gray-400 text-sm">{proto.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                  {step === 3 && (
                    <div className="glass-strong p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-cyan-300 mb-4">Device Summary</h3>
                      <div className="space-y-3">
                        <div><span className="text-gray-400">Name:</span> <span className="text-white ml-2">{deviceName}</span></div>
                        <div><span className="text-gray-400">Type:</span> <span className="text-white ml-2">{deviceTypes.find(t => t.value === deviceType)?.label}</span></div>
                        <div><span className="text-gray-400">Protocol:</span> <span className="text-white ml-2">{protocols.find(p => p.value === protocol)?.label}</span></div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-between mt-8">
              <NeonButton onClick={() => step > 0 ? setStep(step - 1) : onCancel?.()} color="orange">
                <ChevronLeft className="w-5 h-5 inline mr-2" />Back
              </NeonButton>
              <NeonButton onClick={handleNext} color={step === steps.length - 1 ? 'green' : 'cyan'}>
                {step === steps.length - 1 ? <><Check className="w-5 h-5 inline mr-2" />Complete</> : <>Next<ChevronRight className="w-5 h-5 inline ml-2" /></>}
              </NeonButton>
            </div>
          </div>
        </SciFiPanel>
      </motion.div>
    </div>
  );
}
