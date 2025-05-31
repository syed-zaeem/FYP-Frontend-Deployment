import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import three from "../Images/3.jpg";

const HeroSection = () => {
  return (
    <div className="relative flex justify-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${three})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)', // Apply blur to the background
          // backgroundBlendMode: 'multiply',
          zIndex: -1, // Ensure the background stays behind the content
        }}
      />

      {/* Text Content */}
      <div className="text-center flex justify-center w-full items-center my-28 md:my-32 lg:my-40 xl:my-52">
        <div className="w-[85%] sm:w-[90%] md:w-[80%] lg:w-[68%]">
          <h1 className="text-white text-[32px] sm:text-4xl md:text-[40px] xl:text-5xl font-bold tracking-tight mb-5">
            Urdu Trends Insight
          </h1>
          <p className="text-gray-200 text-customWhite text-lg sm:text-xl font-normal leading-relaxed tracking-wide">
            Discover the latest trends from popular Urdu videos, helping audiences stay updated with current themes, news, and viral content in the Urdu-speaking community.
          </p>

          {/* Centered Button */}
          <div className="flex justify-center mt-10">
            <button className="flex items-center gap-2 text-white bg-transparent border-2 font-medium text-lg px-14 py-3 rounded-lg hover:bg-gray-50 hover:text-violet-600 transition-all duration-300">
              <FaShoppingCart className="text-xl" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
