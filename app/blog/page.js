'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      const published = data.filter(blog => blog.status === 'published');
      setBlogs(published);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-700">लोड हो रहा है...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">ब्लॉग</h1>
          <p className="text-xl text-gray-600">आयोजन, समाचार और विचार</p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-20">
            कोई ब्लॉग नहीं मिला
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                {blog.featured_image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(blog.created_at).toLocaleDateString('hi-IN')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}