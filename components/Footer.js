'use client';

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#8B4513]">
      <div className="max-w-6xl mx-auto px-4 py-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          
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
              <div className="flex items-start gap-2">
                <FaFacebook className="mt-1 flex-shrink-0" />
                <a href="https://www.facebook.com/anuugyabooks/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  facebook.com/anuugyabooks
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-base">पता</h3>
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
              <span>1/10206, Lane No. 1E of Main Lane No 1, Near Shiv Mandir T-Point, West Gorakh Park, Shahdara, Delhi, India, 110032</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-base">ब्रांच ऑफिस</h3>
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
              <span>Dharam Kanta Chowk, National Highway-57, M.B.B.L. College Road, Beria, Muzaffarpur, Bihar – 842003, India</span>
            </div>
            <p className="text-gray-200 text-xs mt-4">
              © {new Date().getFullYear()} अनुग्या बुक्स • वेबसाइट डेवलपर:{" "}
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