'use client';
import { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

export default function FilterSidebar({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const priceRanges = [
    { label: '₹99 से कम', min: 0, max: 99 },
    { label: '₹99 - ₹149', min: 99, max: 149 },
    { label: '₹149 - ₹249', min: 149, max: 249 },
    { label: '₹249 - ₹399', min: 249, max: 399 },
    { label: '₹399 - ₹499', min: 399, max: 499 },
    { label: '₹499 से अधिक', min: 499, max: 999999 },
  ];

  const years = Array.from({ length: 7 }, (_, i) => 2026 - i);

  const languages = [
    'हिंदी',
    'अंग्रेजी',
    'उर्दू',
    'भोजपुरी',
    'बुंदेली',
    'संस्कृत'
  ];

  const categories = [
    'विधा',
    'आदिवासी साहित्य',
    'अनुवाद',
    'अकादमिक',
    'विमर्श',
    'विविध',
    'भाषा/प्रादेशिक',
    'क्लासिक्स'
  ];

  const handlePriceChange = (range) => {
    onFilterChange({
      minPrice: range.min,
      maxPrice: range.max
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      subcategory: '',
      minPrice: '',
      maxPrice: '',
      year: '',
      language: ''
    });
  };

  const activeFiltersCount = [
    filters.category,
    filters.minPrice,
    filters.year,
    filters.language
  ].filter(Boolean).length;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-[#8B4513] text-white p-4 rounded-full shadow-lg flex items-center gap-2"
      >
        <FaFilter />
        {activeFiltersCount > 0 && (
          <span className="bg-red-600 text-xs px-2 py-1 rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-80 lg:w-full
          bg-white lg:bg-transparent
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}
      >
        <div className="lg:sticky lg:top-20">
          <div className="flex items-center justify-between p-4 lg:p-0 lg:mb-4 border-b lg:border-0">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaFilter className="text-[#8B4513]" />
              फ़िल्टर
            </h2>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:underline"
                >
                  साफ़ करें
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="p-4 lg:p-0 space-y-6">
            <div className="bg-white lg:bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">कीमत</h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handlePriceChange(range)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.minPrice == range.min && filters.maxPrice == range.max
                        ? 'bg-[#8B4513] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white lg:bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">प्रकाशन वर्ष</h3>
              <select
                value={filters.year}
                onChange={(e) => onFilterChange({ year: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              >
                <option value="">सभी</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white lg:bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">भाषा</h3>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onFilterChange({ language: lang })}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.language === lang
                        ? 'bg-[#8B4513] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white lg:bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">श्रेणी</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onFilterChange({ category: cat })}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.category === cat
                        ? 'bg-[#8B4513] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
