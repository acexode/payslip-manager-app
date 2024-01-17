import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.payslipManager',
  appName: 'payslip-manager',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
