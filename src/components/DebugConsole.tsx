import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface LogMessage {
  type: 'info' | 'error';
  message: string;
  timestamp: Date;
}

interface DebugConsoleProps {
  logs: LogMessage[];
}

export default function DebugConsole({ logs }: DebugConsoleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 p-4 text-gray-300 hover:text-white"
      >
        <Terminal size={20} />
        <span className="font-medium">Debug Console</span>
      </button>

      {isOpen && (
        <div className="p-4 max-h-64 overflow-y-auto font-mono text-sm">
          {logs.map((log, index) => (
            <div
              key={index}
              className={`mb-2 ${
                log.type === 'error' ? 'text-red-400' : 'text-green-400'
              }`}
            >
              <span className="text-gray-500">
                [{log.timestamp.toLocaleTimeString()}]
              </span>{' '}
              {log.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}