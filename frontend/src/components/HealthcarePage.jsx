import React from "react";
import { Link } from "react-router-dom";
import FeaturePage from "./FeaturePage";

const HealthcarePage = () => {
  const scrollToFeaturePage = () => {
    const featurePageSection = document.getElementById("feature-page-section");
    if (featurePageSection) {
      featurePageSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen bg-cover bg-center bg-fixed">
      <header className="flex justify-between items-center px-8 py-6 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-[#40b1cc] bg-clip-text text-transparent">
          HOSPIVERSE
        </div>
        <nav className="space-x-8">
          <Link
            to="/healthcare"
            className="text-gray-600 font-medium hover:text-[#40b1cc] transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/patients"
            className="text-gray-600 font-medium hover:text-[#40b1cc] transition-colors duration-200"
          >
            Patients
          </Link>
          <Link
            to="/food-charts"
            className="text-gray-600 font-medium hover:text-[#40b1cc] transition-colors duration-200"
          >
            Food Charts
          </Link>
          <Link
            to="/meal-deliveries"
            className="text-gray-600 font-medium hover:text-[#40b1cc] transition-colors duration-200"
          >
            Meal Deliveries
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 font-medium hover:text-[#40b1cc] transition-colors duration-200"
          >
            Contact Us
          </Link>
        </nav>
      </header>
      <main className="relative flex  min-h-screen w-full mt-0">
        <div className=" bg-gradient-to-b from-blue-100 to-white  w-full h-full">
          <div className="flex h-full w-full">
            <div className="flex-none w-7/12 h-full">
              <img
                className="h-full w-full object-cover"
                src="/hero_section.jpg"
                alt="Hospital Food Delivery"
                width={1000}
                height={1000}
              />
            </div>

            <div className="flex-grow flex text- flex-col justify-center px-4 sm:px-6 lg:px-8">
              <div className="relative  z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
                <main className="sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                  <div className="sm:text-center justify-center lg:text-left">
                    <h1 className="text-4xl pt-8 text-ce tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-5xl">
                      <span className="block xl:inline">
                        Streamline Hospital
                      </span>{" "}
                      <br />
                      <span className="block text-blue-600 xl:inline">
                        Food Delivery
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      Efficiently manage patient diets, assign tasks to the
                      pantry, and track food delivery - all in one place.
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <button
                          onClick={scrollToFeaturePage}
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                        >
                          Get started
                        </button>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-20 fill-current text-white"
              viewBox="0 0 1440 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0l60 10C120 20 240 40 360 40s240-20 360-20 240 20 360 40 240 20 360 10l60-10v80H0V0z" />
            </svg>
          </div>
        </div>
      </main>

      <section id="feature-page-section">
        <FeaturePage />
      </section>
      <footer className="p-8 bg-gradient-to-r from-blue-900 to-[#40b1cc] text-center shadow-inner">
        <p className="text-white font-medium">
          © 2025 Hospital Food Delivery Management. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HealthcarePage;
