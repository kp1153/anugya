'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';

export default function AuthorDetailPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchAuthorAndBooks();
    }
  }, [slug]);

  async function fetchAuthorAndBooks() {
    setLoading(true);
    setError(null);

    try {
      const authorRes = await fetch(`/api/authors/slug/${slug}`);
      if (!authorRes.ok) throw new Error('Author not found');
      const authorData = await authorRes.json();
      setAuthor(authorData);

      const booksRes = await fetch(`/api/books?author=${encodeURIComponent(authorData.name)}`);
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
            {author.profile_image ? (
              <img 
                src={author.profile_image} 
                alt={author.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-6xl">
                👤
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
            {author.description && (
              <p className="text-gray-700 mt-4 whitespace-pre-wrap">{author.description}</p>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Books ({books.length})</h2>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found for this author</p>
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
                <div className="flex items-center justify-between mt-3">
                  <span className="text-teal-600 font-bold text-lg">₹{book.price}</span>
                  <Link 
                    href={`/book/${book.slug}`}
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