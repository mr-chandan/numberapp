'use client';

import { useEffect, useState } from 'react';
import { Calculation } from '@/lib/types';
import AuthForm from '@/components/AuthForm';
import CalculationTree from '@/components/CalculationTree';
import AddCalculation from '@/components/AddCalculation';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    if (savedToken && savedUsername) {
      setToken(savedToken);
      setUsername(savedUsername);
    }
  }, []);

  // Fetch calculations
  const fetchCalculations = async () => {
    try {
      const response = await fetch('/api/calculations');
      const data = await response.json();
      if (data.success && data.calculations) {
        setCalculations(data.calculations);
      }
    } catch (error) {
      console.error('Failed to fetch calculations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalculations();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchCalculations, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (newToken: string, newUsername: string) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading discussions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Number Discussions
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">Communicate through numbers & operations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {username ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm text-gray-600">Logged in as</p>
                    <p className="font-semibold text-gray-900">{username}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {username[0].toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(!showAuth)}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  {showAuth ? 'Close' : 'Login / Register'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Auth & New Discussion */}
          <div className="lg:col-span-1 space-y-6">
            {/* Auth Form */}
            {!token && showAuth && (
              <div className="transform transition-all duration-300 ease-in-out">
                <AuthForm onSuccess={handleLogin} />
              </div>
            )}

            {/* Start New Discussion */}
            {token && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Start Discussion</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">Begin a new calculation chain</p>
                <AddCalculation token={token} onSuccess={fetchCalculations} />
              </div>
            )}

            {/* Info Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How It Works
              </h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-start">
                  <span className="mr-2">👀</span>
                  <span>View all discussions without login</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔐</span>
                  <span>Register/Login to participate</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">➕</span>
                  <span>Start with a number</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🧮</span>
                  <span>Add operations (+, -, ×, ÷)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🌳</span>
                  <span>Build calculation trees</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs opacity-75">
                  <strong>{calculations.length}</strong> discussions • Real-time updates
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Discussion Tree */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">All Discussions</h2>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>

              {calculations.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">No discussions yet</p>
                  <p className="text-gray-500 mb-6">
                    {token 
                      ? 'Be the first to start a discussion!' 
                      : 'Login to start the first discussion'}
                  </p>
                  {!token && (
                    <button
                      onClick={() => setShowAuth(true)}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                      Get Started
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <CalculationTree
                    calculations={calculations}
                    token={token}
                    onUpdate={fetchCalculations}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
