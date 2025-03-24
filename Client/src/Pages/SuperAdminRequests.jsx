import React from 'react';
import { useEffect, useState } from 'react';
import { FiUser, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const SuperAdminRequests = () => {
  const [requests, setRequests] = useState([
    // Sample data
    {
      id: 1,
      userName: 'John Doe',
      email: 'john@example.com',
      requestDate: '2023-08-15',
      status: 'pending',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      email: 'jane@example.com',
      requestDate: '2023-08-14',
      status: 'approved',
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      email: 'mike@example.com',
      requestDate: '2023-08-13',
      status: 'rejected',
    },
  ]);

  const handleApprove = (requestId) => {
    // Handle approval logic
    console.log('Approved:', requestId);
  };

  const handleReject = (requestId) => {
    // Handle rejection logic
    console.log('Rejected:', requestId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Requests</h1>
            <div className="flex items-center space-x-4 bg-gray-100 px-4 py-2 rounded-lg">
              <FiClock className="text-gray-500" />
              <span className="text-gray-600">Total Requests: {requests.length}</span>
            </div>
          </div>

          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="group flex items-center justify-between p-6 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
              >
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                      {request.userName.charAt(0)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{request.userName}</h3>
                    <p className="text-gray-600">{request.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <FiClock className="text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Requested on {new Date(request.requestDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>

                  <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      <FiCheckCircle />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <FiXCircle />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {requests.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📭</div>
                <h3 className="text-xl font-medium text-gray-500">No pending requests</h3>
                <p className="text-gray-400 mt-2">All admin requests have been processed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminRequests;