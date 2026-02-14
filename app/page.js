'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [newReleases, setNewReleases] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const res = await fetch('/api/books?limit=20');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        const releases = data.filter(book => book.is_new_release);
        setNewReleases(releases);
        setBooks(data);
      } else {
        setNewReleases([]);
        setBooks([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setNewReleases([]);
      setBooks([]);
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

  return (
    <div className="container mx-auto px-4 py-8">
      {newReleases.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">नई रिलीज</h2>
            <Link href="/new-release" className="text-teal-600 hover:text-teal-700 font-semibold">
              सभी देखें →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newReleases.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] relative bg-gray-200">
                  {book.cover_image ? (
                    <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">📚</div>
                  )}
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">नया</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-teal-600 font-bold text-lg">₹{book.price}</span>
                    <Link href={`/${book.category}/${book.slug}`} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm">
                      विवरण देखें
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">सभी पुस्तकें</h2>
        {books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">कोई किताब उपलब्ध नहीं है</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] relative bg-gray-200">
                  {book.cover_image ? (
                    <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">📚</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-teal-600 font-bold text-lg">₹{book.price}</span>
                    <Link href={`/${book.category}/${book.slug}`} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm">
                      विवरण देखें
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}