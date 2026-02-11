'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TranslatorsListPage() {
  const [translators, setTranslators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTranslators();
  }, []);

  async function fetchTranslators() {
    try {
      const res = await fetch('/api/translators');
      const data = await res.json();
      setTranslators(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTranslator(id) {
    if (!confirm('Are you sure you want to delete this translator?')) return;

    try {
      const res = await fetch(`/api/translators?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Translator deleted successfully!');
        fetchTranslators();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete translator');
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
        <h1 className="text-3xl font-bold">Translators</h1>
        <Link 
          href="/admin/translators/new"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add New Translator
        </Link>
      </div>

      {translators.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No translators found. Add your first translator!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translators.map((translator) => (
            <div key={translator.id} className="bg-white rounded-lg shadow-md p-6">
              {translator.photo && (
                <img 
                  src={translator.photo} 
                  alt={translator.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-xl font-bold text-center mb-2">{translator.name}</h3>
              {translator.birth_date && (
                <p className="text-sm text-gray-600 text-center mb-2">
                  Born: {translator.birth_date}
                  {translator.death_date && ` - Died: ${translator.death_date}`}
                </p>
              )}
              {translator.biography && (
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{translator.biography}</p>
              )}
              <div className="flex gap-2 justify-center">
                <Link
                  href={`/admin/translators/edit/${translator.id}`}
                  className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteTranslator(translator.id)}
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