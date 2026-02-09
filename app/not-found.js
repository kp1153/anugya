import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-6">📚</div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">पेज नहीं मिला</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          क्षमा करें, आप जो पेज खोज रहे हैं वह मौजूद नहीं है या हटा दिया गया है।
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            होम पेज पर जाएं
          </Link>
          <Link 
            href="/books"
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            सभी पुस्तकें देखें
          </Link>
        </div>
      </div>
    </div>
  );
}