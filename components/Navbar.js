'use client';
import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [language, setLanguage] = useState('hi');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const buttonRefs = useRef({});

  const navItems = {
    hi: [
      { name: 'होम', href: '/' },
      { name: 'नई रिलीज', href: '/new-release' },
      { 
        name: 'विधा', 
        href: '/vidha',
        children: [
          { name: 'कहानी', href: '/vidha/kahani' },
          { name: 'उपन्यास', href: '/vidha/upanyas' },
          { name: 'कविता', href: '/vidha/poetry' },
          { name: 'लघुकथा', href: '/vidha/laghukatha' },
          { name: 'शायरी', href: '/vidha/shayri' },
          { name: 'काव्यशास्त्र', href: '/vidha/poetics' },
        ]
      },
      { name: 'लेखक', href: '/author' },
      { name: 'ब्लॉग', href: '/blog' },
      { 
        name: 'आदिवासी साहित्य', 
        href: '/aadivasi',
        children: [
          { name: 'कहानी', href: '/aadivasi/kahani' },
          { name: 'उपन्यास', href: '/aadivasi/upanyas' },
          { name: 'कविता', href: '/aadivasi/poetry' },
          { name: 'विचार', href: '/aadivasi/vichar' },
        ]
      },
      { 
        name: 'अनुवाद', 
        href: '/anuvaad',
        children: [
          { name: 'विदेशी - कहानी', href: '/anuvaad/videshi/kahani' },
          { name: 'विदेशी - उपन्यास', href: '/anuvaad/videshi/upanyas' },
          { name: 'विदेशी - कविता', href: '/anuvaad/videshi/poetry' },
          { name: 'भारतीय - कहानी', href: '/anuvaad/bhartiya/kahani' },
          { name: 'भारतीय - उपन्यास', href: '/anuvaad/bhartiya/upanyas' },
          { name: 'भारतीय - कविता', href: '/anuvaad/bhartiya/poetry' },
        ]
      },
      { 
        name: 'अकादमिक', 
        href: '/akadmik',
        children: [
          { name: 'सिनेमा', href: '/akadmik/cinema' },
          { name: 'पत्रकारिता', href: '/akadmik/journalism' },
          { name: 'इतिहास', href: '/akadmik/history' },
          { name: 'राजनीति', href: '/akadmik/politics' },
          { name: 'गांधी', href: '/akadmik/gandhi' },
          { name: 'अर्थशास्त्र', href: '/akadmik/economics' },
          { name: 'प्रबंधन', href: '/akadmik/management' },
          { name: 'शिक्षा', href: '/akadmik/education' },
          { name: 'सामान्य ज्ञान', href: '/akadmik/gk' },
          { name: 'भाषाविज्ञान', href: '/akadmik/linguistics' },
          { name: 'शब्दकोश', href: '/akadmik/dictionary' },
          { name: 'चिकित्सा विज्ञान', href: '/akadmik/medical' },
          { name: 'दर्शनशास्त्र', href: '/akadmik/philosophy' },
          { name: 'समाजशास्त्र', href: '/akadmik/sociology' },
        ]
      },
      { 
        name: 'विमर्श', 
        href: '/vimarsh',
        children: [
          { name: 'आलोचना', href: '/vimarsh/alochana' },
          { name: 'दलित विमर्श', href: '/vimarsh/dalit' },
          { name: 'दिव्यांग', href: '/vimarsh/divyang' },
          { name: 'पर्यावरण', href: '/vimarsh/environment' },
          { name: 'सांप्रदायिकता', href: '/vimarsh/communalism' },
          { name: 'स्त्री विमर्श', href: '/vimarsh/stri' },
        ]
      },
      { 
        name: 'विविध', 
        href: '/vividh',
        children: [
          { name: 'संचयन', href: '/vividh/sanchayan' },
          { name: 'निबंध', href: '/vividh/nibandh' },
          { name: 'आत्मकथा', href: '/vividh/aatmkatha' },
          { name: 'संस्मरण', href: '/vividh/sansmaran' },
          { name: 'जीवनी', href: '/vividh/jivani' },
          { name: 'डायरी', href: '/vividh/diary' },
          { name: 'पत्र', href: '/vividh/letter' },
          { name: 'साक्षात्कार', href: '/vividh/interview' },
          { name: 'ग्रामीण', href: '/vividh/gramin' },
          { name: 'पुलिसिंग', href: '/vividh/policing' },
          { name: 'व्यंग्य', href: '/vividh/vyangya' },
          { name: 'समग्र', href: '/vividh/samagra' },
          { name: 'कला एवं संस्कृति', href: '/vividh/art-culture' },
          { name: 'संगीत', href: '/vividh/music' },
          { name: 'धार्मिक', href: '/vividh/religious' },
          { name: 'रंगमंच', href: '/vividh/theatre' },
          { name: 'राष्ट्रवाद', href: '/vividh/nationalism' },
          { name: 'किशोर साहित्य', href: '/vividh/kishore' },
          { name: 'ईसाई धर्म', href: '/vividh/christianity' },
        ]
      },
      { 
        name: 'भाषा/प्रादेशिक', 
        href: '/bhasha',
        children: [
          { name: 'अंग्रेजी', href: '/bhasha/english' },
          { name: 'उर्दू', href: '/bhasha/urdu' },
          { name: 'भोजपुरी', href: '/bhasha/bhojpuri' },
          { name: 'बुंदेली', href: '/bhasha/bundeli' },
          { name: 'हरियाणवी', href: '/bhasha/haryanvi' },
          { name: 'राजस्थानी', href: '/bhasha/rajasthani' },
          { name: 'नॉर्थ-ईस्ट', href: '/bhasha/north-east' },
          { name: 'झारखंड', href: '/bhasha/jharkhand' },
          { name: 'हिमाचली', href: '/bhasha/himachali' },
          { name: 'बघेली', href: '/bhasha/bagheli' },
          { name: 'छत्तीसगढ़ी', href: '/bhasha/chhattisgarhi' },
          { name: 'प्रवासी साहित्य', href: '/bhasha/pravasi' },
          { name: 'संस्कृत', href: '/bhasha/sanskrit' },
          { name: 'अंडमानी', href: '/bhasha/andamani' },
        ]
      },
      { 
        name: 'क्लासिक्स', 
        href: '/classics',
        children: [
          { name: 'हिंदी', href: '/classics/hindi' },
          { name: 'अंग्रेजी', href: '/classics/english' },
          { name: 'उर्दू', href: '/classics/urdu' },
        ]
      },
      { 
        name: 'जिल्द', 
        href: '/jild',
        children: [
          { name: 'हार्ड बाउंड - 2026', href: '/jild/hardbound-2026' },
          { name: 'हार्ड बाउंड - 2025', href: '/jild/hardbound-2025' },
          { name: 'पेपर बाउंड', href: '/jild/paperbound' },
          { name: 'पिन बाउंड', href: '/jild/pinbound' },
          { name: 'कॉम्बो पैक', href: '/jild/combo' },
        ]
      },
      { name: 'ट्रैकिंग', href: '/tracking' },
      { name: 'कैटलॉग', href: '/catalogue' },
      { name: 'ई-बुक्स', href: '/ebooks' },
      { name: 'संपर्क', href: '/contact' },
    ],
    en: [
      { name: 'Home', href: '/' },
      { name: 'New Release', href: '/new-release' },
      { 
        name: 'Genre', 
        href: '/vidha',
        children: [
          { name: 'Story', href: '/vidha/kahani' },
          { name: 'Novel', href: '/vidha/upanyas' },
          { name: 'Poetry', href: '/vidha/poetry' },
          { name: 'Short Story', href: '/vidha/laghukatha' },
          { name: 'Shayari', href: '/vidha/shayri' },
          { name: 'Poetics', href: '/vidha/poetics' },
        ]
      },
      { name: 'Authors', href: '/author' },
      { name: 'Blog', href: '/blog' },
      { name: 'Tracking', href: '/tracking' },
      { name: 'Catalogue', href: '/catalogue' },
      { name: 'E-books', href: '/ebooks' },
      { name: 'Contact', href: '/contact' },
    ]
  };

  const currentNavItems = navItems[language];
  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="bg-[#8B4513] border-b-2 border-[#654321] shadow-md sticky top-0 z-50">
        <style dangerouslySetInnerHTML={{__html: `
          *::-webkit-scrollbar { width: 12px; height: 12px; }
          *::-webkit-scrollbar-track { background: #654321; }
          *::-webkit-scrollbar-thumb { background: #DC143C; border-radius: 6px; }
          *::-webkit-scrollbar-thumb:hover { background: #FF0000; }
        `}} />
        
        <div className="max-w-7xl mx-auto px-4">
          {/* टॉप बार */}
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Left: Language Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
                className="px-3 py-1.5 bg-[#654321] text-white rounded-md text-sm font-medium hover:bg-[#A0522D] transition-colors"
              >
                {language === 'hi' ? 'EN' : 'हि'}
              </button>
            </div>
            
            {/* Center: Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/logo.jpg" 
                alt="अनुज्ञा बुक्स" 
                width={80} 
                height={40}
                className="object-contain"
                priority
              />
            </Link>
            
            {/* Right: Search, Cart, Login */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-white hover:text-gray-200 transition-colors p-2"
                aria-label="Search"
              >
                <FaSearch className="text-xl" />
              </button>
              
              <Link href="/cart" className="relative text-white hover:text-gray-200 transition-colors p-2">
                <FaShoppingCart className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <Link href="/admin/login" className="text-white hover:text-gray-200 transition-colors p-2">
                <FaUser className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="pb-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'hi' ? 'पुस्तक, लेखक, या श्रेणी खोजें...' : 'Search books, authors, or categories...'}
                  className="w-full px-4 py-2 pr-10 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#8B4513] hover:text-[#654321]"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          )}

          {/* मेन मेन्यू */}
          <div className="pb-2">
            <div className="overflow-x-auto">
              <div className="flex items-center gap-1 min-w-max">
                {currentNavItems.map((item, index) => (
                  <div key={item.name} className="relative">
                    {!item.children ? (
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 text-white hover:bg-[#A0522D] rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${
                          isActive(item.href) ? "bg-[#A0522D]" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        ref={(el) => (buttonRefs.current[index] = el)}
                        onClick={() => handleDropdownClick(index)}
                        className={`px-3 py-2 text-white hover:bg-[#A0522D] rounded-lg transition-colors whitespace-nowrap text-sm font-medium flex items-center gap-1 ${
                          isActive(item.href) ? "bg-[#A0522D]" : ""
                        }`}
                      >
                        {item.name}
                        <span className="text-xs">{activeDropdown === index ? '▲' : '▼'}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* ड्रॉपडाउन मेन्यू */}
      {activeDropdown !== null && currentNavItems[activeDropdown]?.children && (
        <>
          <div 
            className="fixed inset-0 z-[90]" 
            onClick={() => setActiveDropdown(null)}
          />
          <div className="fixed left-0 right-0 bg-[#654321] shadow-lg py-4 z-[100] max-h-96 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {currentNavItems[activeDropdown].children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    onClick={() => setActiveDropdown(null)}
                    className={`block px-4 py-2 text-sm text-white hover:bg-[#A0522D] rounded transition-colors ${
                      isActive(child.href) ? "bg-[#A0522D]" : ""
                    }`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;