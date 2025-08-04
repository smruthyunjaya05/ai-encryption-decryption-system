import React, { useState } from 'react';
import Header from './components/Header';
import EncryptionPanel from './components/EncryptionPanel';
import DecryptionPanel from './components/DecryptionPanel';
import AdvancedOptions from './components/AdvancedOptions';
import DebugConsole from './components/DebugConsole';
import { encrypt, decrypt, defaultConfig, type EncryptionConfig } from './utils/encryptionCore';

interface LogMessage {
  type: 'info' | 'error';
  message: string;
  timestamp: Date;
}

export default function App() {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [config, setConfig] = useState<EncryptionConfig>(defaultConfig);

  const addLog = (message: string, type: 'info' | 'error' = 'info') => {
    setLogs(prev => [...prev, { message, type, timestamp: new Date() }]);
  };

  const handleEncrypt = (text: string) => {
    try {
      addLog(`Starting encryption for text of length ${text.length}`);
      const result = encrypt(text, config);
      addLog('Encryption successful');
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error during encryption';
      addLog(message, 'error');
      throw error;
    }
  };

  const handleDecrypt = (ciphertext: string) => {
    try {
      addLog(`Starting decryption for ciphertext: ${ciphertext.slice(0, 32)}...`);
      const result = decrypt(ciphertext, config);
      addLog('Decryption successful');
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error during decryption';
      addLog(message, 'error');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EncryptionPanel onEncrypt={handleEncrypt} />
            <DecryptionPanel onDecrypt={handleDecrypt} />
          </div>
          
          <AdvancedOptions config={config} onConfigChange={setConfig} />
          <DebugConsole logs={logs} />
        </div>
      </main>
    </div>
  );
}