'use client';

import { useState, useEffect } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(id, newStatus) {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders();
    } catch (error) {
      alert('स्टेटस अपडेट करने में समस्या आई');
    }
  }

  async function deleteOrder(id) {
    if (!confirm('क्या आप इस ऑर्डर को डिलीट करना चाहते हैं?')) return;
    
    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      fetchOrders();
    } catch (error) {
      alert('डिलीट करने में समस्या आई');
    }
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  if (loading) {
    return <div className="text-center py-12">लोड हो रहा है...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">ऑर्डर्स</h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'all' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            सभी ({orders.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'pending' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            पेंडिंग ({orders.filter(o => o.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'completed' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            पूर्ण ({orders.filter(o => o.status === 'completed').length})
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">कोई ऑर्डर नहीं है</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">ID</th>
                <th className="text-left p-4 font-semibold">ग्राहक का नाम</th>
                <th className="text-left p-4 font-semibold">ईमेल</th>
                <th className="text-left p-4 font-semibold">फोन</th>
                <th className="text-left p-4 font-semibold">राशि</th>
                <th className="text-left p-4 font-semibold">स्टेटस</th>
                <th className="text-left p-4 font-semibold">तारीख</th>
                <th className="text-left p-4 font-semibold">एक्शन</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">#{order.id}</td>
                  <td className="p-4">{order.user_name}</td>
                  <td className="p-4 text-gray-600">{order.user_email}</td>
                  <td className="p-4 text-gray-600">{order.user_phone}</td>
                  <td className="p-4 font-semibold text-green-600">₹{order.total_amount}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'pending' 
                          ? 'bg-orange-100 text-orange-700'
                          : order.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      <option value="pending">पेंडिंग</option>
                      <option value="completed">पूर्ण</option>
                      <option value="cancelled">रद्द</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(order.created_at).toLocaleDateString('hi-IN')}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      डिलीट
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}