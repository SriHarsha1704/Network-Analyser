import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SpeedGauge } from './components/SpeedGauge';
import { SecurityStatus } from './components/SecurityStatus';
import { NetworkStats } from './components/NetworkStats';
import { BandwidthMeter } from './components/BandwidthMeter';
import { ProtocolDistribution } from './components/ProtocolDistribution';
import { ConnectionsTable } from './components/ConnectionsTable';
import { AlertLog } from './components/AlertLog';
import { Moon, Sun } from 'lucide-react';
import type { NetworkMetrics } from './types/network';

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
});

const mockConnections = [
  {
    id: '1',
    source: '192.168.1.100:3000',
    destination: '192.168.1.1:80',
    protocol: 'TCP',
    status: 'ESTABLISHED',
  },
  {
    id: '2',
    source: '192.168.1.100:3001',
    destination: '8.8.8.8:443',
    protocol: 'HTTPS',
    status: 'ESTABLISHED',
  },
];

const mockAlerts = [
  {
    id: '1',
    type: 'security',
    message: 'Suspicious login attempt detected',
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    type: 'warning',
    message: 'High bandwidth usage detected',
    timestamp: '5 minutes ago',
  },
  {
    id: '3',
    type: 'info',
    message: 'System update available',
    timestamp: '10 minutes ago',
  },
];

const initialState: NetworkMetrics = {
  downloadSpeed: 0,
  uploadSpeed: 0,
  latency: 0,
  packetLoss: 0,
  firewallActive: true,
  threatLevel: 'low',
  downloadHistory: Array(20).fill(0),
  uploadHistory: Array(20).fill(0),
  timeLabels: Array.from({ length: 20 }, (_, i) => `${i}s ago`),
  connections: 0,
  bandwidth: {
    total: 1000000000,
    used: 0,
  },
  protocols: {
    tcp: 0,
    udp: 0,
    http: 0,
    https: 0,
  },
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [networkData, setNetworkData] = useState<NetworkMetrics>(initialState);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('networkUpdate', (data: NetworkMetrics) => {
      console.log('Network data received:', data);
      setNetworkData(data);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Network Analyzer</h1>
          <button
            onClick={() => setIsDark(prev => !prev)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500" />
            )}
          </button>
        </div>

        <NetworkStats
          downloadSpeed={networkData.downloadSpeed}
          uploadSpeed={networkData.uploadSpeed}
          latency={networkData.latency}
          packetLoss={networkData.packetLoss}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <SpeedGauge
            data={networkData.downloadHistory}
            labels={networkData.timeLabels}
          />
          <SecurityStatus
            firewall Active={networkData.firewallActive}
            threatLevel={networkData.threatLevel}
          />
          <BandwidthMeter
            total={networkData.bandwidth.total}
            used={networkData.bandwidth.used}
          />
        </div>

        <ProtocolDistribution protocols={networkData.protocols} />

        <ConnectionsTable connections={mockConnections} />

        <AlertLog alerts={mockAlerts} />
      </div>
    </div>
  );
}

export default App;