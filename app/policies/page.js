'use client';

import { useState } from 'react';

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState('shipping');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Policies & Terms
        </h1>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'shipping'
                ? 'bg-[#006680] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Shipping Policy
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'refund'
                ? 'bg-[#006680] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Refund Policy
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'privacy'
                ? 'bg-[#006680] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'terms'
                ? 'bg-[#006680] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Terms & Conditions
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          
          {activeTab === 'shipping' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
              <p className="mb-4">Thank you for visiting and shopping at Agoraprakashan.store. The following are the terms and conditions that constitute our Shipping Policy.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Domestic Shipping Policy</h3>
              <p className="mb-3"><strong>Shipment processing time:</strong> All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
              <p className="mb-3"><strong>Shipping rates & delivery estimates:</strong> Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Shipment to P.O. boxes or APO/FPO addresses</h3>
              <p className="mb-3">Agoraprakashan.store ships to addresses within India, P.O. Boxes, and APO/FPO/DPO addresses.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Shipment confirmation & Order tracking</h3>
              <p className="mb-3">You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Customs, Duties and Taxes</h3>
              <p className="mb-3">Agoraprakashan.store is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Damages</h3>
              <p className="mb-3">Agoraprakashan.store is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">International Shipping Policy</h3>
              <p className="mb-3">We currently do not ship outside India.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Returns Policy</h3>
              <p className="mb-3">Our Return & Refund Policy provides detailed information about options and procedures for returning your order.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Contact Us</h3>
              <p className="mb-3">If you have any questions about our Shipping Policy, please contact us at</p>
              <p className="mb-3">Plot no. 132, Jai Durga Nagar Colony, Gali Shakuntalam, Kadipur, Shivpur Varanasi-221003</p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
              <p className="mb-4">Thank you for shopping at hindyugm.com, the official website of Agoraprakashan.store based in Varanasi, Uttar Pradesh. We appreciate your business and hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may be eligible for a refund as outlined below:</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Returns</h3>
              <p className="mb-3">All returns must be postmarked within 30 days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Refund Process</h3>
              <p className="mb-3">To return an item, provide detailed instructions on how to return an item, including the mailing address for returns. After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least 15 days from the receipt of your item to process your return.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Exceptions</h3>
              <p className="mb-3">If applicable, explain any exceptions to your return and refund policy, e.g., sale items are FINAL SALE and cannot be returned.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Damaged Items</h3>
              <p className="mb-3">If you receive a damaged or defective item, please notify us immediately at Agoraprakashan.store. We will replace the item or provide a refund, as per your preference.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Questions</h3>
              <p className="mb-3">If you have any questions concerning our return policy, please contact us at:</p>
              <p className="mb-3">Plot no. 132, Jai Durga Nagar Colony, Gali Shakuntalam, Kadipur, Shivpur Varanasi-221003</p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
              <p className="mb-4">The official website of Agoraprakashan.store, a Hindi book publishing company located in Varanasi. Your privacy is of utmost importance to us. This privacy policy outlines the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Information We Collect</h3>
              <p className="mb-3"><strong>Personal Information:</strong> We may collect personal information such as your name, email address, and phone number when you register on our website, place an order, subscribe to our newsletter, or contact us for any other reasons.</p>
              <p className="mb-3"><strong>Non-Personal Information:</strong> We may collect non-personal information about your visit to our website, including the full Uniform Resource Locators (URL), clickstream to, through and from our website, products you viewed or searched for, page response times, download errors, length of visits to certain pages, page interaction information, methods used to browse away from the page, and any phone number used to call our customer service number.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">How We Use Your Information</h3>
              <p className="mb-3">We use the information collected from you to process orders, provide customer support, improve our website and services, and send periodic emails with updates, promotions, or other relevant information.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Protection of Your Information</h3>
              <p className="mb-3">We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Cookies</h3>
              <p className="mb-3">We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Third-Party Links</h3>
              <p className="mb-3">Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We, therefore, have no responsibility or liability for the content and activities of these linked sites.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Changes to This Privacy Policy</h3>
              <p className="mb-3">We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Contact Us</h3>
              <p className="mb-3">If you have any questions regarding this privacy policy, you may contact us using the information below:</p>
              <p className="mb-3">Plot no. 132, Jai Durga Nagar Colony, Gali Shakuntalam, Kadipur, Shivpur Varanasi-221003</p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
              <p className="mb-4">Welcome to hindyugm.com, the official website of Agora Prakashan located at Plot no. 132, Jai Durga Nagar Colony, Gali Shakuntalam, Kadipur, Shivpur Varanasi-221003. By using our website, you agree to comply with and be bound by the following terms and conditions.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Acceptance of Terms</h3>
              <p className="mb-3">Your access to and use of hindyugm.com is subject exclusively to these Terms and Conditions. You must not use this website for any purpose that is unlawful or prohibited by these Terms and Conditions.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Intellectual Property</h3>
              <p className="mb-3">All content included on this website, including text, graphics, logos, images, and software is the property of Agora Prakashan or its content suppliers and is protected by copyright laws.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">User Conduct</h3>
              <p className="mb-3">You must use the website in a responsible and legal manner, respecting all applicable laws and regulations.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Limitation of Liability</h3>
              <p className="mb-3">Agora Prakashan will not be liable for any direct, indirect, or consequential loss or damage arising out of or in connection with the use of this website.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Indemnity</h3>
              <p className="mb-3">You agree to indemnify and hold Agora Prakashan harmless from and against all liabilities, legal fees, damages, losses, costs, and other expenses relating to any claims or actions brought against Agora Prakashan arising out of any breach by you of these Terms and Conditions or other liabilities arising out of your use of this website.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Changes to Terms and Conditions</h3>
              <p className="mb-3">We may change these Terms and Conditions at any time, and shall notify you by posting an updated version of these Terms and Conditions on this website. Your continued use of this website after changes have been made indicates your acceptance of these changes.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Governing Law</h3>
              <p className="mb-3">These Terms and Conditions shall be governed by and construed in accordance with the law of India and you hereby submit to the exclusive jurisdiction of the Indian courts.</p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Contact Us</h3>
              <p className="mb-3">If you have any questions regarding these Terms and Conditions, you may contact us at:</p>
              <p className="mb-3">Plot no. 132, Jai Durga Nagar Colony, Gali Shakuntalam, Kadipur, Shivpur Varanasi-221003</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}