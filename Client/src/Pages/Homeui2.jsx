import React from "react";

import { useState } from 'react';
import { FaHome, FaPlus, FaSignOutAlt, FaTrash, FaProjectDiagram } from 'react-icons/fa';

const HomePage3 = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'E-commerce Platform', description: 'Online shopping application', lastUpdated: '2 days ago' },
    { id: 2, name: 'Task Management', description: 'Team productivity tool', lastUpdated: '1 week ago' },
    { id: 3, name: 'Portfolio Website', description: 'Personal showcase site', lastUpdated: '3 days ago' },
  ]);

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const handleAddProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `New Project ${projects.length + 1}`,
      description: 'Project description',
      lastUpdated: 'Just now'
    };
    setProjects([...projects, newProject]);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-800">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-md p-6 flex flex-col">
        <div className="flex items-center gap-2 text-2xl font-bold text-indigo-500 mb-8">
          <FaProjectDiagram className="text-2xl" />
          <span>slashn</span>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <a 
            href="#" 
            className="flex items-center gap-3 p-3 rounded-lg bg-indigo-500 text-white"
          >
            <FaHome className="text-lg" />
            <span>Home</span>
          </a>
          
          <button 
            onClick={handleAddProject}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <FaPlus className="text-lg" />
            <span>Add Project</span>
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg text-rose-500 hover:bg-rose-50 mt-auto transition-colors"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Projects</h1>
          <button 
            onClick={handleAddProject}
            className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <FaPlus />
            <span>Create Project</span>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Last updated: {project.lastUpdated}</span>
                  <button className="text-indigo-500 hover:text-indigo-700 font-medium">
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage3;