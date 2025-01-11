import React from 'react';

const FeaturePage = () => {
  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-10 w-full">
        <h1 className="text-3xl font-bold text-center mb-4">
          Features that strengthen your <span className="text-blue-500">Brand</span>
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Platos manages all the cafeteria operations so all you focus on is enjoying the experience of eating in a streamlined cafeteria.
        </p>
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="/feature_1.png"
            alt="Patient being served food"
            className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4"
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">
            Patient Food Ordering System
            </h2>
            <p className="text-gray-700">
            The Patient Food Ordering System is a crucial component of the Hospital Food Delivery Management system. It allows hospital food managers to efficiently manage patient dietary needs and preferences. Through this system, managers can input and update patient details, including dietary restrictions and meal preferences. The system ensures that each patient receives meals tailored to their specific health requirements, enhancing patient satisfaction and care quality.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="/feature_2.png"
            alt="Patient being served food"
            className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4"
          />
          <div className="md:w-1/2 mt-16">
            <h2 className="text-2xl font-semibold mb-2">
            Hospital Management
            </h2>
            <p className="text-gray-700">
            The Hospital Management module integrates seamlessly with the Patient Food Ordering System to provide a comprehensive solution for managing hospital operations related to food services. This module allows hospital staff to oversee and coordinate various tasks, such as scheduling meal preparation and delivery, managing inventory, and ensuring compliance with health and safety standards. By streamlining these processes, the Hospital Management module helps improve operational efficiency and reduces the likelihood of errors in meal service.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center ">
          <img
            src="/feature_3.png"
            alt="Patient being served food"
            className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4"
          />
          <div className="md:w-1/2 mt-16">
            <h2 className="text-2xl font-semibold mb-2">
            Delivery Management System
            </h2>
            <p className="text-gray-700">
            The Delivery Management System is designed to track and manage the delivery of meals from the hospital's inner pantry to patient rooms. This system assigns tasks to delivery personnel, ensuring that meals are delivered promptly and accurately. It provides real-time tracking of delivery status, allowing hospital staff to monitor the progress of each delivery and address any issues that may arise. By optimizing the delivery process, this system enhances the overall patient experience and ensures that meals are served fresh and on time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;
