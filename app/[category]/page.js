'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, [resolvedParams.category]);

  async function fetchBooks() {
    try {
      const res = await fetch(`/api/books?category=${resolvedParams.category}`);
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">लोड हो रहा है...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 capitalize">
        {resolvedParams.category.replace(/-/g, ' ')}
      </h1>
      
      {books.length === 0 ? (
        <p className="text-center text-gray-500 py-12">इस श्रेणी में कोई किताब नहीं है</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
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
                  <Link href={`/${resolvedParams.category}/${book.slug}`} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm">
                    विवरण देखें
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}