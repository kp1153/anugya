import Link from 'next/link';
import { turso } from '@/lib/db';

async function getOrder(orderId) {
  try {
    const result = await turso.execute({
      sql: 'SELECT * FROM orders WHERE id = ?',
      args: [orderId]
    });
    
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export default async function OrderSuccessPage({ params }) {
  const resolvedParams = await params;
  const order = await getOrder(resolvedParams.slug);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">ऑर्डर नहीं मिला</h1>
        <Link href="/" className="text-teal-600 hover:underline">
          होम पर वापस जाएं
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            ऑर्डर सफलतापूर्वक प्लेस हो गया!
          </h1>
          <p className="text-gray-600">
            ऑर्डर नंबर: <span className="font-semibold">#{order.id}</span>
          </p>
        </div>

        <div className="border-t border-b py-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">ग्राहक की जानकारी</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>नाम:</strong> {order.user_name}</p>
            <p><strong>ईमेल:</strong> {order.user_email}</p>
            <p><strong>फोन:</strong> {order.user_phone}</p>
          </div>
        </div>

        <div className="bg-teal-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between text-xl font-bold">
            <span>कुल राशि:</span>
            <span className="text-teal-600">₹{order.total_amount}</span>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            हम जल्द ही आपसे संपर्क करेंगे। धन्यवाद!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
              होम पर जाएं
            </Link>
            <Link href="/books" className="border border-teal-600 text-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50">
              खरीदारी जारी रखें
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}