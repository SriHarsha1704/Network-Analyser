export interface NetworkMetrics {
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
  packetLoss: number;
  firewallActive: boolean;
  threatLevel: 'low' | 'medium' | 'high';
  downloadHistory: number[];
  uploadHistory: number[];
  timeLabels: string[];
  connections: number;
  bandwidth: {
    total: number;
    used: number;
  };
  protocols: {
    tcp: number;
    udp: number;
    http: number;
    https: number;
  };
}