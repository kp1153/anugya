'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        🏛️ अनुग्या बुक्स एडमिन
      </h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
        <Link 
          href="/admin/books/new"
          className="block bg-blue-600 text-white text-center px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          ➕ नई किताब जोड़ें
        </Link>
        
        <Link 
          href="/admin/orders"
          className="block bg-green-600 text-white text-center px-6 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
        >
          🛒 ऑर्डर्स देखें
        </Link>
        
        <Link 
          href="/admin/categories"
          className="block bg-purple-600 text-white text-center px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors text-lg font-semibold"
        >
          📁 कैटेगरी देखें
        </Link>
      </div>
    </div>
  );
}