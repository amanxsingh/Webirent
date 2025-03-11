'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiCheckCircle, FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

type OrderDetails = {
  orderNumber: string;
  template: {
    id: string;
    name: string;
    price: number;
  };
  customerDetails: {
    businessName: string;
    contactEmail: string;
    contactPhone: string;
    requirements: string;
  };
  date: string;
};

export default function OrderConfirmation() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  
  useEffect(() => {
    // Get order details from localStorage
    const storedDetails = localStorage.getItem('orderDetails');
    
    if (storedDetails) {
      setOrderDetails(JSON.parse(storedDetails));
    } else {
      // If no order details, redirect to templates
      router.push('/templates');
    }
  }, [router]);
  
  if (!orderDetails) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  const formattedDate = new Date(orderDetails.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-500 mb-6">
              <FiCheckCircle size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-300">
              Thank you for your order. We've received your request and will begin working on it right away.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 mb-8"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold gradient-text">Webirent</h2>
                <p className="text-gray-400">Custom Website Templates</p>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold">Order Confirmation</h3>
                <p className="text-gray-400">{formattedDate}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 my-6 pt-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order Number:</span>
                <span>{orderDetails.orderNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Business/Project:</span>
                <span>{orderDetails.customerDetails.businessName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Contact Email:</span>
                <span>{orderDetails.customerDetails.contactEmail}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Contact Phone:</span>
                <span>{orderDetails.customerDetails.contactPhone}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 my-6 pt-6">
              <h3 className="text-lg font-semibold mb-4">Order Details</h3>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{orderDetails.template.name} Template</h4>
                  <p className="text-sm text-gray-400">Includes customization and 30 days support</p>
                </div>
                <span>${orderDetails.template.price.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-700 my-4 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${orderDetails.template.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 my-6 pt-6">
              <h3 className="text-lg font-semibold mb-2">Your Requirements</h3>
              <p className="text-gray-300 whitespace-pre-line">{orderDetails.customerDetails.requirements}</p>
            </div>
            
            <div className="border-t border-gray-700 my-6 pt-6">
              <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
              <ol className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2 flex-shrink-0">1</span>
                  <span>Our team will review your order and requirements.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2 flex-shrink-0">2</span>
                  <span>We'll contact you within 24 hours to discuss any details or clarifications.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2 flex-shrink-0">3</span>
                  <span>We'll begin customizing your template according to your requirements.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2 flex-shrink-0">4</span>
                  <span>You'll receive your completed website within 3-5 business days.</span>
                </li>
              </ol>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="btn-secondary flex items-center justify-center">
              <FiDownload className="mr-2" /> Download Receipt
            </button>
            <Link href="/dashboard" className="btn-primary flex items-center justify-center">
              Go to Dashboard <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-8 text-gray-400"
          >
            If you have any questions, please contact us at{' '}
            <a href="mailto:support@webirent.com" className="text-purple-400 hover:text-purple-300 flex items-center justify-center mt-2">
              <FiMail className="mr-2" /> support@webirent.com
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  );
}