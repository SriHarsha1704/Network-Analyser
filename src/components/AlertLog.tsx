import React from 'react';
import { AlertTriangle, Shield, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface Alert {
  id: string;
  type: 'security' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

interface AlertLogProps {
  alerts: Alert[];
}

export function AlertLog({ alerts }: AlertLogProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'security':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertClass = (type: Alert['type']) => {
    switch (type) {
      case 'security':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Alert Log</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              'p-4 rounded-lg border',
              getAlertClass(alert.type)
            )}
          >
            <div className="flex items-start gap-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {alert.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}