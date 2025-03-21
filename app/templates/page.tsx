'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiSearch,FiPlus, FiFilter, FiX, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
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

export default function Templates() {

  const { data: session } = useSession();
  console.log("session",session);
  const isAdmin = session?.user?.role === 'admin';
  const searchParams = useSearchParams();
  const promptParam = searchParams.get('prompt');
  
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(promptParam || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['All', 'E-commerce', 'Portfolio', 'Blog', 'Business', 'Landing Page'];
  
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        let url = '/api/templates';
        const params = new URLSearchParams();
        
        if (promptParam) {
          params.append('prompt', promptParam);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
          setTemplates(data.templates);
          setFilteredTemplates(data.templates);
        } else {
          toast.error('Failed to fetch templates');
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast.error('An error occurred while fetching templates');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTemplates();
  }, [promptParam]);
  
  useEffect(() => {
    let result = [...templates];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        template =>
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(template => template.category === selectedCategory);
    }
    
    setFilteredTemplates(result);
  }, [searchQuery, selectedCategory, templates]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };
  
  // Sample template data for demonstration
  const sampleTemplates: Template[] = [
    {
      _id: '1',
      name: 'Modern E-commerce',
      description: 'A sleek, modern e-commerce template with product galleries, cart, and checkout.',
      category: 'E-commerce',
      tags: ['shop', 'store', 'products', 'modern'],
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80',
      demoUrl: '#',
      price: 99,
      features: ['Responsive design', 'Product gallery', 'Shopping cart', 'Checkout system', 'User accounts'],
      isPopular: true,
    },
    {
      _id: '2',
      name: 'Creative Portfolio',
      description: 'Showcase your work with this elegant portfolio template designed for creatives.',
      category: 'Portfolio',
      tags: ['portfolio', 'creative', 'showcase', 'gallery'],
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      demoUrl: '#',
      price: 79,
      features: ['Project gallery', 'About section', 'Contact form', 'Blog integration', 'Social media links'],
      isPopular: false,
    },
    {
      _id: '3',
      name: 'Corporate Business',
      description: 'Professional business template for companies looking to establish a strong online presence.',
      category: 'Business',
      tags: ['corporate', 'business', 'professional', 'company'],
      imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      demoUrl: '#',
      price: 129,
      features: ['Service showcase', 'Team profiles', 'Testimonials', 'Case studies', 'Newsletter signup'],
      isPopular: true,
    },
    {
      _id: '4',
      name: 'Minimalist Blog',
      description: 'Clean and minimalist blog template focused on content readability.',
      category: 'Blog',
      tags: ['blog', 'minimal', 'clean', 'content'],
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      demoUrl: '#',
      price: 69,
      features: ['Category organization', 'Search functionality', 'Related posts', 'Comment system', 'Social sharing'],
      isPopular: false,
    },
    {
      _id: '5',
      name: 'Product Launch',
      description: 'High-converting landing page template designed for product launches and promotions.',
      category: 'Landing Page',
      tags: ['landing', 'product', 'launch', 'conversion'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
      demoUrl: '#',
      price: 89,
      features: ['Call-to-action sections', 'Feature highlights', 'Testimonial carousel', 'FAQ section', 'Newsletter signup'],
      isPopular: true,
    },
    {
      _id: '6',
      name: 'Restaurant & Cafe',
      description: 'Elegant template for restaurants and cafes with menu display and reservation system.',
      category: 'Business',
      tags: ['restaurant', 'cafe', 'food', 'menu'],
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      demoUrl: '#',
      price: 109,
      features: ['Menu display', 'Reservation system', 'Gallery', 'Chef profiles', 'Location map'],
      isPopular: false,
    },
  ];
  
  // Use sample data if no templates are fetched yet
  useEffect(() => {
    if (!isLoading && templates.length === 0) {
      setTemplates(sampleTemplates);
      setFilteredTemplates(sampleTemplates);
    }
  }, [isLoading, templates.length]);
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {promptParam 
              ? `Templates for "${promptParam}"`
              : 'Browse Our Templates'}
          </h1>
          
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="input-field pl-10"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center justify-center"
              >
                <FiFilter className="mr-2" /> Filters
              </button>

              {isAdmin && (
              <Link
                href="/templates/add" // Replace with your desired route
                className="btn-secondary flex items-center justify-center"
              >
                <FiPlus className="mr-2" /> Add Template
              </Link>
            )}
            </form>
            
            {showFilters && (
              <div className="mt-4 p-4 glass-card">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          (category === 'All' && !selectedCategory) || selectedCategory === category
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {(searchQuery || selectedCategory) && (
                  <div className="flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      Clear all filters <FiX className="ml-1" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No templates found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <button onClick={clearFilters} className="btn-primary">
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template._id}
                  className="glass-card overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={template.imageUrl}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {template.isPopular && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Popular
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{template.name}</h3>
                      <span className="text-lg font-bold text-purple-400">${template.price}</span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">{template.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                        {template.category}
                      </span>
                      {template.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                          {tag}
                        </span>
                      ))}
                      {template.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                          +{template.tags.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        href={`/templates/${template._id}`}
                        className="btn-primary flex-1 text-center"
                      >
                        View Details
                      </Link>
                      <a
                        href={template.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
                      >
                        Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/contact" className="text-purple-400 hover:text-purple-300 flex items-center justify-center">
              Can't find what you're looking for? Contact us for a custom solution <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}