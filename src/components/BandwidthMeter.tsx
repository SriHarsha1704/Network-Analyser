import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatBytes } from '../lib/utils';

interface BandwidthMeterProps {
  used: number;
  total: number;
}

export function BandwidthMeter({ used, total }: BandwidthMeterProps) {
  const percentage = (used / total) * 100;
  const color = percentage > 80 ? '#ef4444' : percentage > 60 ? '#f59e0b' : '#10b981';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Bandwidth Usage</h3>
      <div className="w-32 h-32 mx-auto">
        <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: '#e5e7eb',
          })}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatBytes(used)} / {formatBytes(total)}
        </p>
      </div>
    </div>
  );
}