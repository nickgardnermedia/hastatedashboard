import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { classNames } from '../utils/classNames';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={classNames(
        'p-2 rounded-lg transition-colors',
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
      )}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;