import React, { useEffect, useState } from "react";

const Homepage1 = ({ videos, interval }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      setIsVideoLoaded(false);
    }, interval);

    return () => clearInterval(intervalId);
  }, [videos, interval]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true); 
  };

  return (
    <div className="video-container-wrapper">
      <video
        key={currentVideoIndex}
        src={videos[currentVideoIndex]}
        className={`video-container ${isVideoLoaded ? "fade-in" : ""}`}
        autoPlay
        loop
        muted
        onLoadedData={handleVideoLoad}
      />
    </div>
  );
};

export default Homepage1;
