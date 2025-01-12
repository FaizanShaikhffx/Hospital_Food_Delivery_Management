import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#40b1cc]">Contact Us</h1>
      <form className="max-w-full sm:max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#40b1cc] text-white rounded-md hover:bg-[#41c8e9] focus:outline-none focus:ring-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
