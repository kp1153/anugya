'use client';
import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedChild, setExpandedChild] = useState(null);
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
    { 
      name: 'विधा', 
      href: '/vidha',
      children: [
        { 
          name: 'आदिवासी साहित्य', 
          href: '/vidha/aadivasi',
          children: [
            { name: 'कविता', href: '/vidha/aadivasi/poetry' },
            { name: 'कहानी', href: '/vidha/aadivasi/kahani' },
            { name: 'उपन्यास', href: '/vidha/aadivasi/upanyas' },
            { name: 'विचार', href: '/vidha/aadivasi/vichar' },
          ]
        },
        { 
          name: 'अकादमिक', 
          href: '/vidha/akadmik',
          children: [
            { name: 'अर्थशास्त्र', href: '/vidha/akadmik/economics' },
            { name: 'इतिहास', href: '/vidha/akadmik/history' },
            { name: 'गांधी', href: '/vidha/akadmik/gandhi' },
            { name: 'चिकित्सा विज्ञान', href: '/vidha/akadmik/medical' },
            { name: 'दर्शनशास्त्र', href: '/vidha/akadmik/philosophy' },
            { name: 'पत्रकारिता', href: '/vidha/akadmik/journalism' },
            { name: 'प्रबंधन', href: '/vidha/akadmik/management' },
            { name: 'भाषाविज्ञान', href: '/vidha/akadmik/linguistics' },
            { name: 'राजनीति', href: '/vidha/akadmik/politics' },
            { name: 'समाजशास्त्र', href: '/vidha/akadmik/sociology' },
            { name: 'सामान्य ज्ञान', href: '/vidha/akadmik/gk' },
            { name: 'सिनेमा', href: '/vidha/akadmik/cinema' },
            { name: 'शब्दकोश', href: '/vidha/akadmik/dictionary' },
            { name: 'शिक्षा', href: '/vidha/akadmik/education' },
          ]
        },
        { 
          name: 'अनुवाद', 
          href: '/vidha/anuvaad',
          children: [
            { name: 'भारतीय - कविता', href: '/vidha/anuvaad/bhartiya/poetry' },
            { name: 'भारतीय - कहानी', href: '/vidha/anuvaad/bhartiya/kahani' },
            { name: 'भारतीय - उपन्यास', href: '/vidha/anuvaad/bhartiya/upanyas' },
            { name: 'विदेशी - कविता', href: '/vidha/anuvaad/videshi/poetry' },
            { name: 'विदेशी - कहानी', href: '/vidha/anuvaad/videshi/kahani' },
            { name: 'विदेशी - उपन्यास', href: '/vidha/anuvaad/videshi/upanyas' },
          ]
        },
        { 
          name: 'क्लासिक्स', 
          href: '/vidha/classics',
          children: [
            { name: 'अंग्रेजी', href: '/vidha/classics/english' },
            { name: 'उर्दू', href: '/vidha/classics/urdu' },
            { name: 'हिंदी', href: '/vidha/classics/hindi' },
          ]
        },
        { 
          name: 'जिल्द', 
          href: '/vidha/jild',
          children: [
            { name: 'कॉम्बो पैक', href: '/vidha/jild/combo' },
            { name: 'पिन बाउंड', href: '/vidha/jild/pinbound' },
            { name: 'पेपर बाउंड', href: '/vidha/jild/paperbound' },
            { name: 'हार्ड बाउंड - 2024', href: '/vidha/jild/hardbound-2024' },
            { name: 'हार्ड बाउंड - 2025', href: '/vidha/jild/hardbound-2025' },
            { name: 'हार्ड बाउंड - 2026', href: '/vidha/jild/hardbound-2026' },
          ]
        },
        { 
          name: 'फ़िक्शन', 
          href: '/vidha/fiction',
          children: [
            { name: 'कविता', href: '/vidha/fiction/poetry' },
            { name: 'कहानी', href: '/vidha/fiction/kahani' },
            { name: 'काव्यशास्त्र', href: '/vidha/fiction/poetics' },
            { name: 'उपन्यास', href: '/vidha/fiction/upanyas' },
            { name: 'लघुकथा', href: '/vidha/fiction/laghukatha' },
            { name: 'शायरी', href: '/vidha/fiction/shayri' },
          ]
        },
        { 
          name: 'भाषा/प्रादेशिक', 
          href: '/vidha/bhasha',
          children: [
            { name: 'अंग्रेजी', href: '/vidha/bhasha/english' },
            { name: 'अंडमानी', href: '/vidha/bhasha/andamani' },
            { name: 'उर्दू', href: '/vidha/bhasha/urdu' },
            { name: 'छत्तीसगढ़ी', href: '/vidha/bhasha/chhattisgarhi' },
            { name: 'झारखंड', href: '/vidha/bhasha/jharkhand' },
            { name: 'नॉर्थ-ईस्ट', href: '/vidha/bhasha/north-east' },
            { name: 'प्रवासी साहित्य', href: '/vidha/bhasha/pravasi' },
            { name: 'बघेली', href: '/vidha/bhasha/bagheli' },
            { name: 'बुंदेली', href: '/vidha/bhasha/bundeli' },
            { name: 'भोजपुरी', href: '/vidha/bhasha/bhojpuri' },
            { name: 'राजस्थानी', href: '/vidha/bhasha/rajasthani' },
            { name: 'संस्कृत', href: '/vidha/bhasha/sanskrit' },
            { name: 'हरियाणवी', href: '/vidha/bhasha/haryanvi' },
            { name: 'हिमाचली', href: '/vidha/bhasha/himachali' },
          ]
        },
        { 
          name: 'विमर्श', 
          href: '/vidha/vimarsh',
          children: [
            { name: 'आलोचना', href: '/vidha/vimarsh/alochana' },
            { name: 'दलित विमर्श', href: '/vidha/vimarsh/dalit' },
            { name: 'दिव्यांग', href: '/vidha/vimarsh/divyang' },
            { name: 'पर्यावरण', href: '/vidha/vimarsh/environment' },
            { name: 'सांप्रदायिकता', href: '/vidha/vimarsh/communalism' },
            { name: 'स्त्री विमर्श', href: '/vidha/vimarsh/stri' },
          ]
        },
        { 
          name: 'विविध', 
          href: '/vidha/vividh',
          children: [
            { name: 'आत्मकथा', href: '/vidha/vividh/aatmkatha' },
            { name: 'ईसाई धर्म', href: '/vidha/vividh/christianity' },
            { name: 'कला एवं संस्कृति', href: '/vidha/vividh/art-culture' },
            { name: 'किशोर साहित्य', href: '/vidha/vividh/kishore' },
            { name: 'ग्रामीण', href: '/vidha/vividh/gramin' },
            { name: 'जीवनी', href: '/vidha/vividh/jivani' },
            { name: 'डायरी', href: '/vidha/vividh/diary' },
            { name: 'धार्मिक', href: '/vidha/vividh/religious' },
            { name: 'निबंध', href: '/vidha/vividh/nibandh' },
            { name: 'पत्र', href: '/vidha/vividh/letter' },
            { name: 'पुलिसिंग', href: '/vidha/vividh/policing' },
            { name: 'राष्ट्रवाद', href: '/vidha/vividh/nationalism' },
            { name: 'रंगमंच', href: '/vidha/vividh/theatre' },
            { name: 'व्यंग्य', href: '/vidha/vividh/vyangya' },
            { name: 'संगीत', href: '/vidha/vividh/music' },
            { name: 'संचयन', href: '/vidha/vividh/sanchayan' },
            { name: 'संस्मरण', href: '/vidha/vividh/sansmaran' },
            { name: 'साक्षात्कार', href: '/vidha/vividh/interview' },
            { name: 'समग्र', href: '/vidha/vividh/samagra' },
          ]
        },
      ]
    },
    { name: 'लेखक', href: '/author' },
    { name: 'अनुवादक', href: '/translator' },
    { name: 'कैटलॉग', href: '/catalogue' },
    { name: 'ई-बुक्स', href: '/ebooks' },
    { name: 'संपर्क', href: '/contact' },
  ],
  en: [
    { name: 'Home', href: '/' },
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
    { name: 'Translators', href: '/translator' },
    { name: 'Catalogue', href: '/catalogue' },
    { name: 'E-books', href: '/ebooks' },
    { name: 'Contact', href: '/contact' },
  ]
};
 const currentNavItems = navItems[language];
  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setExpandedChild(null);
  };

  const handleChildClick = (childIndex) => {
    setExpandedChild(expandedChild === childIndex ? null : childIndex);
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
      <nav className="bg-[#8B4513] border-b-2 border-[#654321] shadow-md z-50">
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
            
            {/* Right: Blog, Tracking, Search, Cart, Login */}
            <div className="flex items-center gap-3">
              <Link href="/blog" className="text-white hover:text-gray-200 transition-colors text-sm font-medium">
                {language === 'hi' ? 'ब्लॉग' : 'Blog'}
              </Link>
              
              <Link href="/tracking" className="text-white hover:text-gray-200 transition-colors text-sm font-medium">
                {language === 'hi' ? 'ट्रैकिंग' : 'Tracking'}
              </Link>
              
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-white hover:text-gray-200 transition-colors p-2"
                aria-label="Search"
              >
                <FaSearch className="text-xl" />
              </button>
              
              <Link href="/cart" className="relative group">
                <div className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                  <FaShoppingCart className="text-2xl" />
                  {totalItems > 0 && (
                    <span className="bg-yellow-400 text-red-900 text-sm font-bold px-2.5 py-0.5 rounded-full animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </div>
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
            <div className="flex items-center justify-between w-full">
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
      </nav>
      
      {/* ड्रॉपडाउन मेन्यू - वर्टिकल */}
      {activeDropdown !== null && currentNavItems[activeDropdown]?.children && (
        <>
          <div 
            className="fixed inset-0 z-[90]" 
            onClick={() => {
              setActiveDropdown(null);
              setExpandedChild(null);
            }}
          />
          <div className="fixed left-0 right-0 bg-[#654321] shadow-lg py-4 z-[100] max-h-96 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col gap-1">
                {currentNavItems[activeDropdown].children.map((child, childIndex) => (
                  <div key={child.name} className="border border-[#8B4513] rounded-lg overflow-hidden">
                    {!child.children ? (
                      <Link
                        href={child.href}
                        onClick={() => {
                          setActiveDropdown(null);
                          setExpandedChild(null);
                        }}
                        className={`block px-4 py-2 text-sm text-white hover:bg-[#A0522D] transition-colors ${
                          isActive(child.href) ? "bg-[#A0522D]" : ""
                        }`}
                      >
                        {child.name}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleChildClick(childIndex)}
                          className={`w-full flex items-center justify-between px-4 py-2 text-sm text-white hover:bg-[#A0522D] transition-colors font-semibold ${
                            isActive(child.href) ? "bg-[#A0522D]" : ""
                          }`}
                        >
                          {child.name}
                          <span className="text-xs">{expandedChild === childIndex ? '▲' : '▼'}</span>
                        </button>
                        {expandedChild === childIndex && (
                          <div className="bg-[#8B4513] bg-opacity-30">
                            {child.children.map((grandchild) => (
                              <Link
                                key={grandchild.name}
                                href={grandchild.href}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setExpandedChild(null);
                                }}
                                className={`block px-6 py-2 text-sm text-white hover:bg-[#A0522D] transition-colors ${
                                  isActive(grandchild.href) ? "bg-[#A0522D]" : ""
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;