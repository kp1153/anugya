// app/author/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      {authors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">कोई लेखक नहीं मिला</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/author/${author.slug}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow text-center"
            >
              <div className="text-4xl mb-2">👤</div>
              <h3 className="font-semibold text-sm line-clamp-2">{author.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
