'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">आपका कार्ट खाली है</h2>
          <Link href="/books" className="text-teal-600 hover:text-teal-700 font-semibold">
            किताबें देखें →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">शॉपिंग कार्ट</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex gap-6">
                  <Link href={`/books/${item.id}`}>
                    {item.cover_image ? (
                      <img src={item.cover_image} alt={item.title} className="w-24 h-32 object-cover rounded-lg hover:opacity-80 transition-opacity" />
                    ) : (
                      <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">📚</span>
                      </div>
                    )}
                  </Link>

                  <div className="flex-1">
                    <Link href={`/books/${item.id}`}>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-teal-600">{item.title}</h3>
                    </Link>
                    <p className="text-gray-600 mb-4">{item.author}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors">−</button>
                          <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">+</button>
                        </div>

                        <div>
                          <p className="text-2xl font-bold text-teal-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">₹{item.price} प्रति किताब</p>
                        </div>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">हटाएं</button>
                    </div>

                    {item.quantity >= item.stock && (
                      <p className="text-sm text-orange-600 mt-2">⚠️ अधिकतम स्टॉक में है</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button onClick={() => { if (confirm('क्या आप पूरा कार्ट खाली करना चाहते हैं?')) { clearCart(); } }} className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">कार्ट खाली करें</button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">ऑर्डर सारांश</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>कुल आइटम</span>
                  <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>सबटोटल</span>
                  <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>डिलीवरी चार्ज</span>
                  <span className="font-semibold text-green-600">मुफ्त</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">कुल राशि</span>
                    <span className="text-2xl font-bold text-teal-600">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => router.push('/checkout')} className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors mb-4">चेकआउट करें</button>

              <Link href="/books" className="block text-center text-teal-600 hover:text-teal-700 font-semibold">← खरीदारी जारी रखें</Link>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-2xl">✓</span>
                  <span>100% सुरक्षित पेमेंट</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-2xl">📦</span>
                  <span>मुफ्त होम डिलीवरी</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-2xl">↩️</span>
                  <span>आसान रिटर्न पॉलिसी</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}