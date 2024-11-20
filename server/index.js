import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import si from 'systeminformation';
import { promisify } from 'util';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    methods: ["GET", "POST"]
  }
});

// Function to get network data
async function getNetworkData() {
  try {
    console.log('Fetching network data...'); // Log when fetching data
    const [networkStats, networkInterfaces] = await Promise.all([
      si.networkStats(),
      si.networkInterfaces(),
    ]);

    const defaultInterface = networkStats[0]; // Get the first network interface
    const interfaceInfo = networkInterfaces.find(i => i.iface === defaultInterface.iface);

    // Calculate download and upload speed in bits
    const downloadSpeed = defaultInterface.rx_sec * 8; // Convert to bits
    const uploadSpeed = defaultInterface.tx_sec * 8; // Convert to bits

    // Get additional network statistics
    const connections = await si.networkConnections();
    const protocols = {
      tcp: connections.filter(conn => conn.protocol === 'tcp').length,
      udp: connections.filter(conn => conn.protocol === 'udp').length,
      http: connections.filter(conn => conn.localport === 80).length,
      https: connections.filter(conn => conn.localport === 443).length,
    };

    return {
      downloadSpeed,
      uploadSpeed,
      latency: null, // Optionally implement latency measurement
      packetLoss: Math.random() * 5, // Simulated packet loss
      firewallActive: true, // Placeholder for firewall status
      threatLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)], // Simulated threat level
      connections: connections.length,
      bandwidth: {
        total: interfaceInfo?.speed ? interfaceInfo.speed * 1000000 : 1000000000, // Total bandwidth in bits
        used: downloadSpeed + uploadSpeed,
      },
      protocols,
    };
  } catch (error) {
    console.error('Error getting network data:', error);
    return {
      downloadSpeed: 0,
      uploadSpeed: 0,
      latency: null,
      packetLoss: 0,
      firewallActive: true,
      threatLevel: 'low',
      connections: 0,
      bandwidth: {
        total: 1000000000, // Default total bandwidth
        used: 0,
      },
      protocols: {
        tcp: 0,
        udp: 0,
        http: 0,
        https: 0,
      },
    };
  }
}

// Handle socket connections
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send initial data
  getNetworkData().then(data => {
    socket.emit('networkUpdate', data);
  });

  // Update every second
  const interval = setInterval(async () => {
    const data = await getNetworkData();
    socket.emit('networkUpdate', data);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});