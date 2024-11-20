import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatBytes } from '../lib/utils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SpeedGaugeProps {
  data: number[];
  labels: string[];
  title: string;
  color: string;
  currentSpeed: number;
}

export function SpeedGauge({ data, labels, title, color, currentSpeed }: SpeedGaugeProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: true,
        borderColor: color,
        backgroundColor: `${color}33`,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-2xl font-bold" style={{ color }}>
          {formatBytes(currentSpeed)}/s
        </span>
      </div>
      <div className="h-48">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}