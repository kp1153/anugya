'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function BooksContent() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const categories = ['साहित्य', 'कविता', 'उपन्यास', 'कहानी संग्रह', 'निबंध', 'आत्मकथा'];

  useEffect(() => {
    fetchBooks();
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, selectedCategory, searchQuery, sortBy]);

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

  function filterAndSortBooks() {
    let result = [...books];

    if (selectedCategory !== 'all') {
      result = result.filter(book => book.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'latest':
      default:
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    setFilteredBooks(result);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">सभी पुस्तकें</h1>
          <p className="text-gray-600">कुल {filteredBooks.length} पुस्तकें मिलीं</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">खोजें</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="किताब या लेखक का नाम..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">श्रेणी</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    सभी श्रेणियाँ
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">क्रमबद्ध करें</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="latest">नवीनतम</option>
                  <option value="name">नाम (A-Z)</option>
                  <option value="price-low">कीमत (कम से ज्यादा)</option>
                  <option value="price-high">कीमत (ज्यादा से कम)</option>
                </select>
              </div>

              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  फ़िल्टर हटाएं
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredBooks.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-xl text-gray-600 mb-2">कोई पुस्तक नहीं मिली</p>
                <p className="text-gray-500">कृपया अलग फ़िल्टर या खोज शब्द आज़माएं</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <Link key={book.id} href={`/books/${book.id}`} className="group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                      {book.cover_image ? (
                        <img 
                          src={book.cover_image} 
                          alt={book.title}
                          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                          <span className="text-6xl">📚</span>
                        </div>
                      )}
                      <div className="p-4 flex-1 flex flex-col">
                        <span className="text-xs text-teal-600 font-semibold mb-2">{book.category}</span>
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 flex-1">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-xl font-bold text-teal-600">₹{book.price}</p>
                          {book.stock > 0 ? (
                            <span className="text-xs text-green-600 font-semibold">स्टॉक में</span>
                          ) : (
                            <span className="text-xs text-red-600 font-semibold">स्टॉक खत्म</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    }>
      <BooksContent />
    </Suspense>
  );
}