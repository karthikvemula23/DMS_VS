import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'your.package.id', // Replace with your actual package ID
  appName: 'YourAppName',   // Replace with your actual app name
  webDir: 'non-existent-folder',
//   bundledWebRuntime: false,
  server: {
    url: 'https://dmsvspz.web.app/',
    cleartext: true, // Keep for development if needed
  },
};

export default config;