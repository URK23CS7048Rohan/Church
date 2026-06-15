import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agape.sanctuary',
  appName: 'Sanctuary',
  webDir: 'out',
  server: {
    url: 'https://agapeinternational.vercel.app',
    cleartext: true
  }
};

export default config;
