'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';

export default function BlogDetailPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  async function fetchBlog() {
    try {
      const res = await fetch(`/api/blogs/${resolvedParams.slug}`);
      const data = await res.json();
      
      if (data.error) {
        router.push('/blog');
        return;
      }
      
      setBlog(data);
    } catch (error) {
      console.error('Error:', error);
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  }

  function getEmbedUrl(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  }
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
}

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-700">लोड हो रहा है...</div>
      </div>
    );
  }

  if (!blog) return null;

  const images = blog.media?.filter(m => m.media_type === 'image') || [];
  const videos = blog.media?.filter(m => m.media_type === 'video') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-teal-600 hover:text-teal-800 font-semibold mb-6"
        >
          ← वापस जाएं
        </Link>

        {/* Blog Content */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          
         {blog.featured_image && (
  <div className="overflow-hidden">
    <img
      src={blog.featured_image}
      alt={blog.title}
      className="w-full h-auto"
    />
  </div>
)}

          <div className="p-8 md:p-12">
            
            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {blog.category && (
                <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">
                  {blog.category}
                </span>
              )}
              <span className="text-gray-500">
                {new Date(blog.created_at).toLocaleDateString('hi-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              {blog.author_name && (
                <span className="text-gray-500">लेखक: {blog.author_name}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-teal-500 pl-4">
                {blog.excerpt}
              </p>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: blog.content }}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75',
                color: '#374151'
              }}
            />

            {/* Additional Images */}
            {images.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">फोटो गैलरी</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {images.map((img, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={img.media_url}
                        alt={img.caption || `Photo ${index + 1}`}
                        className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => window.open(img.media_url, '_blank')}
                      />
                      {img.caption && (
                        <p className="p-3 bg-gray-50 text-gray-700 text-sm">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">वीडियो</h2>
                <div className="space-y-6">
                  {videos.map((video, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                      <div className="relative pb-[56.25%] h-0">
                        <iframe
                          src={getEmbedUrl(video.media_url)}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      {video.caption && (
                        <p className="p-3 bg-gray-50 text-gray-700 text-sm">
                          {video.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Share Buttons */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">शेयर करें</h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                const url = window.location.href;
                const text = blog.title;
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
              }}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all"
            >
              WhatsApp
            </button>
            <button
              onClick={() => {
                const url = window.location.href;
                const text = blog.title;
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
            >
              Facebook
            </button>
            <button
              onClick={() => {
                const url = window.location.href;
                const text = blog.title;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
              }}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition-all"
            >
              Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}