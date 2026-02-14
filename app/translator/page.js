'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TranslatorPage() {
  const [translators, setTranslators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChar, setSelectedChar] = useState('All');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    fetchTranslators();
  }, []);

  async function fetchTranslators() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/translators');
      const data = await res.json();
      setTranslators(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load translators');
    } finally {
      setLoading(false);
    }
  }

  const filteredTranslators = selectedChar === 'All' 
    ? translators 
    : translators.filter(translator => translator.name.toUpperCase().startsWith(selectedChar));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Translators</h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <button
            onClick={() => setSelectedChar('All')}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              selectedChar === 'All' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {alphabet.map((char) => (
            <button
              key={char}
              onClick={() => setSelectedChar(char)}
              className={`w-10 h-10 rounded font-semibold transition-colors ${
                selectedChar === char 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {filteredTranslators.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {selectedChar === 'All' ? 'No translators found' : `No translators found starting with '${selectedChar}'`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTranslators.map((translator) => (
            <Link
              key={translator.id}
              href={`/translator/${translator.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                {translator.profile_image ? (
                  <img 
                    src={translator.profile_image} 
                    alt={translator.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl text-gray-400">👤</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-center line-clamp-2">{translator.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}