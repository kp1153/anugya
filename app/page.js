'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import ViewsCounter from '@/components/ViewsCounter';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [books, setBooks] = useState([]);
  const { addToCart } = useCart();
  const [selectedBook, setSelectedBook] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const sliderImages = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.JPG',
    '/images/6.jpg',
    '/images/7.JPG',
    '/images/8.JPG',
    '/images/9.JPG',
    '/images/10.JPG',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  async function fetchAllBooks() {
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  const featuredBooks = books.filter(b => b.featured === 1 || b.featured === true).slice(0, 5);
  const popularBooks = books.filter(b => b.popular === 1 || b.popular === true).slice(0, 5);

      return (
  <div className="w-full">
    
    {showToast && (
      <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-bounce">
        <span className="text-2xl">✓</span>
        <span className="font-semibold text-lg">कार्ट में जोड़ा गया!</span>
      </div>
    )}

   
      
      {selectedBook && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBook(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">पुस्तक विवरण</h2>
              <button onClick={() => setSelectedBook(null)} className="text-3xl text-gray-600 hover:text-gray-900">&times;</button>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img src={selectedBook.cover_image} alt={selectedBook.title} className="w-full rounded-lg shadow-lg" />
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{selectedBook.title}</h1>
                  <p className="text-xl text-gray-600 mb-4">लेखक: {selectedBook.author}</p>
                  
                  {selectedBook.category && (
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-[#f5f5dc] text-[#8B4513] rounded-full font-semibold">{selectedBook.category}</span>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#8B4513]">₹{selectedBook.price}</span>
                    <span className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold ${selectedBook.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {selectedBook.stock > 0 ? `स्टॉक में (${selectedBook.stock})` : 'स्टॉक में नहीं'}
                    </span>
                  </div>

                  {selectedBook.isbn && (
                    <p className="text-gray-600 mb-2"><span className="font-semibold">ISBN:</span> {selectedBook.isbn}</p>
                  )}
                  
                  {selectedBook.pages && (
                    <p className="text-gray-600 mb-4"><span className="font-semibold">पृष्ठ संख्या:</span> {selectedBook.pages}</p>
                  )}
                  <button
  onClick={() => {
    addToCart(selectedBook);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }}
  disabled={selectedBook.stock === 0}
  className="w-full bg-[#8B4513] hover:bg-[#654321] disabled:bg-gray-400 text-white py-3 rounded-lg text-lg font-semibold mb-6"
>
  🛒 कार्ट में डालें
</button>
                  
                  {selectedBook.description && (
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">विवरण</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedBook.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full h-[65vh] md:h-[75vh] bg-white overflow-hidden flex">
        
        <div className="hidden md:flex md:flex-col w-[18%] bg-[#8B4513] p-4 overflow-y-auto">
          <h3 className="text-white text-base font-bold mb-4 text-center border-b-2 border-white/30 pb-2">फ़ीचर्ड</h3>
          <div className="space-y-4">
            {featuredBooks.length > 0 ? (
              featuredBooks.map((book) => (
                <div key={book.id} onClick={() => setSelectedBook(book)} className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 shadow-lg">
                  <img src={book.cover_image} alt={book.title} className="w-full aspect-[3/4] object-cover" />
                  <div className="p-2 bg-white">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">{book.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/70 text-sm text-center mt-8">कोई फ़ीचर्ड किताब नहीं</p>
            )}
          </div>
        </div>

        <div className="relative w-full md:w-[64%] h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center p-6">
                <img 
                  src={img} 
                  alt={`Slide ${index + 1}`} 
                  className="max-w-[90%] max-h-[90%] object-contain drop-shadow-2xl rounded-lg"
                />
              </div>
            </div>
          ))}

          <button onClick={prevSlide} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 md:p-4 rounded-full text-2xl md:text-3xl transition-all shadow-xl hover:shadow-2xl z-10 hover:scale-110">←</button>
          <button onClick={nextSlide} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 md:p-4 rounded-full text-2xl md:text-3xl transition-all shadow-xl hover:shadow-2xl z-10 hover:scale-110">→</button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all ${index === currentSlide ? 'bg-[#8B4513] w-10' : 'bg-gray-400 w-2.5 hover:bg-gray-600'}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:flex md:flex-col w-[18%] bg-[#8B4513] p-4 overflow-y-auto">
          <h3 className="text-white text-base font-bold mb-4 text-center border-b-2 border-white/30 pb-2">लोकप्रिय</h3>
          <div className="space-y-4">
            {popularBooks.length > 0 ? (
              popularBooks.map((book) => (
                <div key={book.id} onClick={() => setSelectedBook(book)} className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 shadow-lg">
                  <img src={book.cover_image} alt={book.title} className="w-full aspect-[3/4] object-cover" />
                  <div className="p-2 bg-white">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">{book.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/70 text-sm text-center mt-8">कोई लोकप्रिय किताब नहीं</p>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-[50vh] bg-gray-50 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">सभी पुस्तकें</h2>
          <div className="mb-6 flex justify-center">
  <ViewsCounter slug="homepage" initialViews={0} />
</div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {books.map((book) => (
              <div key={book.id} onClick={() => setSelectedBook(book)} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="aspect-[3/4] bg-gray-200">
                  <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-1">{book.author}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-[#8B4513]">₹{book.price}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${book.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {book.stock > 0 ? '✓' : '✗'}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
  e.stopPropagation();
  addToCart(book);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 3000);
}}
                    disabled={book.stock === 0} 
                    className="w-full bg-[#8B4513] hover:bg-[#654321] disabled:bg-gray-400 text-white py-1.5 rounded text-sm font-semibold"
                  >
                    🛒 कार्ट
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}