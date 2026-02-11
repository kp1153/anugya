'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AuthorsListPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  async function fetchAuthors() {
    try {
      const res = await fetch('/api/authors');
      const data = await res.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAuthor(id) {
    if (!confirm('Are you sure you want to delete this author?')) return;

    try {
      const res = await fetch(`/api/authors?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Author deleted successfully!');
        fetchAuthors();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete author');
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Authors</h1>
        <Link 
          href="/admin/authors/new"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add New Author
        </Link>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No authors found. Add your first author!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div key={author.id} className="bg-white rounded-lg shadow-md p-6">
              {author.photo && (
                <img 
                  src={author.photo} 
                  alt={author.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-xl font-bold text-center mb-2">{author.name}</h3>
              {author.birth_date && (
                <p className="text-sm text-gray-600 text-center mb-2">
                  Born: {author.birth_date}
                  {author.death_date && ` - Died: ${author.death_date}`}
                </p>
              )}
              {author.biography && (
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{author.biography}</p>
              )}
              <div className="flex gap-2 justify-center">
                <Link
                  href={`/admin/authors/edit/${author.id}`}
                  className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteAuthor(author.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}