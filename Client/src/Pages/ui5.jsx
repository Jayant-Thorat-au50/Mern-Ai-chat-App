import React from 'react';
import { useState } from 'react';
import { FiPlus, FiLogOut, FiTrash2, FiSettings, FiSearch, FiGrid } from 'react-icons/fi';
import { FaReact, FaNode, FaDatabase, FaMobileAlt } from 'react-icons/fa';

const HomePage5 = () => {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'Neon Commerce', 
      description: 'Next-gen e-commerce platform', 
      tech: ['React', 'Node.js', 'MongoDB'],
      progress: 85,
      icon: <FaReact className="text-2xl" />,
      category: 'web'
    },
    { 
      id: 2, 
      name: 'Quantum Dashboard', 
      description: 'Analytics dashboard with AI insights', 
      tech: ['React', 'Firebase'],
      progress: 65,
      icon: <FaDatabase className="text-2xl" />,
      category: 'data'
    },
    { 
      id: 3, 
      name: 'Pulse Mobile', 
      description: 'Health tracking mobile application', 
      tech: ['React Native'],
      progress: 45,
      icon: <FaMobileAlt className="text-2xl" />,
      category: 'mobile'
    },
    { 
      id: 4, 
      name: 'Nova API', 
      description: 'Microservice architecture backend', 
      tech: ['Node.js', 'GraphQL'],
      progress: 90,
      icon: <FaNode className="text-2xl" />,
      category: 'api'
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const handleAddProject = () => {
    const categories = ['web', 'data', 'mobile', 'api'];
    const icons = [<FaReact />, <FaDatabase />, <FaMobileAlt />, <FaNode />];
    const newProject = {
      id: projects.length + 1,
      name: `Project ${projects.length + 1}`,
      description: 'New futuristic project',
      tech: ['React', 'Node.js'],
      progress: Math.floor(Math.random() * 100),
      icon: icons[Math.floor(Math.random() * icons.length)],
      category: categories[Math.floor(Math.random() * categories.length)]
    };
    setProjects([...projects, newProject]);
  };

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Glassmorphism Header */}
      <header className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 mb-8 border border-white/10 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <FiGrid className="text-2xl text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              slashn
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all">
              <FiSearch className="text-lg" />
            </button>
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all">
              <FiSettings className="text-lg" />
            </button>
            <button 

              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 transition-all"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 h-fit">
          <h2 className="text-lg font-semibold mb-6 text-cyan-100">Dashboard</h2>
          <div className="space-y-4">
            <button 
              onClick={handleAddProject}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all shadow-lg"
            >
              <FiPlus />
              <span>New Project</span>
            </button>
            
            <div className="space-y-2 mt-8">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Categories</h3>
              <button 
                onClick={() => setActiveFilter('all')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeFilter === 'all' ? 'bg-white/10 text-cyan-300' : 'hover:bg-white/5'}`}
              >
                All Projects
              </button>
              <button 
                onClick={() => setActiveFilter('web')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeFilter === 'web' ? 'bg-white/10 text-indigo-300' : 'hover:bg-white/5'}`}
              >
                Web Applications
              </button>
              <button 
                onClick={() => setActiveFilter('mobile')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeFilter === 'mobile' ? 'bg-white/10 text-emerald-300' : 'hover:bg-white/5'}`}
              >
                Mobile Apps
              </button>
              <button 
                onClick={() => setActiveFilter('api')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeFilter === 'api' ? 'bg-white/10 text-amber-300' : 'hover:bg-white/5'}`}
              >
                API Services
              </button>
              <button 
                onClick={() => setActiveFilter('data')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeFilter === 'data' ? 'bg-white/10 text-purple-300' : 'hover:bg-white/5'}`}
              >
                Data Projects
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="lg:col-span-3">
          <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {activeFilter === 'all' ? 'All Projects' : 
                 activeFilter === 'web' ? 'Web Applications' :
                 activeFilter === 'mobile' ? 'Mobile Apps' :
                 activeFilter === 'api' ? 'API Services' : 'Data Projects'}
              </h2>
              <div className="text-sm bg-white/10 px-3 py-1 rounded-full">
                {filteredProjects.length} projects
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <FiPlus className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-gray-400 mb-4">Create your first project to get started</p>
                <button 
                  onClick={handleAddProject}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all"
                >
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map(project => (
                  <div key={project.id} className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500/20 to-blue-500/20 flex items-center justify-center">
                        {project.icon}
                      </div>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-rose-400 transition-all"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-400 to-blue-400 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-white/5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage5;