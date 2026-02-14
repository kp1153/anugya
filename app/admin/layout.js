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
        { 
          name: 'आदिवासी साहित्य',
          children: [
            { name: 'कहानी', path: '/admin/categories/vidha/aadivasi/kahani' },
            { name: 'उपन्यास', path: '/admin/categories/vidha/aadivasi/upanyas' },
            { name: 'कविता', path: '/admin/categories/vidha/aadivasi/poetry' },
            { name: 'विचार', path: '/admin/categories/vidha/aadivasi/vichar' },
          ]
        },
        { 
          name: 'अनुवाद',
          children: [
            { name: 'विदेशी-कहानी', path: '/admin/categories/vidha/anuvaad/videshi/kahani' },
            { name: 'विदेशी-उपन्यास', path: '/admin/categories/vidha/anuvaad/videshi/upanyas' },
            { name: 'विदेशी-कविता', path: '/admin/categories/vidha/anuvaad/videshi/poetry' },
            { name: 'भारतीय-कहानी', path: '/admin/categories/vidha/anuvaad/bhartiya/kahani' },
            { name: 'भारतीय-उपन्यास', path: '/admin/categories/vidha/anuvaad/bhartiya/upanyas' },
            { name: 'भारतीय-कविता', path: '/admin/categories/vidha/anuvaad/bhartiya/poetry' },
          ]
        },
        { 
          name: 'अकादमिक',
          children: [
            { name: 'सिनेमा', path: '/admin/categories/vidha/akadmik/cinema' },
            { name: 'पत्रकारिता', path: '/admin/categories/vidha/akadmik/journalism' },
            { name: 'इतिहास', path: '/admin/categories/vidha/akadmik/history' },
            { name: 'राजनीति', path: '/admin/categories/vidha/akadmik/politics' },
            { name: 'गांधी', path: '/admin/categories/vidha/akadmik/gandhi' },
            { name: 'अर्थशास्त्र', path: '/admin/categories/vidha/akadmik/economics' },
            { name: 'प्रबंधन', path: '/admin/categories/vidha/akadmik/management' },
            { name: 'शिक्षा', path: '/admin/categories/vidha/akadmik/education' },
            { name: 'सामान्य ज्ञान', path: '/admin/categories/vidha/akadmik/gk' },
            { name: 'भाषाविज्ञान', path: '/admin/categories/vidha/akadmik/linguistics' },
            { name: 'शब्दकोश', path: '/admin/categories/vidha/akadmik/dictionary' },
            { name: 'चिकित्सा विज्ञान', path: '/admin/categories/vidha/akadmik/medical' },
            { name: 'दर्शनशास्त्र', path: '/admin/categories/vidha/akadmik/philosophy' },
            { name: 'समाजशास्त्र', path: '/admin/categories/vidha/akadmik/sociology' },
          ]
        },
        { 
          name: 'विमर्श',
          children: [
            { name: 'आलोचना', path: '/admin/categories/vidha/vimarsh/alochana' },
            { name: 'दलित विमर्श', path: '/admin/categories/vidha/vimarsh/dalit' },
            { name: 'दिव्यांग', path: '/admin/categories/vidha/vimarsh/divyang' },
            { name: 'पर्यावरण', path: '/admin/categories/vidha/vimarsh/environment' },
            { name: 'सांप्रदायिकता', path: '/admin/categories/vidha/vimarsh/communalism' },
            { name: 'स्त्री विमर्श', path: '/admin/categories/vidha/vimarsh/stri' },
          ]
        },
        { 
          name: 'विविध',
          children: [
            { name: 'संचयन', path: '/admin/categories/vidha/vividh/sanchayan' },
            { name: 'निबंध', path: '/admin/categories/vidha/vividh/nibandh' },
            { name: 'आत्मकथा', path: '/admin/categories/vidha/vividh/aatmkatha' },
            { name: 'संस्मरण', path: '/admin/categories/vidha/vividh/sansmaran' },
            { name: 'जीवनी', path: '/admin/categories/vidha/vividh/jivani' },
            { name: 'डायरी', path: '/admin/categories/vidha/vividh/diary' },
            { name: 'पत्र', path: '/admin/categories/vidha/vividh/letter' },
            { name: 'साक्षात्कार', path: '/admin/categories/vidha/vividh/interview' },
            { name: 'ग्रामीण', path: '/admin/categories/vidha/vividh/gramin' },
            { name: 'पुलिसिंग', path: '/admin/categories/vidha/vividh/policing' },
            { name: 'व्यंग्य', path: '/admin/categories/vidha/vividh/vyangya' },
            { name: 'समग्र', path: '/admin/categories/vidha/vividh/samagra' },
            { name: 'कला एवं संस्कृति', path: '/admin/categories/vidha/vividh/art-culture' },
            { name: 'संगीत', path: '/admin/categories/vidha/vividh/music' },
            { name: 'धार्मिक', path: '/admin/categories/vidha/vividh/religious' },
            { name: 'रंगमंच', path: '/admin/categories/vidha/vividh/theatre' },
            { name: 'राष्ट्रवाद', path: '/admin/categories/vidha/vividh/nationalism' },
            { name: 'किशोर साहित्य', path: '/admin/categories/vidha/vividh/kishore' },
            { name: 'ईसाई धर्म', path: '/admin/categories/vidha/vividh/christianity' },
          ]
        },
        { 
          name: 'भाषा/प्रादेशिक',
          children: [
            { name: 'अंग्रेजी', path: '/admin/categories/vidha/bhasha/english' },
            { name: 'उर्दू', path: '/admin/categories/vidha/bhasha/urdu' },
            { name: 'भोजपुरी', path: '/admin/categories/vidha/bhasha/bhojpuri' },
            { name: 'बुंदेली', path: '/admin/categories/vidha/bhasha/bundeli' },
            { name: 'हरियाणवी', path: '/admin/categories/vidha/bhasha/haryanvi' },
            { name: 'राजस्थानी', path: '/admin/categories/vidha/bhasha/rajasthani' },
            { name: 'नॉर्थ-ईस्ट', path: '/admin/categories/vidha/bhasha/north-east' },
            { name: 'झारखंड', path: '/admin/categories/vidha/bhasha/jharkhand' },
            { name: 'हिमाचली', path: '/admin/categories/vidha/bhasha/himachali' },
            { name: 'बघेली', path: '/admin/categories/vidha/bhasha/bagheli' },
            { name: 'छत्तीसगढ़ी', path: '/admin/categories/vidha/bhasha/chhattisgarhi' },
            { name: 'प्रवासी साहित्य', path: '/admin/categories/vidha/bhasha/pravasi' },
            { name: 'संस्कृत', path: '/admin/categories/vidha/bhasha/sanskrit' },
            { name: 'अंडमानी', path: '/admin/categories/vidha/bhasha/andamani' },
          ]
        },
        { 
          name: 'Fiction',
          children: [
            { name: 'कहानी', path: '/admin/categories/vidha/fiction/kahani' },
            { name: 'उपन्यास', path: '/admin/categories/vidha/fiction/upanyas' },
            { name: 'कविता', path: '/admin/categories/vidha/fiction/poetry' },
            { name: 'लघुकथा', path: '/admin/categories/vidha/fiction/laghukatha' },
            { name: 'शायरी', path: '/admin/categories/vidha/fiction/shayri' },
            { name: 'काव्यशास्त्र', path: '/admin/categories/vidha/fiction/poetics' },
          ]
        },
        { 
          name: 'क्लासिक्स',
          children: [
            { name: 'हिंदी', path: '/admin/categories/vidha/classics/hindi' },
            { name: 'अंग्रेजी', path: '/admin/categories/vidha/classics/english' },
            { name: 'उर्दू', path: '/admin/categories/vidha/classics/urdu' },
          ]
        },
        { 
          name: 'जिल्द',
          children: [
            { name: 'हार्ड बाउंड - 2026', path: '/admin/categories/vidha/jild/hardbound-2026' },
            { name: 'हार्ड बाउंड - 2025', path: '/admin/categories/vidha/jild/hardbound-2025' },
            { name: 'पेपर बाउंड', path: '/admin/categories/vidha/jild/paperbound' },
            { name: 'पिन बाउंड', path: '/admin/categories/vidha/jild/pinbound' },
            { name: 'कॉम्बो पैक', path: '/admin/categories/vidha/jild/combo' },
          ]
        },
      ]
    },
    { name: 'ऑर्डर्स', path: '/admin/orders', icon: '🛒' },
    { name: 'लेखक', path: '/admin/authors', icon: '✍️' },
    { name: 'अनुवादक', path: '/admin/translators', icon: '🌐' },
  ];

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const [expandedGrandparent, setExpandedGrandparent] = useState(null);

  const toggleGrandparent = (parentIndex, grandparentIndex) => {
    const key = `${parentIndex}-${grandparentIndex}`;
    setExpandedGrandparent(expandedGrandparent === key ? null : key);
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
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <div key={subIndex}>
                          {!subItem.children ? (
                            <Link
                              href={subItem.path}
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                pathname === subItem.path
                                  ? 'bg-[#654321] text-white'
                                  : 'hover:bg-[#654321] text-gray-200'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ) : (
                            <div>
                              <button
                                onClick={() => toggleGrandparent(index, subIndex)}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                                  expandedGrandparent === `${index}-${subIndex}` 
                                    ? 'bg-[#654321] text-white' 
                                    : 'hover:bg-[#654321] text-gray-200'
                                }`}
                              >
                                <span className="font-medium">{subItem.name}</span>
                                <span className="text-xs">
                                  {expandedGrandparent === `${index}-${subIndex}` ? '▲' : '▼'}
                                </span>
                              </button>
                              
                              {expandedGrandparent === `${index}-${subIndex}` && (
                                <div className="ml-4 mt-1 space-y-1">
                                  {subItem.children.map((grandchild, grandIndex) => (
                                    <Link
                                      key={grandIndex}
                                      href={grandchild.path}
                                      className={`block px-3 py-1.5 text-xs rounded-lg transition-colors ${
                                        pathname === grandchild.path
                                          ? 'bg-[#8B4513] text-white'
                                          : 'hover:bg-[#8B4513] text-gray-300'
                                      }`}
                                    >
                                      {grandchild.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
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