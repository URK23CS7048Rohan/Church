import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agape.sanctuary',
  appName: 'AGAPE',
  webDir: 'out',
  server: {
    url: 'https://agapeinternational.vercel.app',
    cleartext: true
  }
};

export default config;
