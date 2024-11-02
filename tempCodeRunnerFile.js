import Constants from 'expo-constants';

const serverIp = Constants.manifest.extra.serverIp;

console.log(serverIp); // This should print your LOCAL_IP
