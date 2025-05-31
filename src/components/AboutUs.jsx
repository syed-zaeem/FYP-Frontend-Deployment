import React from "react";
import aboutusSection from "../Images/aboutusSection.webp"

const AboutUs = () => {
  return (
    <section className="pt-24 md:pt-28 lg:pt-32 pb-10 relative px-[4%] sm:px-[5%] md:px-[6%] lg:px-[4%] xl:px-[3%]">
      <div className="w-full max-w-7xl px-4 md:pl-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-start md:items-start items-center gap-6 inline-flex">
            <div className="w-full lg:items-start items-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center md:text-start">
              Unveiling Trends from Urdu Videos and Speech with Precision
              </h2>
              <div className="mt-4 flex flex-col gap-2 md:gap-3 lg:gap-4 justify-start">
                <p className="text-gray-500 text-base font-normal leading-relaxed md:text-start text-center">
                  Our platform leverages models to identify trends in
                  Urdu from diverse sources such as news outlets, YouTube, and
                  talk shows. Whether you're a researcher, analyst, or content
                  creator, we provide actionable insights to save time and
                  enhance productivity.
                </p>
                <p className="text-gray-500 text-base font-normal leading-relaxed md:text-start text-center">
                  With our flexible pricing plans, you can also upload your
                  custom content, such as videos, and instantly
                  discover key topics tailored to your needs. Empower your
                  content strategy or research with our innovative technology.
                </p>
              </div>
            </div>
            <button className="w-52 text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-violet-200 font-medium rounded-lg text-[17px] sm:text-lg md:text-md px-5 py-2.5 text-center transition duration-300 ease-in-out">
                Explore Plans
            </button>
          </div>
          <img
            className="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
            src={aboutusSection}
            alt="About Us Image"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
