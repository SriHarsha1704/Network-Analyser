import React from 'react';
import { Activity, ArrowDown, ArrowUp, Clock } from 'lucide-react';
import { formatBytes } from '../lib/utils';

interface NetworkStatsProps {
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
  packetLoss: number;
}

export function NetworkStats({ downloadSpeed, uploadSpeed, latency, packetLoss }: NetworkStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowDown className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium">Download</h3>
          </div>
          <span className="text-lg font-bold text-blue-500">
            {formatBytes(downloadSpeed)}/s
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowUp className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-sm font-medium">Upload</h3>
          </div>
          <span className="text-lg font-bold text-green-500">
            {formatBytes(uploadSpeed)}/s
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-purple-500 mr-2" />
            <h3 className="text-sm font-medium">Latency</h3>
          </div>
          <span className="text-lg font-bold text-purple-500">
            {latency}ms
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-red-500 mr-2" />
            <h3 className="text-sm font-medium">Packet Loss</h3>
          </div>
          <span className="text-lg font-bold text-red-500">
            {packetLoss}%
          </span>
        </div>
      </div>
    </div>
  );
}