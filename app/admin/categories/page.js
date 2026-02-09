'use client';

import { useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    'साहित्य',
    'कविता',
    'उपन्यास',
    'कहानी संग्रह',
    'निबंध',
    'आत्मकथा'
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  function addCategory() {
    if (!newCategory.trim()) {
      alert('कैटेगरी का नाम लिखें');
      return;
    }
    if (categories.includes(newCategory.trim())) {
      alert('यह कैटेगरी पहले से मौजूद है');
      return;
    }
    setCategories([...categories, newCategory.trim()]);
    setNewCategory('');
  }

  function deleteCategory(index) {
    if (!confirm('क्या आप इस कैटेगरी को डिलीट करना चाहते हैं?')) return;
    setCategories(categories.filter((_, i) => i !== index));
  }

  function startEdit(index) {
    setEditIndex(index);
    setEditValue(categories[index]);
  }

  function saveEdit() {
    if (!editValue.trim()) {
      alert('कैटेगरी का नाम लिखें');
      return;
    }
    const updated = [...categories];
    updated[editIndex] = editValue.trim();
    setCategories(updated);
    setEditIndex(null);
    setEditValue('');
  }

  function cancelEdit() {
    setEditIndex(null);
    setEditValue('');
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">कैटेगरी प्रबंधन</h2>

      {/* नई कैटेगरी जोड़ें */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">नई कैटेगरी जोड़ें</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            placeholder="कैटेगरी का नाम लिखें..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={addCategory}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            जोड़ें
          </button>
        </div>
      </div>

      {/* कैटेगरी लिस्ट */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">सभी कैटेगरी ({categories.length})</h3>
        
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center py-8">कोई कैटेगरी नहीं है</p>
        ) : (
          <div className="space-y-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                {editIndex === index ? (
                  <div className="flex-1 flex gap-3">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      सेव
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      रद्द
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📁</span>
                      <span className="text-lg font-semibold text-gray-800">{category}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(index)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        एडिट
                      </button>
                      <button
                        onClick={() => deleteCategory(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        डिलीट
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>नोट:</strong> कैटेगरी डिलीट करने से पहले सुनिश्चित करें कि कोई किताब उस कैटेगरी में नहीं है।
        </p>
      </div>
    </div>
  );
}