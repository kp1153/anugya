import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          संपर्क करें
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Phone */}
          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Phone className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                फ़ोन
              </h2>
              <a 
                href="tel:+919479060031"
                className="text-orange-600 hover:text-orange-700 text-xl"
              >
                094790 60031
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                ईमेल
              </h2>
              <a 
                href="mailto:agoraprakashan001@gmail.com"
                className="text-orange-600 hover:text-orange-700 break-all"
              >
                agoraprakashan001@gmail.com
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                पता
              </h2>
              <p className="text-gray-700 leading-relaxed">
                ग्राम अहिरान, पोस्ट चमांव, शिवपुर, वाराणसी-221003,<br />
                उत्तर प्रदेश, भारत
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              कार्य समय
            </h2>
            <p className="text-gray-700">
              सोमवार - शनिवार: सुबह 10:00 बजे - शाम 6:00 बजे<br />
              रविवार: बंद
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}