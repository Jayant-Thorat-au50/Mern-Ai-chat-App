
import React from "react";
import { useState } from "react";

const HeroSection = () => {
  // Sample lecture data
  const lectures = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React and how to create components.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "10 min",
    },
    {
      id: 2,
      title: "Advanced React Concepts",
      description: "Explore advanced React topics such as hooks and context API.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "15 min",
    },
    {
      id: 3,
      title: "React State Management",
      description: "Understand state management with React and Redux.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "12 min",
    },
  ];

  // State for selected lecture
  const [selectedLecture, setSelectedLecture] = useState(lectures[0]);

  const handleSelectLecture = (lecture) => {
    setSelectedLecture(lecture);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side: Lecture List */}
      <div className="w-1/3 p-4 bg-white border-r border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Lectures</h2>
        <ul className="space-y-4">
          {lectures.map((lecture) => (
            <li
              key={lecture.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
              onClick={() => handleSelectLecture(lecture)}
            >
              <div>
                <h3 className="font-semibold text-lg">{lecture.title}</h3>
                <p className="text-sm text-gray-600">{lecture.description}</p>
              </div>
              <span className="text-gray-400">{lecture.duration}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Video Player */}
      <div className="w-2/3 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{selectedLecture.title}</h2>
          <video
            controls
            className="w-full h-64 rounded-lg mb-4"
            src={selectedLecture.videoUrl}
          />
          <p className="text-gray-600">{selectedLecture.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
