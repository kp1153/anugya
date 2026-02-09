'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    description: '',
    cover_image: '',
    isbn: '',
    pages: '',
    publisher: '',
    published_date: '',
    stock: 0,
    featured: false
  });

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
        category: data.category || '',
        price: data.price || '',
        description: data.description || '',
        cover_image: data.cover_image || '',
        isbn: data.isbn || '',
        pages: data.pages || '',
        publisher: data.publisher || '',
        published_date: data.published_date || '',
        stock: data.stock || 0,
        featured: data.featured || false
      });
    } catch (error) {
      console.error('Error:', error);
      alert('किताब लोड करने में समस्या आई');
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
        alert('किताब सफलतापूर्वक अपडेट हुई!');
        router.push('/admin/books');
      } else {
        alert('किताब अपडेट करने में समस्या आई');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('किताब अपडेट करने में समस्या आई');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <div className="text-center py-12">लोड हो रहा है...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">किताब एडिट करें</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">शीर्षक *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">लेखक *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">कैटेगरी *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">चुनें</option>
              <option value="साहित्य">साहित्य</option>
              <option value="कविता">कविता</option>
              <option value="उपन्यास">उपन्यास</option>
              <option value="कहानी संग्रह">कहानी संग्रह</option>
              <option value="निबंध">निबंध</option>
              <option value="आत्मकथा">आत्मकथा</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">कीमत (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">पृष्ठ संख्या</label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">प्रकाशक</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">प्रकाशन तिथि</label>
            <input
              type="date"
              name="published_date"
              value={formData.published_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">स्टॉक</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">कवर इमेज URL</label>
            <input
              type="url"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">विवरण</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-gray-700 font-semibold">फ़ीचर्ड किताब</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
          >
            {loading ? 'अपडेट हो रहा है...' : 'अपडेट करें'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            रद्द करें
          </button>
        </div>
      </form>
    </div>
  );
}