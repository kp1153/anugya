'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [language, setLanguage] = useState('hi');
  const pathname = usePathname();
  const { totalItems } = useCart();
  const buttonRefs = useRef({});

  const navItems = {
  hi: [
    { name: 'होम', href: '/' },
    { 
      name: 'विधा', 
      href: '/genre',
      children: [
        { name: 'उपन्यास', href: '/novel' },
        { name: 'कहानी', href: '/story' },
        { name: 'रूसी साहित्य', href: '/russian-literature' },
        { name: 'आत्मकथा', href: '/autobiography' },
        { name: 'जीवनी', href: '/biography' },
        { name: 'आलोचना', href: '/criticism' },
        { name: 'गज़ल', href: '/ghazal' },
      ]
    },
    { 
      name: 'आदिवासी साहित्य', 
      href: '/tribal-literature',
      children: [
        { name: 'कविता', href: '/tribal-literature/poetry' },
        { name: 'गद्य', href: '/tribal-literature/prose' },
      ]
    },
    { 
      name: 'दलित साहित्य', 
      href: '/dalit-literature',
      children: [
        { name: 'कविता', href: '/dalit-literature/poetry' },
        { name: 'गद्य', href: '/dalit-literature/prose' },
      ]
    },
    { name: 'अनुज्ञा क्लासिक्स', href: '/classics/anuugya-classics' },
    { name: 'नार्थ-ईस्ट साहित्य', href: '/northeast-literature' },
    { name: 'स्त्री-विमर्श', href: '/discourse/women' },
    { 
      name: 'अकादमिक', 
      href: '/academic',
      children: [
        { name: 'पत्रकारिता', href: '/academic/journalism' },
        { name: 'भाषाविज्ञान', href: '/academic/linguistics' },
        { name: 'दर्शन', href: '/academic/philosophy' },
        { name: 'इतिहास-राजनीति', href: '/academic/history-politics' },
      ]
    },
    { 
      name: 'जिल्द', 
      href: '/binding',
      children: [
        { name: 'पेपरबैक', href: '/binding/paperback' },
        { name: 'हार्डबाउंड', href: '/binding/hardbound' },
      ]
    },
    { 
      name: 'भाषा', 
      href: '/language',
      children: [
        { name: 'उर्दू', href: '/language/urdu' },
        { name: 'बुंदेलखंडी', href: '/language/bundelkhandi' },
        { name: 'भोजपुरी', href: '/language/bhojpuri' },
      ]
    },
    { 
      name: 'अनुवाद', 
      href: '/translation',
      children: [
        { name: 'विदेशी साहित्य', href: '/translation/foreign-literature' },
        { name: 'भारतीय साहित्य', href: '/translation/indian-literature' },
      ]
    },
    { name: 'रचनावली', href: '/rachnawali' },
    { name: 'अनुवादक', href: '/translators' },
    { name: 'लेखक', href: '/authors' },
    { name: 'विविध', href: '/miscellaneous' },
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
        { name: 'Story', href: '/story' },
        { name: 'Russian Literature', href: '/russian-literature' },
        { name: 'Autobiography', href: '/autobiography' },
        { name: 'Biography', href: '/biography' },
        { name: 'Criticism', href: '/criticism' },
        { name: 'Ghazal', href: '/ghazal' },
      ]
    },
    { 
      name: 'Tribal Literature', 
      href: '/tribal-literature',
      children: [
        { name: 'Poetry', href: '/tribal-literature/poetry' },
        { name: 'Prose', href: '/tribal-literature/prose' },
      ]
    },
    { 
      name: 'Dalit Literature', 
      href: '/dalit-literature',
      children: [
        { name: 'Poetry', href: '/dalit-literature/poetry' },
        { name: 'Prose', href: '/dalit-literature/prose' },
      ]
    },
    { name: 'Anuugya Classics', href: '/classics/anuugya-classics' },
    { name: 'North-East Literature', href: '/northeast-literature' },
    { name: 'Women Discourse', href: '/discourse/women' },
    { 
      name: 'Academic', 
      href: '/academic',
      children: [
        { name: 'Journalism', href: '/academic/journalism' },
        { name: 'Linguistics', href: '/academic/linguistics' },
        { name: 'Philosophy', href: '/academic/philosophy' },
        { name: 'History-Politics', href: '/academic/history-politics' },
      ]
    },
    { 
      name: 'Binding', 
      href: '/binding',
      children: [
        { name: 'Paperback', href: '/binding/paperback' },
        { name: 'Hardbound', href: '/binding/hardbound' },
      ]
    },
    { 
      name: 'Language', 
      href: '/language',
      children: [
        { name: 'Urdu', href: '/language/urdu' },
        { name: 'Bundelkhandi', href: '/language/bundelkhandi' },
        { name: 'Bhojpuri', href: '/language/bhojpuri' },
      ]
    },
    { 
      name: 'Translation', 
      href: '/translation',
      children: [
        { name: 'Foreign Literature', href: '/translation/foreign-literature' },
        { name: 'Indian Literature', href: '/translation/indian-literature' },
      ]
    },
    { name: 'Rachnawali', href: '/rachnawali' },
    { name: 'Translators', href: '/translators' },
    { name: 'Authors', href: '/authors' },
    { name: 'Miscellaneous', href: '/miscellaneous' },
    { name: 'Tracking', href: '/tracking' },
    { name: 'Contact', href: '/contact' },
  ]
};
  const currentNavItems = navItems[language];
  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  const handleDropdownClick = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      const button = buttonRefs.current[index];
      if (button) {
        const rect = button.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
      }
      setActiveDropdown(index);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (activeDropdown !== null) {
        const button = buttonRefs.current[activeDropdown];
        if (button) {
          const rect = button.getBoundingClientRect();
          setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeDropdown]);

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
              </div>
            </div>
          </div>

          {/* होरिजॉन्टल मेन्यू */}
          <div className="pb-2">
            <div className="overflow-x-auto">
              <div className="flex items-center gap-1 min-w-max">
                {currentNavItems.map((item, index) => (
                  <div key={item.name}>
                    <button
                      ref={(el) => (buttonRefs.current[index] = el)}
                      onClick={() => {
                        if (item.children) {
                          handleDropdownClick(index);
                        }
                      }}
                      className={`px-3 py-2 text-white hover:bg-[#A0522D] rounded-lg transition-colors whitespace-nowrap text-sm ${
                        isActive(item.href) ? "bg-[#A0522D]" : ""
                      }`}
                    >
                      {!item.children ? (
                        <Link href={item.href}>
                          {item.name}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-1">
                          {item.name}
                          <span className="text-xs">{activeDropdown === index ? '▲' : '▼'}</span>
                        </span>
                      )}
                    </button>
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
          <div 
            className="fixed bg-[#654321] rounded-lg shadow-lg py-2 min-w-[200px] z-[100]"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`
            }}
          >
            {currentNavItems[activeDropdown].children.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                onClick={() => setActiveDropdown(null)}
                className={`block px-4 py-2 text-sm text-white hover:bg-[#A0522D] transition-colors ${
                  isActive(child.href) ? "bg-[#A0522D]" : ""
                }`}
              >
                {child.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;