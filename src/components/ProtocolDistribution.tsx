import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProtocolDistributionProps {
  protocols: {
    tcp: number;
    udp: number;
    http: number;
    https: number;
  };
}

export function ProtocolDistribution({ protocols }: ProtocolDistributionProps) {
  const data = {
    labels: ['TCP', 'UDP', 'HTTP', 'HTTPS'],
    datasets: [
      {
        data: [protocols.tcp, protocols.udp, protocols.http, protocols.https],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#6366f1',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Protocol Distribution</h3>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}