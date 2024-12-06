import React from 'react';
import { classNames } from '../utils/classNames';

interface LoadingSpinnerProps {
  isDarkMode: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isDarkMode }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-blue-500" />
      <span className={classNames(
        'text-lg font-medium',
        isDarkMode ? 'text-gray-200' : 'text-gray-700'
      )}>
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;