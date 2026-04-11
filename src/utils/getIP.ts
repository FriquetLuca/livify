import os from 'os';

const interfaces = os.networkInterfaces();

export const getIP = (family: "IPv4" | "IPv6"): string[] => {
  const result = [];
  for (const k in interfaces) {
      for (const k2 in interfaces[k]) {
          const intr = interfaces[k];
          if(intr) {
              const address: os.NetworkInterfaceInfo = intr[Number(k2)];
              if(address && (address.family === family)) {
                  result.push(address.address);
              }
          }
      }
  }
  return result;
};
