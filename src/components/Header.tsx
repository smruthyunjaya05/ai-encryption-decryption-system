import React from 'react';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <Shield size={40} className="text-white" />
          <h1 className="text-4xl font-bold">AI Encryption & Decryption System</h1>
        </div>
        <p className="text-lg text-indigo-100">
          Secure your messages using advanced cryptographic techniques.
        </p>
      </div>
    </header>
  );
}