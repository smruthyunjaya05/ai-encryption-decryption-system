import React, { useState } from 'react';
import { Settings, RefreshCw } from 'lucide-react';
import { defaultConfig, type EncryptionConfig } from '../utils/encryptionCore';

interface AdvancedOptionsProps {
  config: EncryptionConfig;
  onConfigChange: (config: EncryptionConfig) => void;
}

export default function AdvancedOptions({ config, onConfigChange }: AdvancedOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    onConfigChange(defaultConfig);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <Settings size={20} />
        <span className="font-medium">Advanced Options</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nonce (Hex)
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={config.nonce.map(n => n.toString(16)).join(', ')}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key (Hex)
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={config.key.map(n => n.toString(16)).join(', ')}
                readOnly
              />
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <RefreshCw size={16} />
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
}