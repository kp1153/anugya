'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryTitles = {
    'novel': 'Novels',
    'story': 'Stories',
    'russian-literature': 'Russian Literature',
    'autobiography': 'Autobiography',
    'biography': 'Biography',
    'criticism': 'Criticism',
    'ghazal': 'Ghazal',
    'northeast-literature': 'North-East Literature',
    'rachnawali': 'Rachnawali',
    'miscellaneous': 'Miscellaneous',
    'popular': 'Popular Books',
    'latest': 'Latest Books',
    'tracking': 'Order Tracking',
    'contact': 'Contact Us'
  };

  useEffect(() => {
    fetchBooks();
  }, [category]);

  async function fetchBooks() {
    setLoading(true);
    setError(null);

    try {
      let url = '/api/books';
      
      if (category === 'popular') {
        url += '?popular=true';
      } else if (category === 'latest') {
        url += '?latest=true';
      } else if (category !== 'tracking' && category !== 'contact') {
        url += `?category=${category}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  }

  if (category === 'tracking') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Tracking</h1>
        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-600">Order tracking feature coming soon...</p>
        </div>
      </div>
    );
  }

  if (category === 'contact') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-600 mb-4">Get in touch with us:</p>
          <p className="text-gray-800">Email: info@anugya.com</p>
          <p className="text-gray-800">Phone: +91 1234567890</p>
        </div>
      </div>
    );
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
      <h1 className="text-3xl font-bold mb-8">{categoryTitles[category] || category}</h1>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found in this category</p>
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
      )}
    </div>
  );
}