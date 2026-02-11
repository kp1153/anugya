'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBooks();
  }, [filter]);

  async function fetchBooks() {
    try {
      let url = '/api/books';
      if (filter === 'popular') url += '?popular=true';
      if (filter === 'latest') url += '?latest=true';
      
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBook(id) {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      fetchBooks();
    } catch (error) {
      alert('Failed to delete book');
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Books</h2>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Books</option>
            <option value="popular">Popular</option>
            <option value="latest">Latest</option>
          </select>
          <Link
            href="/admin/books/new"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            + Add New Book
          </Link>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No books yet</p>
          <Link
            href="/admin/books/new"
            className="text-teal-600 hover:text-teal-700 font-semibold"
          >
            Add first book →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Cover</th>
                  <th className="text-left p-4 font-semibold">Title</th>
                  <th className="text-left p-4 font-semibold">Author</th>
                  <th className="text-left p-4 font-semibold">Translator</th>
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-left p-4 font-semibold">Binding</th>
                  <th className="text-left p-4 font-semibold">Language</th>
                  <th className="text-left p-4 font-semibold">Price</th>
                  <th className="text-left p-4 font-semibold">Stock</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
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
                    <td className="p-4 font-medium max-w-xs truncate">{book.title}</td>
                    <td className="p-4 text-gray-600">{book.author}</td>
                    <td className="p-4 text-gray-600">{book.translator || '-'}</td>
                    <td className="p-4 text-gray-600 text-sm">{book.category}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        book.binding_type === 'hardbound' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {book.binding_type || 'paperback'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">{book.language || 'Hindi'}</td>
                    <td className="p-4 font-semibold text-teal-600">₹{book.price}</td>
                    <td className="p-4">{book.stock}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {book.featured ? (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">Featured</span>
                        ) : null}
                        {book.popular ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Popular</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/books/${book.id}/edit`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteBook(book.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}