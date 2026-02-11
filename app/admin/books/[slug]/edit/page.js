'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    translator: '',
    category: '',
    price: '',
    description: '',
    cover_image: '',
    isbn: '',
    pages: '',
    publisher: '',
    published_date: '',
    stock: 0,
    binding_type: 'paperback',
    language: 'Hindi',
    featured: false,
    popular: false
  });

  const categories = [
    'novel', 'story', 'russian-literature', 'autobiography', 'biography', 
    'criticism', 'ghazal', 'tribal-literature/poetry', 'tribal-literature/prose',
    'dalit-literature/poetry', 'dalit-literature/prose', 'classics/anuugya-classics',
    'northeast-literature', 'discourse/women', 'academic/journalism', 
    'academic/linguistics', 'academic/philosophy', 'academic/history-politics',
    'translation/foreign-literature', 'translation/indian-literature',
    'language/urdu', 'language/bundelkhandi', 'language/bhojpuri',
    'rachnawali', 'miscellaneous'
  ];

  useEffect(() => {
    fetchBook();
  }, []);

  async function fetchBook() {
    try {
      const res = await fetch(`/api/books/${params.slug}`);
      const data = await res.json();
      setFormData({
        title: data.title || '',
        author: data.author || '',
        translator: data.translator || '',
        category: data.category || '',
        price: data.price || '',
        description: data.description || '',
        cover_image: data.cover_image || '',
        isbn: data.isbn || '',
        pages: data.pages || '',
        publisher: data.publisher || '',
        published_date: data.published_date || '',
        stock: data.stock || 0,
        binding_type: data.binding_type || 'paperback',
        language: data.language || 'Hindi',
        featured: data.featured || false,
        popular: data.popular || false
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load book');
    } finally {
      setFetching(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/books/${params.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Book updated successfully!');
        router.push('/admin/books');
      } else {
        alert('Failed to update book');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update book');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Book</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Translator</label>
            <input
              type="text"
              name="translator"
              value={formData.translator}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Binding Type *</label>
            <select
              name="binding_type"
              value={formData.binding_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="paperback">Paperback</option>
              <option value="hardbound">Hardbound</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Language *</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="Hindi">Hindi</option>
              <option value="Urdu">Urdu</option>
              <option value="Bundelkhandi">Bundelkhandi</option>
              <option value="Bhojpuri">Bhojpuri</option>
              <option value="English">English</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Pages</label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Published Date</label>
            <input
              type="date"
              name="published_date"
              value={formData.published_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
            <div className="flex gap-4 items-center">
              <CldUploadWidget
                uploadPreset="anugya_books"
                onSuccess={(result) => {
                  setFormData(prev => ({ ...prev, cover_image: result.info.secure_url }));
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Upload New Image
                  </button>
                )}
              </CldUploadWidget>
              <input
                type="url"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleChange}
                placeholder="Or paste image URL"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
            {formData.cover_image && (
              <img src={formData.cover_image} alt="Cover" className="mt-4 w-32 h-48 object-cover rounded" />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="md:col-span-2 flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-semibold">Featured</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="popular"
                checked={formData.popular}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-semibold">Popular</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Updating...' : 'Update Book'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}