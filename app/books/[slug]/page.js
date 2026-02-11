'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, use } from 'react';
import { useParams } from 'next/navigation';

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.slug;
  
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/books/${bookId}`);
        if (!res.ok) throw new Error('Book not found');
        const bookData = await res.json();
        setBook(bookData);

        const relatedRes = await fetch(`/api/books?category=${encodeURIComponent(bookData.category)}&limit=5`);
        const allBooks = await relatedRes.json();
        const related = allBooks.filter(b => b.id !== bookData.id).slice(0, 4);
        setRelatedBooks(related);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (bookId) {
      fetchData();
    }
  }, [bookId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">लोड हो रहा है...</div>;
  if (!book) return <div className="min-h-screen flex items-center justify-center">पुस्तक नहीं मिली</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-teal-600">होम</Link>
          <span>/</span>
          <Link href="/books" className="hover:text-teal-600">पुस्तकें</Link>
          <span>/</span>
          <span className="text-gray-800">{book.title}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div>
              {book.cover_image ? (
                <img 
                  src={book.cover_image} 
                  alt={book.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-9xl">📚</span>
                </div>
              )}
            </div>

            <div>
              <span className="inline-block bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {book.category}
              </span>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{book.title}</h1>
              
              <p className="text-xl text-gray-600 mb-6">
                <span className="font-semibold">लेखक:</span> {book.author}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-teal-600">₹{book.price || 0}</span>
                {book.stock > 0 ? (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    स्टॉक में उपलब्ध
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    स्टॉक खत्म
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                {book.isbn && (
                  <div>
                    <span className="text-gray-600">ISBN:</span>
                    <p className="font-semibold text-gray-800">{book.isbn}</p>
                  </div>
                )}
                {book.pages && (
                  <div>
                    <span className="text-gray-600">पृष्ठ:</span>
                    <p className="font-semibold text-gray-800">{book.pages}</p>
                  </div>
                )}
                {book.publisher && (
                  <div>
                    <span className="text-gray-600">प्रकाशक:</span>
                    <p className="font-semibold text-gray-800">{book.publisher}</p>
                  </div>
                )}
                {book.published_date && (
                  <div>
                    <span className="text-gray-600">प्रकाशन वर्ष:</span>
                    <p className="font-semibold text-gray-800">
                      {new Date(book.published_date).getFullYear()}
                    </p>
                  </div>
                )}
              </div>

              {book.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">विवरण</h3>
                  <p className="text-gray-600 leading-relaxed">{book.description}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={() => addToCart(book)}
                  disabled={book.stock === 0}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  🛒 कार्ट में डालें
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  ⚡ अभी खरीदें
                </button>
              </div>
            </div>
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">संबंधित पुस्तकें</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((relBook) => (
                <Link key={relBook.id} href={`/books/${relBook.id}`} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    {relBook.cover_image ? (
                      <img 
                        src={relBook.cover_image} 
                        alt={relBook.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-6xl">📚</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{relBook.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{relBook.author}</p>
                      <p className="text-lg font-bold text-teal-600">₹{relBook.price || 0}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}