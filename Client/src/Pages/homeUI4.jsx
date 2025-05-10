import React from 'react';
import { useState } from 'react';
import { FiHome, FiPlus, FiLogOut, FiTrash2, FiCode, FiLayers, FiDatabase, FiSmartphone } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';

const HomePage4 = () => {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'E-commerce Platform', 
      description: 'Full-stack online shopping application with payment integration', 
      tech: ['React', 'Node.js', 'MongoDB'],
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      icon: <FaReact className="text-3xl text-white" />
    },
    { 
      id: 2, 
      name: 'Task Manager', 
      description: 'Team productivity tool with real-time updates', 
      tech: ['React', 'Firebase'],
      color: 'bg-gradient-to-br from-rose-500 to-pink-600',
      icon: <FiLayers className="text-3xl text-white" />
    },
    { 
      id: 3, 
      name: 'Portfolio Website', 
      description: 'Interactive personal showcase with animations', 
      tech: ['Next.js', 'Framer Motion'],
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      icon: <FiCode className="text-3xl text-white" />
    },
    { 
      id: 4, 
      name: 'Mobile App', 
      description: 'Cross-platform application for iOS and Android', 
      tech: ['React Native'],
      color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      icon: <FiSmartphone className="text-3xl text-white" />
    },
  ]);

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const handleAddProject = () => {
    const colors = [
      'bg-gradient-to-br from-purple-500 to-indigo-600',
      'bg-gradient-to-br from-rose-500 to-pink-600',
      'bg-gradient-to-br from-blue-500 to-cyan-600',
      'bg-gradient-to-br from-emerald-500 to-teal-600',
      'bg-gradient-to-br from-amber-500 to-orange-600'
    ];
    
    const icons = [<FaReact />, <FaNodeJs />, <FaPython />, <FiDatabase />];
    
    const newProject = {
      id: projects.length + 1,
      name: `New Project ${projects.length + 1}`,
      description: 'Describe your amazing new project here',
      tech: ['React', 'Node.js'],
      color: colors[Math.floor(Math.random() * colors.length)],
      icon: icons[Math.floor(Math.random() * icons.length)]
    };
    setProjects([...projects, newProject]);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FiCode className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                slashn
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleAddProject}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiPlus />
                <span>New Project</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Your Dashboard</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Build, manage, and deploy your projects with our powerful MERN stack platform
            </p>
            <button 
              onClick={handleAddProject}
              className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Start New Project
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Your Projects</h2>
          <div className="flex items-center space-x-4">
            <span className="text-slate-500">{projects.length} projects</span>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <FiCode className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-lg font-medium text-slate-900">No projects yet</h3>
            <p className="mt-2 text-slate-500 max-w-md mx-auto">
              Get started by creating your first project
            </p>
            <button 
              onClick={handleAddProject}
              className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className={`absolute top-0 left-0 w-full h-2 ${project.color}`}></div>
                <div className="bg-white p-6 pt-8">
                  <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <div className={`w-14 h-14 rounded-lg ${project.color} flex items-center justify-center mb-4`}>
                    {project.icon}
                  </div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{project.name}</h3>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <p className="text-slate-600 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 border border-slate-200 rounded-lg text-indigo-600 font-medium hover:bg-slate-50 transition-colors">
                    Open Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage4;