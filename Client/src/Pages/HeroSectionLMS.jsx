import React from 'react';
import {motion} from 'framer-motion';
import { FiCheckCircle, FiBookOpen, FiUsers, FiCode } from 'react-icons/fi';

const HeroSection = () => {
  const stats = [
    { number: '10K+', label: 'Active Students', icon: FiUsers },
    { number: '200+', label: 'Expert Tutors', icon: FiCheckCircle },
    { number: '500+', label: 'Courses', icon: FiBookOpen },
    { number: '1K+', label: 'Coding Projects', icon: FiCode },
  ];

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Blurred background elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <nav className="flex items-center justify-between mb-16">
          <div className="text-2xl font-bold text-gray-900">EduPlatform</div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
              Courses
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
              Programs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            Sign In
          </button>
        </nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your Future Through 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Digital Learning</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our interactive courses and unlock your potential with hands-on projects, expert mentorship, and career-ready skills.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex space-x-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
                Get Started Free
              </button>
              <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-blue-500 transition-colors font-medium">
                Browse Courses
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <stat.icon className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Collage */}
          <div className="relative hidden lg:block">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl transform -rotate-2"></div>
            <div className="relative space-y-6 transform rotate-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="relative rounded-2xl overflow-hidden aspect-square shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Coding Bootcamp</h3>
                    <p className="text-sm opacity-90">Full Stack Development</p>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl mt-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Live Sessions</h3>
                    <p className="text-sm opacity-90">Interactive Learning</p>
                  </div>
                </div>
              </div>
              <div className="ml-12 relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Projects</h3>
                  <p className="text-sm opacity-90">Real World Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;