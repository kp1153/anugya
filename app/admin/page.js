'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const booksRes = await fetch('/api/books');
      const books = await booksRes.json();

      // Orders API nahi hai abhi, temporary empty array
      const orders = [];

      const pendingOrders = orders.filter(o => o.status === 'pending').length;
      const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);

      setStats({
        totalBooks: books.length,
        totalOrders: orders.length,
        pendingOrders: pendingOrders,
        totalRevenue: totalRevenue
      });

      setRecentBooks(books.slice(0, 5));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Books</p>
              <p className="text-3xl font-bold text-teal-600">{stats.totalBooks}</p>
            </div>
            <div className="text-4xl">📚</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
            </div>
            <div className="text-4xl">🛒</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Orders</p>
              <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">₹{stats.totalRevenue}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/books/new"
            className="flex items-center gap-3 p-4 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
          >
            <span className="text-2xl">➕</span>
            <span className="font-semibold text-teal-600">Add New Book</span>
          </Link>

          <Link
            href="/admin/books"
            className="flex items-center gap-3 p-4 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <span className="text-2xl">📚</span>
            <span className="font-semibold text-blue-600">View All Books</span>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-3 p-4 border-2 border-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <span className="text-2xl">🛒</span>
            <span className="font-semibold text-orange-600">View Orders</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Recent Books</h3>
          <Link href="/admin/books" className="text-teal-600 hover:text-teal-700 font-semibold">
            View All →
          </Link>
        </div>

        {recentBooks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No books yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold">Title</th>
                  <th className="text-left p-3 font-semibold">Author</th>
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {recentBooks.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{book.title}</td>
                    <td className="p-3 text-gray-600">{book.author}</td>
                    <td className="p-3 text-gray-600">{book.category}</td>
                    <td className="p-3 font-semibold text-teal-600">₹{book.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}