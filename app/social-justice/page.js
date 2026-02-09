'use client';

import { useState, useEffect } from 'react';

export default function SocialJusticePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const res = await fetch('/api/books?category=सामाजिक न्याय');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">सामाजिक न्याय</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gray-200">
                <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{book.author}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-teal-600">₹{book.price}</span>
                  <span className={`text-xs px-2 py-1 rounded ${book.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {book.stock > 0 ? 'उपलब्ध' : 'स्टॉक में नहीं'}
                  </span>
                </div>
                <button disabled={book.stock === 0} className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold">
                  🛒 कार्ट में डालें
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}