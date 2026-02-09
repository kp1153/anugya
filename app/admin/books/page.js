'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBook(id) {
    if (!confirm('क्या आप इस किताब को डिलीट करना चाहते हैं?')) return;
    
    try {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      fetchBooks();
    } catch (error) {
      alert('डिलीट करने में समस्या आई');
    }
  }

  if (loading) {
    return <div className="text-center py-12">लोड हो रहा है...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">सभी किताबें</h2>
        <Link 
          href="/admin/books/new"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          ➕ नई किताब जोड़ें
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">अभी कोई किताब नहीं है</p>
          <Link 
            href="/admin/books/new"
            className="text-teal-600 hover:text-teal-700 font-semibold"
          >
            पहली किताब जोड़ें →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">कवर</th>
                <th className="text-left p-4 font-semibold">शीर्षक</th>
                <th className="text-left p-4 font-semibold">लेखक</th>
                <th className="text-left p-4 font-semibold">कैटेगरी</th>
                <th className="text-left p-4 font-semibold">कीमत</th>
                <th className="text-left p-4 font-semibold">स्टॉक</th>
                <th className="text-left p-4 font-semibold">एक्शन</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {book.cover_image ? (
                      <img src={book.cover_image} alt={book.title} className="w-12 h-16 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">📚</div>
                    )}
                  </td>
                  <td className="p-4 font-medium">{book.title}</td>
                  <td className="p-4 text-gray-600">{book.author}</td>
                  <td className="p-4 text-gray-600">{book.category}</td>
                  <td className="p-4 font-semibold text-teal-600">₹{book.price}</td>
                  <td className="p-4">{book.stock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/books/${book.id}/edit`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        एडिट
                      </Link>
                      <button
                        onClick={() => deleteBook(book.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        डिलीट
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}