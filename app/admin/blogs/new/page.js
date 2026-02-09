'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import dynamic from 'next/dynamic';

const BlockNoteEditor = dynamic(() => import('@/components/BlockNoteEditor'), {
  ssr: false,
  loading: () => <div className="p-4 text-center">एडिटर लोड हो रहा है...</div>
});

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    featured_image: '',
    status: 'draft'
  });
  const [media, setMedia] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'title') {
  const slug = value
    .split('')
    .map(char => {
      const romanMap = {
        'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
        'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
        'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
        'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
        'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
        'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
        'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
        'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh',
        'ष': 'sh', 'स': 's', 'ह': 'h',
        'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
        'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', '्': '', 'ं': 'n', 'ः': 'h'
      };
      return romanMap[char] || char;
    })
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  setFormData(prev => ({ ...prev, slug }));
}
  }

  function addMedia(type, url, caption = '') {
    setMedia(prev => [...prev, { media_type: type, media_url: url, caption }]);
  }

  function removeMedia(index) {
    setMedia(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, content, media })
      });

      if (res.ok) {
        alert('ब्लॉग सफलतापूर्वक जोड़ा गया!');
        router.push('/admin/blogs');
      } else {
        alert('ब्लॉग जोड़ने में समस्या आई');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('ब्लॉग जोड़ने में समस्या आई');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">नया ब्लॉग बनाएं</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 max-w-4xl">
        <div className="space-y-6">
          
          <div>
            <label className="block text-gray-800 font-semibold mb-2">शीर्षक *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              placeholder="ब्लॉग का शीर्षक"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">Slug (URL) *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              placeholder="blog-url-slug"
            />
            <p className="text-xs text-gray-500 mt-1">स्वतः रोमन में बनेगा, चाहें तो बदल सकते हैं</p>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">मुख्य इमेज</label>
            <CldUploadWidget
              uploadPreset="agoraprakashan"
              onSuccess={(result) => {
                setFormData(prev => ({ ...prev, featured_image: result.info.secure_url }));
              }}
            >
              {({ open }) => (
                <div>
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full px-4 py-3 text-white bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold"
                  >
                    📤 इमेज अपलोड करें
                  </button>
                  {formData.featured_image && (
                    <div className="mt-4">
                      <img 
                        src={formData.featured_image} 
                        alt="Featured" 
                        className="h-40 w-auto object-cover rounded-lg border-2 border-gray-300"
                      />
                    </div>
                  )}
                </div>
              )}
            </CldUploadWidget>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">विवरण *</label>
            <BlockNoteEditor onChange={setContent} />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">अतिरिक्त फोटो/वीडियो</label>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <CldUploadWidget
                uploadPreset="agoraprakashan"
                onSuccess={(result) => {
                  addMedia('image', result.info.secure_url);
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
                  >
                    📷 फोटो जोड़ें
                  </button>
                )}
              </CldUploadWidget>

              <button
                type="button"
                onClick={() => {
                  const url = prompt('YouTube/Vimeo URL डालें:');
                  if (url) addMedia('video', url);
                }}
                className="px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
              >
                🎥 वीडियो जोड़ें
              </button>
            </div>

            {media.length > 0 && (
              <div className="space-y-3 mt-4">
                {media.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    {item.media_type === 'image' ? (
                      <img src={item.media_url} alt="" className="h-16 w-16 object-cover rounded" />
                    ) : (
                      <div className="h-16 w-16 bg-red-100 rounded flex items-center justify-center text-2xl">
                        🎥
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 font-semibold">
                        {item.media_type === 'image' ? 'फोटो' : 'वीडियो'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{item.media_url}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      हटाएं
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">स्थिति</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="draft">ड्राफ्ट</option>
              <option value="published">प्रकाशित</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold"
          >
            {loading ? 'जोड़ा जा रहा है...' : 'ब्लॉग जोड़ें'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            रद्द करें
          </button>
        </div>
      </form>
    </div>
  );
}