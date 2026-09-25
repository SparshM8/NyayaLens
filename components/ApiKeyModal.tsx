'use client';

import React, { useState, useEffect } from 'react';
import { Key, CheckCircle, AlertCircle, X, Shield, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: (key: string) => void;
}

export default function ApiKeyModal({ isOpen, onClose, onKeySaved }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('NYAYALENS_GEMINI_API_KEY') || '';
      setApiKey(stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      if (apiKey.trim()) {
        localStorage.setItem('NYAYALENS_GEMINI_API_KEY', apiKey.trim());
      } else {
        localStorage.removeItem('NYAYALENS_GEMINI_API_KEY');
      }
    }
    onKeySaved(apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Please enter an API key to test.' });
      return;
    }
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey.trim());
      if (res.ok) {
        setTestResult({ success: true, message: 'API key is valid and connected to Google Gemini!' });
      } else {
        const data = await res.json().catch(() => ({}));
        setTestResult({ success: false, message: data.error?.message || 'Invalid Gemini API key. Please check Google AI Studio.' });
      }
    } catch {
      setTestResult({ success: false, message: 'Network connection check failed. Ensure the key has proper permissions.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleClear = () => {
    setApiKey('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('NYAYALENS_GEMINI_API_KEY');
    }
    onKeySaved('');
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl p-6 border border-slate-700/80 shadow-2xl bg-slate-900/95 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Google Gemini API Settings</h3>
            <p className="text-xs text-slate-400">Configure your custom Gemini 1.5/2.0 API key</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          NyayaLens uses Google Gemini for live document extraction, risk synthesis, and grounded Q&A. 
          If you don&apos;t have an API key right now, NyayaLens runs seamlessly in{' '}
          <span className="text-amber-400 font-medium">Instant Demo Mode</span> with full built-in sample contracts!
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 underline"
            >
              Get free Gemini key from Google AI Studio
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-rose-400 hover:text-rose-300"
              >
                Clear key
              </button>
            )}
          </div>

          {testResult && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start space-x-2 ${
                testResult.success
                  ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800 flex items-start space-x-2.5 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">Zero-leak privacy:</strong> Your key is stored exclusively in your local browser storage and is forwarded only to Google&apos;s API endpoints for processing your document.
            </p>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={handleTestKey}
              disabled={isTesting || !apiKey}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition disabled:opacity-50"
            >
              {isTesting ? 'Verifying...' : 'Test Connection'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center space-x-1.5"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Settings</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
