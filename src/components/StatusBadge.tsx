import React from 'react';
import { classNames } from '../utils/classNames';

interface StatusBadgeProps {
  state: string;
  isDarkMode: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ state, isDarkMode }) => {
  const getStatusColor = (state: string) => {
    const lowerState = state.toLowerCase();
    if (['on', 'active', 'connected', 'online', 'home'].includes(lowerState)) {
      return isDarkMode 
        ? 'bg-green-900/30 text-green-400 border-green-900'
        : 'bg-green-100 text-green-800 border-green-200';
    }
    if (['off', 'inactive', 'disconnected', 'offline', 'away'].includes(lowerState)) {
      return isDarkMode
        ? 'bg-red-900/30 text-red-400 border-red-900'
        : 'bg-red-100 text-red-800 border-red-200';
    }
    return isDarkMode
      ? 'bg-gray-800 text-gray-300 border-gray-700'
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <span className={classNames(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      getStatusColor(state)
    )}>
      {state}
    </span>
  );
};

export default StatusBadge;