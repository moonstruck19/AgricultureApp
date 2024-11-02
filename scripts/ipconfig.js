// scripts/setLocalIP.js
const os = require('os');
const fs = require('fs');
const path = require('path');

function getLocalIPv4() {
  const interfaces = os.networkInterfaces();

  // Prioritize the Wi-Fi adapter, or fall back to other non-internal IPv4 addresses
  for (const name of Object.keys(interfaces)) {
    if (name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wlan')) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }

  // Fallback to any other non-internal IPv4 address if Wi-Fi is not found
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return 'localhost';
}

// Rest of the code to update or add LOCAL_IP in .env content
const ip = getLocalIPv4();
const envPath = path.join(__dirname, '../.env');
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Remove any existing LOCAL_IP entry
const envLines = envContent.split('\n').filter(line => !line.startsWith('LOCAL_IP='));
// Add the new LOCAL_IP entry
envLines.push(`LOCAL_IP=${ip}`);

// Write updated content back to .env
fs.writeFileSync(envPath, envLines.join('\n'), { encoding: 'utf8' });
console.log(`Set LOCAL_IP to ${ip} in .env`);
