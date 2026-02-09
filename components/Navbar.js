'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    { name: 'होम', href: '/' },
    { name: 'कविता', href: '/kavita' },
    { name: 'कहानी', href: '/story' },
    { name: 'पत्रकारिता', href: '/journalism' },
    { name: 'समाज विज्ञान', href: '/social-science' },
    { name: 'स्त्री अध्ययन', href: '/woman-study' },
    { name: 'शिक्षा', href: '/education' },
    { name: 'ब्लॉग', href: '/blog' },
    { name: 'सामाजिक न्याय', href: '/social-justice' },
    { name: 'आत्मकथा', href: '/autobiography' },
    { name: 'लोक साहित्य', href: '/folk-literare' },
    { name: 'कला', href: '/art' },
    { name: 'संपर्क करें', href: '/contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -80;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .filter((item) => item.id)
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }));

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-[#8B4513] border-b-2 border-[#654321] shadow-md top-0 z-50">
      <style dangerouslySetInnerHTML={{__html: `
        .menu-scroll::-webkit-scrollbar { height: 8px; }
        .menu-scroll::-webkit-scrollbar-track { background: #654321; }
        .menu-scroll::-webkit-scrollbar-thumb { background: #A0522D; border-radius: 6px; }
        .menu-scroll::-webkit-scrollbar-thumb:hover { background: #CD853F; }
      `}} />
      
      <div className="max-w-7xl mx-auto px-4">
       <div className="text-center pt-0 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            
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
              <Link href="/cart" className="relative text-white hover:text-gray-200 text-2xl">
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link href="/admin/login" className="text-white hover:text-gray-200 text-2xl">
                👤
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-[#A0522D] md:hidden"
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
          <div className="hidden md:flex flex-nowrap w-full justify-between overflow-x-auto pb-2 menu-scroll gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  text-white text-center font-medium rounded-md whitespace-nowrap
                  px-3 py-2 text-sm
                  xl:px-1 xl:py-1 xl:text-[11px]
                  hover:bg-[#A0522D]
                  ${isActive(item.href) ? "bg-[#A0522D] ring-1 ring-white" : ""}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-white hover:bg-[#A0522D] rounded-lg transition-colors text-center"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;