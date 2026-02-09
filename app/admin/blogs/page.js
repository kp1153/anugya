'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBlog(slug) {
    if (!confirm('क्या आप इस ब्लॉग को डिलीट करना चाहते हैं?')) return;

    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        alert('ब्लॉग डिलीट हो गया!');
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('ब्लॉग डिलीट नहीं हो सका');
    }
  }

  if (loading) return <div className="p-6 text-center">लोड हो रहा है...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">सभी ब्लॉग्स</h2>
        <button
          onClick={() => router.push('/admin/blogs/new')}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          + नया ब्लॉग
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">शीर्षक</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">स्थिति</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">तारीख</th>
              <th className="px-6 py-3 text-right text-gray-700 font-semibold">एक्शन</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{blog.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    blog.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {blog.status === 'published' ? 'प्रकाशित' : 'ड्राफ्ट'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {new Date(blog.created_at).toLocaleDateString('hi-IN')}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => router.push(`/admin/blogs/${blog.slug}/edit`)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    एडिट
                  </button>
                  <button
                    onClick={() => deleteBlog(blog.slug)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    डिलीट
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}