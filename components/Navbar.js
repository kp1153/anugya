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
      { name: 'उपन्यास', href: '/उपन्यास' },
      { name: 'कहानी', href: '/कहानी' },
      { name: 'आदिवासी कविता', href: '/आदिवासी-कविता' },
      { name: 'जीवनी', href: '/जीवनी' },
      { name: 'आत्मकथा', href: '/आत्मकथा' },
      { 
        name: 'विमर्श', 
        href: '/विमर्श',
        children: [
          { name: 'दलित', href: '/विमर्श/दलित' },
          { name: 'स्त्री', href: '/विमर्श/स्त्री' },
          { name: 'आदिवासी', href: '/विमर्श/आदिवासी' },
          { name: 'गांधीवादी', href: '/विमर्श/गांधीवादी' },
        ]
      },
      { 
        name: 'क्लासिक्स', 
        href: '/क्लासिक्स',
        children: [
          { name: 'अनुज्ञा क्लासिक्स', href: '/क्लासिक्स/अनुज्ञा-क्लासिक्स' },
          { name: 'रशियन क्लासिक्स', href: '/क्लासिक्स/रशियन-क्लासिक्स' },
        ]
      },
      { 
        name: 'शैक्षणिक', 
        href: '/शैक्षणिक',
        children: [
          { name: 'आलोचना', href: '/शैक्षणिक/आलोचना' },
          { name: 'भाषाविज्ञान', href: '/शैक्षणिक/भाषाविज्ञान' },
          { name: 'दर्शन', href: '/शैक्षणिक/दर्शन' },
          { name: 'इतिहास-राजनीति', href: '/शैक्षणिक/इतिहास-राजनीति' },
        ]
      },
      { 
        name: 'भाषा', 
        href: '/भाषा',
        children: [
          { name: 'हिंदी', href: '/भाषा/हिंदी' },
          { name: 'अंग्रेजी', href: '/भाषा/अंग्रेजी' },
          { name: 'भोजपुरी', href: '/भाषा/भोजपुरी' },
          { name: 'बुंदेली', href: '/भाषा/बुंदेली' },
          { name: 'उर्दू', href: '/भाषा/उर्दू' },
        ]
      },
      { name: 'लेखक', href: '/लेखक' },
      { name: 'अनुवादक', href: '/अनुवादक' },
      { name: 'ट्रैकिंग', href: '/ट्रैकिंग' },
      { name: 'संपर्क', href: '/संपर्क' },
    ],
    en: [
      { name: 'Home', href: '/' },
      { name: 'Novel', href: '/उपन्यास' },
      { name: 'Story', href: '/कहानी' },
      { name: 'Tribal Poetry', href: '/आदिवासी-कविता' },
      { name: 'Biography', href: '/जीवनी' },
      { name: 'Autobiography', href: '/आत्मकथा' },
      { 
        name: 'Discourse', 
        href: '/विमर्श',
        children: [
          { name: 'Dalit', href: '/विमर्श/दलित' },
          { name: 'Women', href: '/विमर्श/स्त्री' },
          { name: 'Tribal', href: '/विमर्श/आदिवासी' },
          { name: 'Gandhian', href: '/विमर्श/गांधीवादी' },
        ]
      },
      { 
        name: 'Classics', 
        href: '/क्लासिक्स',
        children: [
          { name: 'Anuugya Classics', href: '/क्लासिक्स/अनुज्ञा-क्लासिक्स' },
          { name: 'Russian Classics', href: '/क्लासिक्स/रशियन-क्लासिक्स' },
        ]
      },
      { 
        name: 'Academic', 
        href: '/शैक्षणिक',
        children: [
          { name: 'Criticism', href: '/शैक्षणिक/आलोचना' },
          { name: 'Linguistics', href: '/शैक्षणिक/भाषाविज्ञान' },
          { name: 'Philosophy', href: '/शैक्षणिक/दर्शन' },
          { name: 'History-Politics', href: '/शैक्षणिक/इतिहास-राजनीति' },
        ]
      },
      { 
        name: 'Language', 
        href: '/भाषा',
        children: [
          { name: 'Hindi', href: '/भाषा/हिंदी' },
          { name: 'English', href: '/भाषा/अंग्रेजी' },
          { name: 'Bhojpuri', href: '/भाषा/भोजपुरी' },
          { name: 'Bundeli', href: '/भाषा/बुंदेली' },
          { name: 'Urdu', href: '/भाषा/उर्दू' },
        ]
      },
      { name: 'Authors', href: '/लेखक' },
      { name: 'Translators', href: '/अनुवादक' },
      { name: 'Tracking', href: '/ट्रैकिंग' },
      { name: 'Contact', href: '/संपर्क' },
    ]
  };

  const currentNavItems = navItems[language];

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="bg-[#8B4513] border-b-2 border-[#654321] shadow-md sticky top-0 z-50">
      <style dangerouslySetInnerHTML={{__html: `
        .menu-scroll::-webkit-scrollbar { height: 8px; }
        .menu-scroll::-webkit-scrollbar-track { background: #654321; }
        .menu-scroll::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 6px; }
        .menu-scroll::-webkit-scrollbar-thumb:hover { background: #ef4444; }
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
                className="p-2 rounded-md text-white hover:bg-[#A0522D] md:hidden transition-colors"
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

        <div className={`pt-1 pb-2 ${isMenuOpen ? "block" : "hidden"} md:block`}>
          <div className="hidden md:flex flex-nowrap w-full justify-between overflow-x-auto pb-2 menu-scroll gap-1">
            {currentNavItems.map((item, index) => (
              <div 
                key={item.name}
                className="relative group"
              >
                {item.children ? (
                  <button
                    onMouseEnter={() => setActiveDropdown(index)}
                    className={`
                      text-white text-center font-medium rounded-md whitespace-nowrap block w-full
                      px-2 py-2 text-xs
                      hover:bg-[#A0522D] transition-colors
                      ${isActive(item.href) ? "bg-[#A0522D] ring-1 ring-white" : ""}
                    `}
                  >
                    {item.name} ▼
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      text-white text-center font-medium rounded-md whitespace-nowrap block
                      px-2 py-2 text-xs
                      hover:bg-[#A0522D] transition-colors
                      ${isActive(item.href) ? "bg-[#A0522D] ring-1 ring-white" : ""}
                    `}
                  >
                    {item.name}
                  </Link>
                )}
                
                {item.children && activeDropdown === index && (
                  <div 
                    className="absolute left-0 mt-1 w-48 bg-[#654321] rounded-md shadow-xl z-[100] border border-[#A0522D]"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`
                          block px-4 py-2 text-sm text-white hover:bg-[#A0522D] first:rounded-t-md last:rounded-b-md transition-colors
                          ${isActive(child.href) ? "bg-[#A0522D]" : ""}
                        `}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/कार्ट"
              className="text-white text-center font-medium rounded-md whitespace-nowrap px-2 py-2 text-xs hover:bg-[#A0522D] transition-colors"
            >
              {language === 'hi' ? 'कार्ट' : 'Cart'}
            </Link>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                {currentNavItems.map((item, index) => (
                  <div key={item.name}>
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
                  href="/कार्ट"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-[#A0522D] rounded-lg transition-colors"
                >
                  {language === 'hi' ? 'कार्ट' : 'Cart'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;