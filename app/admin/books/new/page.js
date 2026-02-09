'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

export default function NewBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    description: '',
    cover_image: '',
    isbn: '',
    pages: '',
    stock: 0,
    featured: false,
    popular: false  // नया फील्ड
  });

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
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('किताब सफलतापूर्वक जोड़ी गई!');
        router.push('/admin');
      } else {
        alert('किताब जोड़ने में समस्या आई');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('किताब जोड़ने में समस्या आई');
    } finally {
      setLoading(false);
    }
  }

  const navItems = [
    { name: 'होम', href: '/' },
    { name: 'कविता', href: '/portry' },
    { name: 'कहानी', href: '/story' },
    { name: 'पत्रकारिता', href: '/journalism' },
    { name: 'समाज विज्ञान', href: '/social-science' },
    { name: 'स्त्री अध्ययन', href: '/woman-study' },
    { name: 'शिक्षा', href: '/education' },
    { name: 'ब्लॉग', href: '/blog' },
    { name: 'सामाजिक न्याय', href: '/social-justice' },
    { name: 'आत्मकथा', href: '/autobiography' },
    { name: 'लोक साहित्य', href: '/folk-literare' },
    { name: 'कला', href: '/art' },
    { name: 'संपर्क करें', href: '/contact' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">नई किताब जोड़ें</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-gray-800 font-semibold mb-2">शीर्षक *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              placeholder="किताब का नाम"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">लेखक *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              placeholder="लेखक का नाम"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">कैटेगरी *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            >
              <option value="">चुनें</option>
              {navItems.filter(item => item.href !== '/' && item.href !== '/contact').map(item => (
                <option key={item.href} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">कीमत (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              placeholder="299"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              placeholder="978-XXXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">पृष्ठ संख्या</label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              placeholder="200"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">स्टॉक</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              placeholder="10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-800 font-semibold mb-2">कवर इमेज *</label>
            <CldUploadWidget
              uploadPreset="agoraprakashan"
              onSuccess={(result) => {
                setFormData(prev => ({ ...prev, cover_image: result.info.secure_url }));
              }}
            >
              {({ open }) => (
                <div>
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full px-4 py-3 text-white bg-teal-600 hover:bg-teal-700 border-2 border-teal-600 rounded-lg font-semibold"
                  >
                    📤 इमेज अपलोड करें
                  </button>
                  {formData.cover_image && (
                    <div className="mt-4">
                      <img 
                        src={formData.cover_image} 
                        alt="Cover preview" 
                        className="h-40 w-auto object-cover rounded-lg border-2 border-gray-300"
                      />
                      <p className="text-sm text-green-600 mt-2">✓ इमेज अपलोड हो गई</p>
                    </div>
                  )}
                </div>
              )}
            </CldUploadWidget>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-800 font-semibold mb-2">विवरण</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 resize-none"
              placeholder="किताब के बारे में..."
            />
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-teal-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-gray-800 font-semibold">फ़ीचर्ड किताब (बाईं साइड में दिखेगी)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="popular"
                checked={formData.popular}
                onChange={handleChange}
                className="w-5 h-5 text-teal-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-gray-800 font-semibold">लोकप्रिय किताब (दाईं साइड में दिखेगी)</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
          >
            {loading ? 'जोड़ा जा रहा है...' : 'किताब जोड़ें'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
          >
            रद्द करें
          </button>
        </div>
      </form>
    </div>
  );
}