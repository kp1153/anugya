'use client';

import { FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#8B4513]">
      <div className="max-w-6xl mx-auto px-4 py-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          
          <div>
            <h3 className="font-bold mb-3 text-base">संपर्क</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <FaPhone className="mt-1 flex-shrink-0" />
                <span>011-45506552, 7291920186, 9350809192</span>
              </div>
              <div className="flex items-start gap-2">
                <FaEnvelope className="mt-1 flex-shrink-0" />
                <span>salesanuugyabooks@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-200 text-xs">
              © {new Date().getFullYear()} अनुग्या बुक्स • वेबसाइट:{" "}
              <a href="https://www.web-developer-kp.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                web-developer-kp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}