'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import FilterSidebar from '@/components/FilterSidebar';
import { FaSearch, FaSpinner } from 'react-icons/fa';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    subcategory: searchParams.get('subcategory') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    year: searchParams.get('year') || '',
    language: searchParams.get('language') || '',
    sortBy: searchParams.get('sortBy') || 'relevance',
    page: searchParams.get('page') || '1'
  });

  useEffect(() => {
    fetchResults();
  }, [searchParams]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setBooks(data.books);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    const updated = { ...filters, ...newFilters, page: '1' };
    setFilters(updated);
    
    const params = new URLSearchParams();
    Object.keys(updated).forEach(key => {
      if (updated[key]) params.append(key, updated[key]);
    });
    
    router.push(`/search?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const updated = { ...filters, page: newPage.toString() };
    setFilters(updated);
    
    const params = new URLSearchParams();
    Object.keys(updated).forEach(key => {
      if (updated[key]) params.append(key, updated[key]);
    });
    
    router.push(`/search?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            खोज परिणाम
          </h1>
          {filters.q && (
            <p className="text-gray-600">
              "{filters.q}" के लिए परिणाम
              {pagination && ` (${pagination.total} पुस्तकें मिलीं)`}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <FilterSidebar filters={filters} onFilterChange={updateFilters} />
          </div>

          <div className="lg:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600">क्रम:</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                  className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                >
                  <option value="relevance">प्रासंगिकता</option>
                  <option value="popular">लोकप्रिय</option>
                  <option value="latest">नवीनतम</option>
                  <option value="price_low">कीमत: कम से अधिक</option>
                  <option value="price_high">कीमत: अधिक से कम</option>
                  <option value="title">नाम (अ-ह)</option>
                </select>
              </div>
              {pagination && (
                <p className="text-sm text-gray-600">
                  पृष्ठ {pagination.page} / {pagination.totalPages}
                </p>
              )}
            </div>

            {loading && (
              <div className="flex justify-center items-center py-20">
                <FaSpinner className="animate-spin text-4xl text-[#8B4513]" />
              </div>
            )}

            {!loading && books.length === 0 && (
              <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  कोई परिणाम नहीं मिला
                </h3>
                <p className="text-gray-500">
                  कृपया अन्य शब्द या फ़िल्टर का उपयोग करें
                </p>
              </div>
            )}

            {!loading && books.length > 0 && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {books.map((book) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.id}`}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                    >
                      <div className="aspect-[3/4] relative bg-gray-100">
                        {book.cover_image ? (
                          <Image
                            src={book.cover_image}
                            alt={book.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            📚
                          </div>
                        )}
                        {book.popular && (
                          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                            लोकप्रिय
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">
                          {book.title}
                        </h3>
                        {book.author && (
                          <p className="text-xs text-gray-600 mb-2">
                            {book.author}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#8B4513]">
                            ₹{book.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      पिछला
                    </button>
                    
                    <div className="flex gap-1">
                      {[...Array(pagination.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        if (
                          pageNum === 1 ||
                          pageNum === pagination.totalPages ||
                          (pageNum >= pagination.page - 2 && pageNum <= pagination.page + 2)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-2 rounded-lg ${
                                pageNum === pagination.page
                                  ? 'bg-[#8B4513] text-white'
                                  : 'bg-white border hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          pageNum === pagination.page - 3 ||
                          pageNum === pagination.page + 3
                        ) {
                          return <span key={pageNum}>...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      अगला
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}