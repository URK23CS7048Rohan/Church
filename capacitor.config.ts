import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agape.sanctuary',
  appName: 'Sanctuary',
  webDir: 'out',
  server: {
    // Set this to your local dev computer's IP (e.g. 'http://192.168.1.50:3000') or production site URL.
    url: 'http://192.168.1.40:3000',
    cleartext: true
  }
};

export default config;
