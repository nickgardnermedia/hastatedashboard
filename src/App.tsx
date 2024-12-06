import React, { useState, useEffect } from 'react';
import { Moon, Sun, RefreshCw, Download, Search } from 'lucide-react';
import DataTable from './components/DataTable';
import ThemeToggle from './components/ThemeToggle';
import ErrorBoundary from './components/ErrorBoundary';
import { classNames } from './utils/classNames';
import { downloadCSV } from './utils/downloadCSV';
import { filterData } from './utils/filterData';
import { useAutoRefresh } from './hooks/useAutoRefresh';
import { useDarkMode } from './hooks/useDarkMode';
import { fetchHomeAssistantData } from './services/api';
import { EntityData } from './types';

function App() {
  const [data, setData] = useState<EntityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkMode, toggleTheme } = useDarkMode();
  
  const { lastRefresh, refreshData } = useAutoRefresh(60 * 60 * 1000, async () => {
    await fetchData();
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHomeAssistantData();
      setData(data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = filterData(data, searchTerm);

  const handleRefresh = async () => {
    await refreshData();
  };

  const handleExport = () => {
    downloadCSV(filteredData, 'home-assistant-states.csv');
  };

  return (
    <div className={classNames(
      'min-h-screen transition-colors duration-200',
      isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-50 text-gray-900'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Home Assistant Entities Lookup</h1>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={classNames(
                    'inline-block w-3 h-3 rounded-full animate-pulse',
                    error ? 'bg-red-500' : 
                    loading ? 'bg-yellow-500' : 
                    'bg-green-500',
                    error ? 'shadow-sm shadow-red-500/50' :
                    loading ? 'shadow-sm shadow-yellow-500/50' :
                    'shadow-sm shadow-green-500/50'
                  )} />
                  <span className={classNames(
                    'text-sm font-medium',
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {error ? 'Connection Error' : 
                     loading ? 'Updating...' : 
                     'Connected'}
                  </span>
                </div>
                <div className={classNames(
                  'text-sm',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                )}>
                  Last updated: {new Date(lastRefresh).toLocaleString()}
                </div>
                {error && (
                  <div className="text-sm text-red-500">
                    {error.message}
                  </div>
                )}
              </div>
            </div>
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className={classNames(
                'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              )} />
              <input
                type="text"
                placeholder="Search entities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={classNames(
                  'w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors',
                  isDarkMode 
                    ? 'bg-[#1F1F1F] border-[#2D2D2D] focus:ring-blue-500 text-white'
                    : 'bg-white border-gray-300 focus:ring-blue-400'
                )}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className={classNames(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  isDarkMode 
                    ? 'bg-[#1F1F1F] hover:bg-[#2D2D2D] text-white'
                    : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300',
                  loading && 'opacity-50 cursor-not-allowed'
                )}
              >
                <RefreshCw className={classNames(
                  'w-5 h-5',
                  loading && 'animate-spin'
                )} />
                Refresh
              </button>

              <button
                onClick={handleExport}
                className={classNames(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                )}
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>
          </div>

          <ErrorBoundary isDarkMode={isDarkMode}>
            <DataTable 
              data={filteredData}
              loading={loading}
              isDarkMode={isDarkMode}
            />
          </ErrorBoundary>

        </div>
      </div>
    </div>
  );
}

export default App;