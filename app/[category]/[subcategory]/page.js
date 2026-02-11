'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function SubcategoryPage() {
  const params = useParams();
  const category = params.category;
  const subcategory = params.subcategory;
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageTitles = {
    'tribal-literature/poetry': 'Tribal Literature - Poetry',
    'tribal-literature/prose': 'Tribal Literature - Prose',
    'dalit-literature/poetry': 'Dalit Literature - Poetry',
    'dalit-literature/prose': 'Dalit Literature - Prose',
    'classics/anuugya-classics': 'Anuugya Classics',
    'discourse/women': 'Women Discourse',
    'academic/journalism': 'Academic - Journalism',
    'academic/linguistics': 'Academic - Linguistics',
    'academic/philosophy': 'Academic - Philosophy',
    'academic/history-politics': 'Academic - History & Politics',
    'binding/paperback': 'Paperback Books',
    'binding/hardbound': 'Hardbound Books',
    'language/urdu': 'Urdu Books',
    'language/bundelkhandi': 'Bundelkhandi Books',
    'language/bhojpuri': 'Bhojpuri Books',
    'translation/foreign-literature': 'Translation - Foreign Literature',
    'translation/indian-literature': 'Translation - Indian Literature'
  };

  useEffect(() => {
    fetchBooks();
  }, [category, subcategory]);

  async function fetchBooks() {
    setLoading(true);
    setError(null);

    try {
      let url = '/api/books?';
      
      if (category === 'binding') {
        url += `binding=${subcategory}`;
      } else if (category === 'language') {
        url += `language=${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}`;
      } else {
        url += `category=${category}/${subcategory}`;
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

  const pageKey = `${category}/${subcategory}`;
  const pageTitle = pageTitles[pageKey] || `${category} - ${subcategory}`;

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
      <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>

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
                {book.binding_type === 'hardbound' && (
                  <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    Hardbound
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                {book.translator && (
                  <p className="text-gray-500 text-xs mb-2">Translator: {book.translator}</p>
                )}
                {book.language && book.language !== 'Hindi' && (
                  <p className="text-gray-500 text-xs mb-2">Language: {book.language}</p>
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