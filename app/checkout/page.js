'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice * 100,
          currency: 'INR',
          customerDetails: formData,
          items: cart
        })
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Agora Prakashan',
        description: 'Book Purchase',
        order_id: data.id,
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true
        },
        handler: async function (response) {
          const verifyRes = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerDetails: formData,
              items: cart
            })
          });

          const result = await verifyRes.json();

          if (result.success) {
            clearCart();
            router.push(`/order-success/${result.orderId}`);
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#0d9488'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.title} x {item.quantity}</span>
                    <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-teal-600">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button onClick={handlePayment} disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}