import React, { useState } from 'react';
import { Unlock } from 'lucide-react';

interface DecryptionPanelProps {
  onDecrypt: (ciphertext: string) => { plaintext: string; tag: string };
}

export default function DecryptionPanel({ onDecrypt }: DecryptionPanelProps) {
  const [ciphertext, setCiphertext] = useState('');
  const [result, setResult] = useState<{ plaintext: string; tag: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDecrypt = () => {
    setLoading(true);
    try {
      const result = onDecrypt(ciphertext);
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
        <Unlock className="text-purple-600" />
        <h2 className="text-2xl font-semibold">Decryption</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciphertext
          </label>
          <textarea
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            className="w-full h-32 p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            placeholder="Enter ciphertext to decrypt..."
          />
        </div>

        <button
          onClick={handleDecrypt}
          disabled={loading || !ciphertext}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Decrypting...' : 'Decrypt'}
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">Result:</h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600">Decrypted Text:</label>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {result.plaintext}
                </pre>
              </div>
              <div>
                <label className="text-sm text-gray-600">Verification Tag:</label>
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