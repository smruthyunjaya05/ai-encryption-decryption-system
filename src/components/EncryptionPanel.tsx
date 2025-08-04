import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface EncryptionPanelProps {
  onEncrypt: (text: string) => { ciphertext: string; tag: string };
}

export default function EncryptionPanel({ onEncrypt }: EncryptionPanelProps) {
  const [plaintext, setPlaintext] = useState('');
  const [result, setResult] = useState<{ ciphertext: string; tag: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEncrypt = () => {
    setLoading(true);
    try {
      const result = onEncrypt(plaintext);
      setResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="text-indigo-600" />
        <h2 className="text-2xl font-semibold">Encryption</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plaintext
          </label>
          <textarea
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            className="w-full h-32 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter text to encrypt..."
          />
        </div>

        <button
          onClick={handleEncrypt}
          disabled={loading || !plaintext}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Encrypting...' : 'Encrypt'}
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">Result:</h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600">Ciphertext:</label>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {result.ciphertext}
                </pre>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tag:</label>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {result.tag}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}