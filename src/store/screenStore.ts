import { create } from 'zustand';
import { Layout } from 'react-grid-layout';

export type ScreenType = 'cockpit' | 'dashboard' | 'recon' | 'terminal' | 'custom';

export interface Screen {
  id: string;
  name: string;
  type: ScreenType;
  deviceId?: string;
  layout: Layout[];
  widgets: string[];
  theme?: string;
  backgroundImage?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ScreenState {
  screens: Screen[];
  currentScreen: string | null;
  
  // Actions
  addScreen: (screen: Omit<Screen, 'id' | 'createdAt' | 'updatedAt'>) => void;
  removeScreen: (id: string) => void;
  updateScreen: (id: string, updates: Partial<Screen>) => void;
  setCurrentScreen: (id: string | null) => void;
  duplicateScreen: (id: string) => void;
  exportScreen: (id: string) => string;
  importScreen: (data: string) => void;
  getScreen: (id: string) => Screen | undefined;
}

const defaultScreens: Screen[] = [
  {
    id: 'cockpit-pro-1',
    name: 'Drone Cockpit Pro',
    type: 'cockpit',
    deviceId: 'drone-1',
    layout: [],
    widgets: [
      'camera',
      'artificialHorizon',
      'headingTape',
      'altitudeGauge',
      'speedGauge',
      'battery',
      'compass',
      'gps',
      'statusBar',
    ],
    theme: 'neon',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'recon-1',
    name: 'RECON Scanner',
    type: 'recon',
    layout: [],
    widgets: ['wifiScanner', 'signalStrength', 'terminal'],
    theme: 'dark',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export const useScreenStore = create<ScreenState>((set, get) => ({
  screens: defaultScreens,
  currentScreen: 'cockpit-pro-1',

  addScreen: (screen) => {
    const newScreen: Screen = {
      ...screen,
      id: `screen-${Date.now()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set((state) => ({
      screens: [...state.screens, newScreen],
    }));
  },

  removeScreen: (id) => {
    set((state) => ({
      screens: state.screens.filter((s) => s.id !== id),
      currentScreen: state.currentScreen === id ? null : state.currentScreen,
    }));
  },

  updateScreen: (id, updates) => {
    set((state) => ({
      screens: state.screens.map((s) =>
        s.id === id
          ? { ...s, ...updates, updatedAt: Date.now() }
          : s
      ),
    }));
  },

  setCurrentScreen: (id) => {
    set({ currentScreen: id });
  },

  duplicateScreen: (id) => {
    const screen = get().screens.find((s) => s.id === id);
    if (screen) {
      const duplicated: Screen = {
        ...screen,
        id: `screen-${Date.now()}`,
        name: `${screen.name} (Copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      set((state) => ({
        screens: [...state.screens, duplicated],
      }));
    }
  },

  exportScreen: (id) => {
    const screen = get().screens.find((s) => s.id === id);
    if (screen) {
      return JSON.stringify(screen, null, 2);
    }
    return '';
  },

  importScreen: (data) => {
    try {
      const screen = JSON.parse(data) as Screen;
      screen.id = `screen-${Date.now()}`;
      screen.createdAt = Date.now();
      screen.updatedAt = Date.now();
      set((state) => ({
        screens: [...state.screens, screen],
      }));
    } catch (error) {
      console.error('Failed to import screen:', error);
    }
  },

  getScreen: (id) => {
    return get().screens.find((s) => s.id === id);
  },
}));
