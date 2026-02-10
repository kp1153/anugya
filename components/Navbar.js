'use client';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [language, setLanguage] = useState('hi');
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = {
  hi: [
    { name: 'होम', href: '/' },
    { 
      name: 'विधा', 
      href: '/genre',
      children: [
        { name: 'उपन्यास', href: '/novel' },
        { name: 'जीवनी', href: '/biography' },
        { name: 'आत्मकथा', href: '/autobiography' },
        { name: 'कहानी', href: '/story' },
      ]
    },
    { 
      name: 'कविता', 
      href: '/poetry',
      children: [
        { name: 'दलित कविता', href: '/poetry/dalit' },
        { name: 'आदिवासी कविता', href: '/tribal-poetry' },
      ]
    },
    { name: 'अनुज्ञा क्लासिक्स', href: '/classics/anuugya-classics' },
    { 
      name: 'विमर्श', 
      href: '/discourse',
      children: [
        { name: 'दलित', href: '/discourse/dalit' },
        { name: 'स्त्री', href: '/discourse/women' },
        { name: 'आदिवासी', href: '/discourse/tribal' },
        { name: 'गांधीवादी', href: '/discourse/gandhian' },
      ]
    },
    { 
      name: 'अकादमिक', 
      href: '/academic',
      children: [
        { name: 'आलोचना', href: '/academic/criticism' },
        { name: 'भाषाविज्ञान', href: '/academic/linguistics' },
        { name: 'दर्शन', href: '/academic/philosophy' },
        { name: 'इतिहास-राजनीति', href: '/academic/history-politics' },
      ]
    },
    { name: 'विविध', href: '/miscellaneous' },
    { 
      name: 'भाषा', 
      href: '/language',
      children: [
        { name: 'हिंदी', href: '/language/hindi' },
        { name: 'अंग्रेजी', href: '/language/english' },
        { name: 'भोजपुरी', href: '/language/bhojpuri' },
        { name: 'बुंदेली', href: '/language/bundeli' },
        { name: 'उर्दू', href: '/language/urdu' },
      ]
    },
    { name: 'लेखक', href: '/authors' },
    { name: 'अनुवादक', href: '/translators' },
    { name: 'ट्रैकिंग', href: '/tracking' },
    { name: 'संपर्क', href: '/contact' },
  ],
  en: [
    { name: 'Home', href: '/' },
    { 
      name: 'Genre', 
      href: '/genre',
      children: [
        { name: 'Novel', href: '/novel' },
        { name: 'Biography', href: '/biography' },
        { name: 'Autobiography', href: '/autobiography' },
        { name: 'Story', href: '/story' },
      ]
    },
    { 
      name: 'Poetry', 
      href: '/poetry',
      children: [
        { name: 'Dalit Poetry', href: '/poetry/dalit' },
        { name: 'Tribal Poetry', href: '/tribal-poetry' },
      ]
    },
    { name: 'Anuugya Classics', href: '/classics/anuugya-classics' },
    { 
      name: 'Discourse', 
      href: '/discourse',
      children: [
        { name: 'Dalit', href: '/discourse/dalit' },
        { name: 'Women', href: '/discourse/women' },
        { name: 'Tribal', href: '/discourse/tribal' },
        { name: 'Gandhian', href: '/discourse/gandhian' },
      ]
    },
    { 
      name: 'Academic', 
      href: '/academic',
      children: [
        { name: 'Criticism', href: '/academic/criticism' },
        { name: 'Linguistics', href: '/academic/linguistics' },
        { name: 'Philosophy', href: '/academic/philosophy' },
        { name: 'History-Politics', href: '/academic/history-politics' },
      ]
    },
    { name: 'Miscellaneous', href: '/miscellaneous' },
    { 
      name: 'Language', 
      href: '/language',
      children: [
        { name: 'Hindi', href: '/language/hindi' },
        { name: 'English', href: '/language/english' },
        { name: 'Bhojpuri', href: '/language/bhojpuri' },
        { name: 'Bundeli', href: '/language/bundeli' },
        { name: 'Urdu', href: '/language/urdu' },
      ]
    },
    { name: 'Authors', href: '/authors' },
    { name: 'Translators', href: '/translators' },
    { name: 'Tracking', href: '/tracking' },
    { name: 'Contact', href: '/contact' },
  ]
};

  const currentNavItems = navItems[language];

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="bg-[#8B4513] border-b-2 border-[#654321] shadow-md sticky top-0 z-50">
      <style dangerouslySetInnerHTML={{__html: `
        *::-webkit-scrollbar { width: 12px; height: 12px; }
        *::-webkit-scrollbar-track { background: #654321; }
        *::-webkit-scrollbar-thumb { background: #DC143C; border-radius: 6px; }
        *::-webkit-scrollbar-thumb:hover { background: #FF0000; }
      `}} />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center pt-2 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
                className="px-3 py-1 bg-[#654321] text-white rounded-md text-sm hover:bg-[#A0522D] transition-colors"
              >
                {language === 'hi' ? 'EN' : 'हि'}
              </button>
            </div>
            
            <Link href="/" className="flex-1 flex justify-center">
              <Image 
                src="/logo.jpg" 
                alt="अनुग्या बुक्स" 
                width={70} 
                height={35}
                className="object-contain"
              />
            </Link>
            
            <div className="flex-1 flex items-center justify-end gap-4">
              <Link href="/cart" className="relative text-white hover:text-gray-200 text-2xl transition-colors">
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link href="/admin/login" className="text-white hover:text-gray-200 text-2xl transition-colors">
                👤
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-[#A0522D] transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`pt-1 pb-8 ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="pb-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              {currentNavItems.map((item, index) => (
                <div 
                  key={item.name}
                  onMouseEnter={() => item.children && setActiveDropdown(index)}
                  onMouseLeave={() => item.children && setActiveDropdown(null)}
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => !item.children && setIsMenuOpen(false)}
                      className={`flex-1 px-4 py-2 text-white hover:bg-[#A0522D] rounded-lg transition-colors ${
                        isActive(item.href) ? "bg-[#A0522D]" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                        className="px-4 py-2 text-white hover:bg-[#A0522D] rounded-lg transition-colors"
                      >
                        {activeDropdown === index ? '▲' : '▼'}
                      </button>
                    )}
                  </div>
                  
                  {item.children && activeDropdown === index && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-4 py-2 text-sm text-white hover:bg-[#A0522D] rounded-lg transition-colors ${
                            isActive(child.href) ? "bg-[#A0522D]" : ""
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-white hover:bg-[#A0522D] rounded-lg transition-colors"
              >
                {language === 'hi' ? 'कार्ट' : 'Cart'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;