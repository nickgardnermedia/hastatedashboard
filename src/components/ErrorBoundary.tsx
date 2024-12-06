import React, { Component, ErrorInfo, ReactNode } from 'react';
import { classNames } from '../utils/classNames';

interface Props {
  children: ReactNode;
  isDarkMode: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={classNames(
          'rounded-lg p-6 text-center',
          this.props.isDarkMode 
            ? 'bg-red-900/20 border border-red-800'
            : 'bg-red-50 border border-red-200'
        )}>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className={classNames(
            'mb-4',
            this.props.isDarkMode ? 'text-gray-300' : 'text-gray-600'
          )}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={classNames(
              'px-4 py-2 rounded-lg transition-colors',
              this.props.isDarkMode
                ? 'bg-red-800 hover:bg-red-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            )}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;