// app/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const res = await fetch('/api/books?limit=12');
      const data = await res.json();
      
      // Check करो data array है या नहीं
      if (Array.isArray(data)) {
        setBooks(data);
        setFeaturedBooks(data.slice(0, 4));
      } else {
        console.error('API returned non-array:', data);
        setBooks([]);
        setFeaturedBooks([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setBooks([]);
      setFeaturedBooks([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Section */}
      {featuredBooks.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] relative bg-gray-200">
                  {book.cover_image ? (
                    <img 
                      src={book.cover_image} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                      📚
                    </div>
                  )}
                  {book.binding_type === 'hardbound' && (
                    <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                      Hardbound
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  {book.translator && (
                    <p className="text-gray-500 text-xs mb-2">Translator: {book.translator}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-teal-600 font-bold text-lg">₹{book.price}</span>
                    <Link 
                      href={`/books/${book.id}`}
                      className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Books */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Books</h2>
        {books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] relative bg-gray-200">
                  {book.cover_image ? (
                    <img 
                      src={book.cover_image} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                      📚
                    </div>
                  )}
                  {book.binding_type === 'hardbound' && (
                    <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                      Hardbound
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  {book.translator && (
                    <p className="text-gray-500 text-xs mb-2">Translator: {book.translator}</p>
                  )}
                  {book.language && book.language !== 'Hindi' && (
                    <p className="text-gray-500 text-xs mb-2">Language: {book.language}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-teal-600 font-bold text-lg">₹{book.price}</span>
                    <Link 
                      href={`/books/${book.id}`}
                      className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                    >
                      View Details
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