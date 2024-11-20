import React from 'react';
import { Network } from 'lucide-react';

interface Connection {
  id: string;
  source: string;
  destination: string;
  protocol: string;
  status: string;
}

interface ConnectionsTableProps {
  connections: Connection[];
}

export function ConnectionsTable({ connections }: ConnectionsTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Active Connections</h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {connections.length} connections
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-3 px-4">Source</th>
              <th className="text-left py-3 px-4">Destination</th>
              <th className="text-left py-3 px-4">Protocol</th>
              <th className="text-left py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((conn) => (
              <tr 
                key={conn.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-4">{conn.source}</td>
                <td className="py-3 px-4">{conn.destination}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {conn.protocol}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    conn.status === 'ESTABLISHED' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {conn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}