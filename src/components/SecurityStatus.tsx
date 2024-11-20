import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface SecurityStatusProps {
  firewallActive: boolean;
  threatLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

export function SecurityStatus({ firewallActive, threatLevel, lastUpdated }: SecurityStatusProps) {
  const threatColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Security Status</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Updated: {lastUpdated}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {firewallActive ? (
            <ShieldCheck className="h-8 w-8 text-green-500" />
          ) : (
            <ShieldAlert className="h-8 w-8 text-red-500" />
          )}
          <div>
            <p className="font-medium">Firewall Status</p>
            <p className={cn(
              "text-sm",
              firewallActive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {firewallActive ? 'Active' : 'Disabled'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Shield className={cn("h-8 w-8", {
            'text-green-500': threatLevel === 'low',
            'text-yellow-500': threatLevel === 'medium',
            'text-red-500': threatLevel === 'high',
          })} />
          <div>
            <p className="font-medium">Threat Level</p>
            <p className={cn("text-sm capitalize", threatColors[threatLevel])}>
              {threatLevel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}