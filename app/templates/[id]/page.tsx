'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FiArrowLeft, FiCheck, FiExternalLink, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

type Template = {
  _id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  price: number;
  features: string[];
  isPopular: boolean;
};

export default function TemplateDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch the template from the API
    // For now, we'll use sample data
    setIsLoading(true);
    
    // Sample template data
    const sampleTemplates: Template[] = [
      {
        _id: '1',
        name: 'Modern E-commerce',
        description: 'A sleek, modern e-commerce template with product galleries, cart, and checkout. Perfect for businesses looking to sell products online with a contemporary design that focuses on showcasing your products in the best light.',
        category: 'E-commerce',
        tags: ['shop', 'store', 'products', 'modern'],
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80',
        demoUrl: '#',
        price: 99,
        features: [
          'Responsive design for all devices',
          'Product gallery with zoom functionality',
          'Shopping cart with persistent storage',
          'Secure checkout system',
          'User accounts and order history',
          'Product filtering and search',
          'Related products suggestions',
          'SEO optimized structure',
          'Performance optimized loading'
        ],
        isPopular: true,
      },
      {
        _id: '2',
        name: 'Creative Portfolio',
        description: 'Showcase your work with this elegant portfolio template designed for creatives. Whether youre a photographer, designer, artist, or any creative professional, this template provides the perfect canvas to display your projects and impress potential clients.',
        category: 'Portfolio',
        tags: ['portfolio', 'creative', 'showcase', 'gallery'],
        imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
        demoUrl: '#',
        price: 79,
        features: [
          'Project gallery with filtering options',
          'About section with timeline',
          'Contact form with validation',
          'Blog integration for updates',
          'Social media links and sharing',
          'Smooth animations and transitions',
          'Testimonials section',
          'Light/dark mode toggle',
          'Custom cursor options'
        ],
        isPopular: false,
      },
      {
        _id: '3',
        name: 'Corporate Business',
        description: 'Professional business template for companies looking to establish a strong online presence. This template is designed with corporate needs in mind, providing a professional look while ensuring all the functionality a business website requires.',
        category: 'Business',
        tags: ['corporate', 'business', 'professional', 'company'],
        imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        demoUrl: '#',
        price: 129,
        features: [
          'Service showcase with detailed pages',
          'Team profiles with social links',
          'Testimonials carousel',
          'Case studies with results',
          'Newsletter signup with integration',
          'Multi-level dropdown navigation',
          'Contact page with Google Maps',
          'News/blog section',
          'Careers/job listings page'
        ],
        isPopular: true,
      },
      {
        _id: '4',
        name: 'Minimalist Blog',
        description: 'Clean and minimalist blog template focused on content readability. This template puts your content front and center with a design that eliminates distractions and enhances the reading experience for your audience.',
        category: 'Blog',
        tags: ['blog', 'minimal', 'clean', 'content'],
        imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        demoUrl: '#',
        price: 69,
        features: [
          'Category organization with filters',
          'Advanced search functionality',
          'Related posts suggestions',
          'Comment system with moderation',
          'Social sharing buttons',
          'Reading time estimates',
          'Author profiles',
          'Newsletter subscription',
          'Popular posts widget'
        ],
        isPopular: false,
      },
      {
        _id: '5',
        name: 'Product Launch',
        description: 'High-converting landing page template designed for product launches and promotions. This template is optimized for conversions with strategically placed call-to-action buttons and sections designed to highlight your product\'s benefits.',
        category: 'Landing Page',
        tags: ['landing', 'product', 'launch', 'conversion'],
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
        demoUrl: '#',
        price: 89,
        features: [
          'Multiple call-to-action sections',
          'Feature highlights with icons',
          'Testimonial carousel with photos',
          'FAQ section with accordion',
          'Newsletter signup with lead magnet',
          'Countdown timer for launches',
          'Pricing comparison table',
          'Social proof elements',
          'Mobile app mockup displays'
        ],
        isPopular: true,
      },
      {
        _id: '6',
        name: 'Restaurant & Cafe',
        description: 'Elegant template for restaurants and cafes with menu display and reservation system. This template is designed to showcase your culinary offerings and make it easy for customers to book tables and explore your menu.',
        category: 'Business',
        tags: ['restaurant', 'cafe', 'food', 'menu'],
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        demoUrl: '#',
        price: 109,
        features: [
          'Interactive menu display',
          'Table reservation system',
          'Photo gallery with lightbox',
          'Chef profiles and stories',
          'Location map with directions',
          'Opening hours display',
          'Special events calendar',
          'Customer reviews section',
          'Food delivery integration'
        ],
        isPopular: false,
      },
    ];
    
    // Find the template with the matching ID
    const foundTemplate = sampleTemplates.find(t => t._id === params.id);
    
    if (foundTemplate) {
      setTemplate(foundTemplate);
    } else {
      toast.error('Template not found');
      router.push('/templates');
    }
    
    setIsLoading(false);
  }, [params.id, router]);
  
  const handleOrderClick = () => {
    if (!session) {
      toast.error('Please log in to order this template');
      router.push(`/login?redirect=/templates/${params.id}`);
      return;
    }
    
    router.push(`/order/${params.id}`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (!template) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Template not found</h2>
          <Link href="/templates" className="btn-primary">
            Browse Templates
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/templates" className="text-purple-400 hover:text-purple-300 flex items-center">
              <FiArrowLeft className="mr-2" /> Back to Templates
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-4 overflow-hidden">
              <div className="relative h-80 overflow-hidden rounded-md">
                <img
                  src={template.imageUrl}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {template.isPopular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded">
                    Popular
                  </div>
                )}
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="h-32 overflow-hidden rounded-md bg-gray-800">
                  <img
                    src={template.imageUrl}
                    alt={`${template.name} preview 1`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 overflow-hidden rounded-md bg-gray-800">
                  <img
                    src={template.imageUrl}
                    alt={`${template.name} preview 2`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{template.name}</h1>
              
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-purple-400 mr-4">${template.price}</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                  {template.category}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6">{template.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleOrderClick}
                  className="btn-primary flex items-center justify-center"
                >
                  <FiShoppingCart className="mr-2" /> Order Now
                </button>
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center"
                >
                  <FiExternalLink className="mr-2" /> Live Demo
                </a>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Template Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-300">
                  {template.description}
                </p>
                <p className="text-gray-300 mt-4">
                  This template is perfect for {template.category.toLowerCase()} websites looking to make a strong impression. 
                  With its modern design and comprehensive features, it provides everything you need to create a professional online presence.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><strong>Responsive:</strong> Yes, works on all devices</li>
                  <li><strong>Framework:</strong> Next.js</li>
                  <li><strong>Styling:</strong> Tailwind CSS</li>
                  <li><strong>Database:</strong> MongoDB</li>
                  <li><strong>Authentication:</strong> NextAuth.js</li>
                  <li><strong>Deployment:</strong> Ready for Vercel, Netlify, or any hosting</li>
                  <li><strong>Browser Support:</strong> All modern browsers</li>
                  <li><strong>Documentation:</strong> Included</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
            <button
              onClick={handleOrderClick}
              className="btn-primary px-8 py-3 text-lg"
            >
              Order This Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}