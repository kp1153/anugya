'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function TranslatorDetailPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const [translator, setTranslator] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      fetchTranslatorAndBooks();
    }
  }, [slug]);

  async function fetchTranslatorAndBooks() {
    setLoading(true);
    setError(null);

    try {
      const translatorRes = await fetch(`/api/translators/slug/${slug}`);
      if (!translatorRes.ok) throw new Error('Translator not found');
      const translatorData = await translatorRes.json();
      setTranslator(translatorData);

      const booksRes = await fetch(`/api/books?translator=${encodeURIComponent(translatorData.name)}`);
      const booksData = await booksRes.json();
      setBooks(booksData);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            {translator.profile_image ? (
              <img 
                src={translator.profile_image} 
                alt={translator.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-6xl">
                👤
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{translator.name}</h1>
            {translator.description && (
              <p className="text-gray-700 mt-4 whitespace-pre-wrap">{translator.description}</p>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Books Translated ({books.length})</h2>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found for this translator</p>
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
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                <div className="flex items-center justify-between mt-3 mb-2">
                  <span className="text-teal-600 font-bold text-lg">₹{book.price}</span>
                  <Link 
                    href={`/book/${book.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    View Details
                  </Link>
                </div>
                <button
                  onClick={() => addToCart(book)}
                  disabled={book.stock === 0}
                  className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-semibold"
                >
                  {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}