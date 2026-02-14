'use client';

import { use, useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function BookDetailPage({ params }) {
  const resolvedParams = use(params);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBook();
  }, [resolvedParams.slug]);

  async function fetchBook() {
    try {
      const res = await fetch(`/api/books/slug/${resolvedParams.slug}`);
      const data = await res.json();
      setBook(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">लोड हो रहा है...</div>;
  }

  if (!book) {
    return <div className="container mx-auto px-4 py-8 text-center">किताब नहीं मिली</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
          {book.cover_image ? (
            <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">📚</div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
          <p className="text-xl text-gray-700 mb-2">लेखक: {book.author}</p>
          {book.translator && <p className="text-lg text-gray-600 mb-4">अनुवादक: {book.translator}</p>}
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-1">भाषा: {book.language}</p>
            {book.pages && <p className="text-sm text-gray-600 mb-1">पृष्ठ: {book.pages}</p>}
            {book.isbn && <p className="text-sm text-gray-600 mb-1">ISBN: {book.isbn}</p>}
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-teal-600">₹{book.price}</span>
            {book.stock > 0 ? (
              <span className="ml-4 text-green-600 font-semibold">स्टॉक में उपलब्ध</span>
            ) : (
              <span className="ml-4 text-red-600 font-semibold">स्टॉक में नहीं</span>
            )}
          </div>

          {book.description && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">विवरण</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          )}

          <button
            onClick={() => addToCart(book)}
            disabled={book.stock === 0}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {book.stock > 0 ? 'कार्ट में जोड़ें' : 'स्टॉक में नहीं'}
          </button>
        </div>
      </div>
    </div>
  );
}