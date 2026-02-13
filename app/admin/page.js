'use client';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        🏛️ अनुग्या बुक्स डैशबोर्ड
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          href="/admin/books/new"
          className="block bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          <div className="text-4xl mb-4">➕</div>
          <h2 className="text-xl font-semibold">नई किताब जोड़ें</h2>
          <p className="text-sm mt-2 opacity-90">नई पुस्तक डेटाबेस में जोड़ें</p>
        </Link>
        
        <Link 
          href="/admin/books"
          className="block bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
        >
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-xl font-semibold">सभी किताबें</h2>
          <p className="text-sm mt-2 opacity-90">पुस्तकों को देखें और एडिट करें</p>
        </Link>
        
        <Link 
          href="/admin/orders"
          className="block bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          <div className="text-4xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold">ऑर्डर्स देखें</h2>
          <p className="text-sm mt-2 opacity-90">सभी ऑर्डर्स की जानकारी</p>
        </Link>
        
        <Link 
          href="/admin/categories"
          className="block bg-orange-600 text-white p-6 rounded-lg hover:bg-orange-700 transition-colors shadow-lg"
        >
          <div className="text-4xl mb-4">📁</div>
          <h2 className="text-xl font-semibold">कैटेगरी देखें</h2>
          <p className="text-sm mt-2 opacity-90">सभी श्रेणियाँ और उप-श्रेणियाँ</p>
        </Link>

        <Link 
          href="/admin/authors"
          className="block bg-teal-600 text-white p-6 rounded-lg hover:bg-teal-700 transition-colors shadow-lg"
        >
          <div className="text-4xl mb-4">✍️</div>
          <h2 className="text-xl font-semibold">लेखक</h2>
          <p className="text-sm mt-2 opacity-90">लेखकों को देखें और प्रबंधित करें</p>
        </Link>

        <Link 
          href="/admin/translators"
          className="block bg-indigo-600 text-white p-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          <div className="text-4xl mb-4">🌐</div>
          <h2 className="text-xl font-semibold">अनुवादक</h2>
          <p className="text-sm mt-2 opacity-90">अनुवादकों को देखें और प्रबंधित करें</p>
        </Link>
      </div>
    </div>
  );
}