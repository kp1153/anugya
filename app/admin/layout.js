'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuItems = [
    { name: 'डैशबोर्ड', path: '/admin', icon: '📊' },
    { name: 'नई किताब', path: '/admin/books/new', icon: '➕' },
    { name: 'सभी किताबें', path: '/admin/books', icon: '📚' },
    { 
      name: 'विधा', 
      icon: '📖',
      submenu: [
        { name: 'कहानी', path: '/admin/categories/vidha/kahani' },
        { name: 'उपन्यास', path: '/admin/categories/vidha/upanyas' },
        { name: 'कविता', path: '/admin/categories/vidha/poetry' },
        { name: 'लघुकथा', path: '/admin/categories/vidha/laghukatha' },
        { name: 'शायरी', path: '/admin/categories/vidha/shayri' },
        { name: 'काव्यशास्त्र', path: '/admin/categories/vidha/poetics' },
      ]
    },
    { 
      name: 'आदिवासी', 
      icon: '🏞️',
      submenu: [
        { name: 'कहानी', path: '/admin/categories/aadivasi/kahani' },
        { name: 'उपन्यास', path: '/admin/categories/aadivasi/upanyas' },
        { name: 'कविता', path: '/admin/categories/aadivasi/poetry' },
        { name: 'विचार', path: '/admin/categories/aadivasi/vichar' },
      ]
    },
    { 
      name: 'अनुवाद', 
      icon: '🌍',
      submenu: [
        { name: 'विदेशी-कहानी', path: '/admin/categories/anuvaad/videshi/kahani' },
        { name: 'विदेशी-उपन्यास', path: '/admin/categories/anuvaad/videshi/upanyas' },
        { name: 'विदेशी-कविता', path: '/admin/categories/anuvaad/videshi/poetry' },
        { name: 'भारतीय-कहानी', path: '/admin/categories/anuvaad/bhartiya/kahani' },
        { name: 'भारतीय-उपन्यास', path: '/admin/categories/anuvaad/bhartiya/upanyas' },
        { name: 'भारतीय-कविता', path: '/admin/categories/anuvaad/bhartiya/poetry' },
      ]
    },
    { 
      name: 'अकादमिक', 
      icon: '🎓',
      submenu: [
        { name: 'सिनेमा', path: '/admin/categories/akadmik/cinema' },
        { name: 'पत्रकारिता', path: '/admin/categories/akadmik/journalism' },
        { name: 'इतिहास', path: '/admin/categories/akadmik/history' },
        { name: 'राजनीति', path: '/admin/categories/akadmik/politics' },
        { name: 'गांधी', path: '/admin/categories/akadmik/gandhi' },
        { name: 'अर्थशास्त्र', path: '/admin/categories/akadmik/economics' },
        { name: 'प्रबंधन', path: '/admin/categories/akadmik/management' },
        { name: 'शिक्षा', path: '/admin/categories/akadmik/education' },
        { name: 'सामान्य ज्ञान', path: '/admin/categories/akadmik/gk' },
        { name: 'भाषाविज्ञान', path: '/admin/categories/akadmik/linguistics' },
        { name: 'शब्दकोश', path: '/admin/categories/akadmik/dictionary' },
        { name: 'चिकित्सा', path: '/admin/categories/akadmik/medical' },
        { name: 'दर्शन', path: '/admin/categories/akadmik/philosophy' },
        { name: 'समाजशास्त्र', path: '/admin/categories/akadmik/sociology' },
      ]
    },
    { 
      name: 'विमर्श', 
      icon: '💭',
      submenu: [
        { name: 'आलोचना', path: '/admin/categories/vimarsh/alochana' },
        { name: 'दलित', path: '/admin/categories/vimarsh/dalit' },
        { name: 'दिव्यांग', path: '/admin/categories/vimarsh/divyang' },
        { name: 'पर्यावरण', path: '/admin/categories/vimarsh/environment' },
        { name: 'सांप्रदायिकता', path: '/admin/categories/vimarsh/communalism' },
        { name: 'स्त्री', path: '/admin/categories/vimarsh/stri' },
      ]
    },
    { 
      name: 'विविध', 
      icon: '🎨',
      submenu: [
        { name: 'संचयन', path: '/admin/categories/vividh/sanchayan' },
        { name: 'निबंध', path: '/admin/categories/vividh/nibandh' },
        { name: 'आत्मकथा', path: '/admin/categories/vividh/aatmkatha' },
        { name: 'संस्मरण', path: '/admin/categories/vividh/sansmaran' },
        { name: 'जीवनी', path: '/admin/categories/vividh/jivani' },
        { name: 'डायरी', path: '/admin/categories/vividh/diary' },
        { name: 'पत्र', path: '/admin/categories/vividh/letter' },
        { name: 'साक्षात्कार', path: '/admin/categories/vividh/interview' },
      ]
    },
    { 
      name: 'भाषा', 
      icon: '🗣️',
      submenu: [
        { name: 'अंग्रेजी', path: '/admin/categories/bhasha/english' },
        { name: 'उर्दू', path: '/admin/categories/bhasha/urdu' },
        { name: 'भोजपुरी', path: '/admin/categories/bhasha/bhojpuri' },
        { name: 'बुंदेली', path: '/admin/categories/bhasha/bundeli' },
        { name: 'राजस्थानी', path: '/admin/categories/bhasha/rajasthani' },
        { name: 'संस्कृत', path: '/admin/categories/bhasha/sanskrit' },
      ]
    },
    { 
      name: 'क्लासिक्स', 
      icon: '📜',
      submenu: [
        { name: 'हिंदी', path: '/admin/categories/classics/hindi' },
        { name: 'अंग्रेजी', path: '/admin/categories/classics/english' },
        { name: 'उर्दू', path: '/admin/categories/classics/urdu' },
      ]
    },
    { 
      name: 'जिल्द', 
      icon: '📕',
      submenu: [
        { name: 'हार्ड 2026', path: '/admin/categories/jild/hardbound-2026' },
        { name: 'हार्ड 2025', path: '/admin/categories/jild/hardbound-2025' },
        { name: 'पेपर', path: '/admin/categories/jild/paperbound' },
        { name: 'पिन', path: '/admin/categories/jild/pinbound' },
        { name: 'कॉम्बो', path: '/admin/categories/jild/combo' },
      ]
    },
    { name: 'ऑर्डर्स', path: '/admin/orders', icon: '🛒' },
    { name: 'लेखक', path: '/admin/authors', icon: '✍️' },
    { name: 'अनुवादक', path: '/admin/translators', icon: '🌐' },
  ];

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`bg-[#8B4513] text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 fixed h-screen overflow-y-auto`}>
      <nav className="p-4 space-y-2 pb-40">
          {menuItems.map((item, index) => (
            <div key={index}>
              {!item.submenu ? (
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    pathname === item.path 
                      ? 'bg-[#A0522D] shadow-lg' 
                      : 'hover:bg-[#654321]'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span className="font-medium">{item.name}</span>}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg transition-colors ${
                      openSubmenu === index ? 'bg-[#A0522D]' : 'hover:bg-[#654321]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      {sidebarOpen && <span className="font-medium">{item.name}</span>}
                    </div>
                    {sidebarOpen && (
                      <span className="text-xs">{openSubmenu === index ? '▲' : '▼'}</span>
                    )}
                  </button>
                  
                  {sidebarOpen && openSubmenu === index && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.path}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            pathname === subItem.path
                              ? 'bg-[#654321] text-white'
                              : 'hover:bg-[#654321] text-gray-200'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
        
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-6 left-4 bg-[#654321] hover:bg-[#A0522D] p-2 rounded-lg transition-colors"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>
      
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#8B4513]">एडमिन पैनल</h1>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-[#8B4513] transition-colors">
                🏠 साइट देखें
              </Link>
              <span className="text-gray-700 font-medium">स्वागत है, एडमिन</span>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                लॉगआउट
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}