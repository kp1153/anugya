'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewAuthorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    biography: '',
    birth_date: '',
    death_date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Author added successfully!');
        router.push('/admin/authors');
      } else {
        alert('Failed to add author');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add author');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Author</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Author name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Photo URL</label>
          <input
            type="url"
            value={formData.photo}
            onChange={(e) => setFormData({...formData, photo: e.target.value})}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="https://example.com/photo.jpg"
          />
          {formData.photo && (
            <img 
              src={formData.photo} 
              alt="Preview" 
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Biography</label>
          <textarea
            value={formData.biography}
            onChange={(e) => setFormData({...formData, biography: e.target.value})}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder="Author biography..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Birth Date</label>
            <input
              type="date"
              value={formData.birth_date}
              onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Death Date</label>
            <input
              type="date"
              value={formData.death_date}
              onChange={(e) => setFormData({...formData, death_date: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Adding...' : 'Add Author'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}