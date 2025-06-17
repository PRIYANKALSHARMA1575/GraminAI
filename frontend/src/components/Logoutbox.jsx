import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutBox() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-xl font-bold text-green-700 mb-4">Confirm Logout</h2>
        <p className="mb-6 text-gray-700">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
