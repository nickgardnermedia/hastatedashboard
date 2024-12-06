import React from 'react';
import { classNames } from '../utils/classNames';
import { EntityData } from '../types';
import LoadingSpinner from './LoadingSpinner';
import StatusBadge from './StatusBadge';

interface DataTableProps {
  data: EntityData[];
  loading: boolean;
  isDarkMode: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading, isDarkMode }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner isDarkMode={isDarkMode} />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={classNames(
        'flex flex-col items-center justify-center h-64 rounded-lg border',
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-gray-400'
          : 'bg-gray-50 border-gray-200 text-gray-500'
      )}>
        <p className="text-lg font-medium mb-2">No data available</p>
        <p className="text-sm">Try adjusting your search or refresh the page</p>
      </div>
    );
  }

  return (
    <div className={classNames(
      'overflow-x-auto rounded-lg border shadow-sm',
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    )}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={classNames(
          isDarkMode ? 'bg-[#1F1F1F]' : 'bg-gray-50'
        )}>
          <tr>
            <th scope="col" className={classNames(
              'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            )}>
              Classification
            </th>
            <th scope="col" className={classNames(
              'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            )}>
              Entity ID / Friendly Name
            </th>
            <th scope="col" className={classNames(
              'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            )}>
              State
            </th>
          </tr>
        </thead>
        <tbody className={classNames(
          'divide-y',
          isDarkMode ? 'divide-[#2D2D2D] bg-[#121212]' : 'divide-gray-200 bg-white'
        )}>
          {data.map((item) => (
            <tr key={item.entity_id} className={classNames(
              'transition-colors duration-150',
              isDarkMode 
                ? 'hover:bg-[#1F1F1F]'
                : 'hover:bg-gray-50'
            )}>
              <td className={classNames(
                'px-6 py-4 whitespace-nowrap text-sm',
                isDarkMode ? 'text-gray-300' : 'text-gray-900'
              )}>
                {item.classification}
              </td>
              <td className={classNames(
                'px-6 py-4 whitespace-nowrap text-sm',
                isDarkMode ? 'text-gray-300' : 'text-gray-900'
              )}>
                <div>{item.entity_id}</div>
                <div className="text-xs text-gray-500">{item.friendly_name}</div>
              </td>
              <td className={classNames(
                'px-6 py-4 whitespace-nowrap text-sm',
                isDarkMode ? 'text-gray-300' : 'text-gray-900'
              )}>
                <StatusBadge state={item.state} isDarkMode={isDarkMode} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;