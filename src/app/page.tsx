'use client';

import { useState } from 'react';
import { generateMotivation } from '@/config/gemini';

const moods = [
  'feeling anxious',
  'need focus',
  'feeling overwhelmed',
  'need confidence',
  'feeling stuck',
  'need inspiration',
  'feeling tired',
  'need courage'
];

export default function Home() {
  const [selectedMood, setSelectedMood] = useState('');
  const [motivation, setMotivation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!selectedMood) return;
    
    setLoading(true);
    setError('');
    try {
      const result = await generateMotivation(selectedMood);
      setMotivation(result);
    } catch (err) {
      setError('Failed to generate motivation. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          Daily Motivation Generator
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            How are you feeling today?
          </h2>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedMood === mood
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={!selectedMood || loading}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              !selectedMood || loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {loading ? 'Generating...' : 'Generate Motivation'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {motivation && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Your Daily Motivation
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {motivation}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
