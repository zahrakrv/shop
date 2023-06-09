import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const SlideShow = () => {
  const images = ['images/1.webp', 'images/2.webp', 'images/3.webp'];

  const zoomInproperties = {
    indicators: true,
    scale: 1.2,
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    transition: 'slide',
    prevArrow: (
      <div className="w-8 -ml-5 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#2e2e2e"
        >
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
        </svg>
      </div>
    ),
    nextArrow: (
      <div className="w-8 -mr-6 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#2e2e2e"
        >
          <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
        </svg>
      </div>
    ),
  };
  const customStyles = {
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease-in-out',
  };
  return (
    <div className="m-16 w-full">
      <Zoom {...zoomInproperties}>
        {images.map((each, index) => (
          <div
            key={index}
            className="flex justify-center w-full h-full object-cover object-fill"
          >
            <img
              alt="slider"
              src={each}
              className="w-[90%] object-cover rounded-lg shadow-xl"
            />
          </div>
        ))}
      </Zoom>
    </div>
  );
};

export default SlideShow;
