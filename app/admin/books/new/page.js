'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

export default function NewBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author_id: '',
    translator_id: '',
    category: '',
    language: 'Hindi',
    pages: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    is_multi_volume: false,
    number_of_volumes: 1,
    paperback_single_price: '',
    hardbound_single_price: '',
    paperback_set_price: '',
    hardbound_set_price: '',
    cover_image: '',
    description: '',
    stock: 0
  });

  useEffect(() => {
    fetchAuthors();
    fetchTranslators();
  }, []);

  async function fetchAuthors() {
    try {
      const res = await fetch('/api/authors');
      const data = await res.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchTranslators() {
    try {
      const res = await fetch('/api/translators');
      const data = await res.json();
      setTranslators(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        author_id: formData.author_id ? parseInt(formData.author_id) : null,
        translator_id: formData.translator_id ? parseInt(formData.translator_id) : null,
        pages: formData.pages ? parseInt(formData.pages) : null,
        length: formData.length ? parseFloat(formData.length) : null,
        width: formData.width ? parseFloat(formData.width) : null,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        number_of_volumes: parseInt(formData.number_of_volumes),
        paperback_single_price: formData.paperback_single_price ? parseFloat(formData.paperback_single_price) : null,
        hardbound_single_price: formData.hardbound_single_price ? parseFloat(formData.hardbound_single_price) : null,
        paperback_set_price: formData.paperback_set_price ? parseFloat(formData.paperback_set_price) : null,
        hardbound_set_price: formData.hardbound_set_price ? parseFloat(formData.hardbound_set_price) : null,
        stock: parseInt(formData.stock)
      };

      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (res.ok) {
        alert('Book added successfully!');
        router.push('/admin/books');
      } else {
        const error = await res.json();
        alert('Failed to add book: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">ISBN/Barcode</label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => setFormData({...formData, isbn: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="ISBN Code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Book title"
            />
          </div>
        </div>

        {/* Author & Translator */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <select
              value={formData.author_id}
              onChange={(e) => setFormData({...formData, author_id: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Author</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Translator</label>
            <select
              value={formData.translator_id}
              onChange={(e) => setFormData({...formData, translator_id: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Translator (Optional)</option>
              {translators.map(translator => (
                <option key={translator.id} value={translator.id}>{translator.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category & Language */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="novel">Novel</option>
              <option value="story">Story</option>
              <option value="russian-literature">Russian Literature</option>
              <option value="autobiography">Autobiography</option>
              <option value="biography">Biography</option>
              <option value="criticism">Criticism</option>
              <option value="ghazal">Ghazal</option>
              <option value="tribal-literature/poetry">Tribal Literature - Poetry</option>
              <option value="tribal-literature/prose">Tribal Literature - Prose</option>
              <option value="dalit-literature/poetry">Dalit Literature - Poetry</option>
              <option value="dalit-literature/prose">Dalit Literature - Prose</option>
              <option value="classics/anuugya-classics">Anuugya Classics</option>
              <option value="northeast-literature">North-East Literature</option>
              <option value="discourse/women">Women Discourse</option>
              <option value="academic/journalism">Academic - Journalism</option>
              <option value="academic/linguistics">Academic - Linguistics</option>
              <option value="academic/philosophy">Academic - Philosophy</option>
              <option value="academic/history-politics">Academic - History & Politics</option>
              <option value="rachnawali">Rachnawali</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="Hindi">Hindi</option>
              <option value="Urdu">Urdu</option>
              <option value="Bundelkhandi">Bundelkhandi</option>
              <option value="Bhojpuri">Bhojpuri</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* Physical Details */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pages</label>
            <input
              type="number"
              value={formData.pages}
              onChange={(e) => setFormData({...formData, pages: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Number of pages"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Length (cm)</label>
            <input
              type="number"
              step="0.1"
              value={formData.length}
              onChange={(e) => setFormData({...formData, length: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Length"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Width (cm)</label>
            <input
              type="number"
              step="0.1"
              value={formData.width}
              onChange={(e) => setFormData({...formData, width: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Width"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Height (cm)</label>
            <input
              type="number"
              step="0.1"
              value={formData.height}
              onChange={(e) => setFormData({...formData, height: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Height"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Weight (grams)</label>
          <input
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Weight in grams"
          />
        </div>

        {/* Multi-Volume */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_multi_volume}
              onChange={(e) => setFormData({...formData, is_multi_volume: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Multi-Volume Set</span>
          </label>

          {formData.is_multi_volume && (
            <div>
              <input
                type="number"
                min="2"
                value={formData.number_of_volumes}
                onChange={(e) => setFormData({...formData, number_of_volumes: e.target.value})}
                className="w-24 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Volumes"
              />
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Pricing</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Paperback Single Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={formData.paperback_single_price}
                onChange={(e) => setFormData({...formData, paperback_single_price: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Single paperback price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hardbound Single Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={formData.hardbound_single_price}
                onChange={(e) => setFormData({...formData, hardbound_single_price: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Single hardbound price"
              />
            </div>

            {formData.is_multi_volume && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Paperback Set Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.paperback_set_price}
                    onChange={(e) => setFormData({...formData, paperback_set_price: e.target.value})}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    placeholder="Paperback set price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hardbound Set Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.hardbound_set_price}
                    onChange={(e) => setFormData({...formData, hardbound_set_price: e.target.value})}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    placeholder="Hardbound set price"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Cover Image - Cloudinary Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <CldUploadWidget
            uploadPreset="your_upload_preset"
            onSuccess={(result) => {
              setFormData({...formData, cover_image: result.info.secure_url});
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Upload Cover Image
              </button>
            )}
          </CldUploadWidget>
          {formData.cover_image && (
            <div className="mt-2">
              <img 
                src={formData.cover_image} 
                alt="Cover preview" 
                className="w-32 h-40 object-cover rounded"
              />
              <p className="text-xs text-gray-600 mt-1 break-all">{formData.cover_image}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder="Book description..."
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-2">Stock</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Stock quantity"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Adding...' : 'Add Book'}
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