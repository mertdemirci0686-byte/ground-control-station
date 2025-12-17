const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

let port = null;
let parser = null;
let dataCallback = null;

async function listPorts() {
  try {
    const ports = await SerialPort.list();
    return ports.map(p => ({
      path: p.path,
      manufacturer: p.manufacturer,
      serialNumber: p.serialNumber,
      productId: p.productId,
      vendorId: p.vendorId,
    }));
  } catch (error) {
    console.error('Error listing serial ports:', error);
    return [];
  }
}

async function connect(portPath, baudRate = 115200) {
  try {
    if (port && port.isOpen) {
      await disconnect();
    }

    port = new SerialPort({
      path: portPath,
      baudRate: baudRate,
      autoOpen: false,
    });

    return new Promise((resolve, reject) => {
      port.open((err) => {
        if (err) {
          console.error('Error opening port:', err);
          reject(err);
          return;
        }

        parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
        
        parser.on('data', (data) => {
          if (dataCallback) {
            dataCallback(data.trim());
          }
        });

        port.on('error', (err) => {
          console.error('Serial port error:', err);
        });

        resolve({
          success: true,
          port: portPath,
          baudRate: baudRate,
        });
      });
    });
  } catch (error) {
    console.error('Error connecting to serial port:', error);
    throw error;
  }
}

async function disconnect() {
  return new Promise((resolve) => {
    if (port && port.isOpen) {
      port.close((err) => {
        if (err) {
          console.error('Error closing port:', err);
        }
        port = null;
        parser = null;
        resolve({ success: true });
      });
    } else {
      resolve({ success: true });
    }
  });
}

async function write(data) {
  return new Promise((resolve, reject) => {
    if (!port || !port.isOpen) {
      reject(new Error('Port not open'));
      return;
    }

    port.write(data + '\n', (err) => {
      if (err) {
        console.error('Error writing to port:', err);
        reject(err);
        return;
      }
      resolve({ success: true });
    });
  });
}

function onData(callback) {
  dataCallback = callback;
}

module.exports = {
  listPorts,
  connect,
  disconnect,
  write,
  onData,
};
