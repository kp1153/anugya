'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChar, setSelectedChar] = useState('सभी');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    fetchAuthors();
  }, []);

  async function fetchAuthors() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/authors');
      const data = await res.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error:', error);
      setError('लेखक लोड नहीं हो पाए');
    } finally {
      setLoading(false);
    }
  }

  const filteredAuthors = selectedChar === 'सभी' 
    ? authors 
    : authors.filter(author => author.name.toUpperCase().startsWith(selectedChar));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">लोड हो रहा है...</div>
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
      <h1 className="text-3xl font-bold mb-8">लेखक</h1>

      {/* A-Z अक्षर बटन */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <button
            onClick={() => setSelectedChar('सभी')}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              selectedChar === 'सभी' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            सभी
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

      {/* लेखक लिस्ट */}
      {filteredAuthors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {selectedChar === 'सभी' ? 'कोई लेखक नहीं मिला' : `'${selectedChar}' अक्षर से कोई लेखक नहीं मिला`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAuthors.map((author) => (
            <Link
              key={author.id}
              href={`/author/${author.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                {author.profile_image ? (
                  <img 
                    src={author.profile_image} 
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl text-gray-400">👤</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-center line-clamp-2">{author.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}