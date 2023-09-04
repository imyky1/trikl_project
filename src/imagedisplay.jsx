import React from 'react';

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div className="image-display">
      <img src={imageUrl} alt="Fetched" />
    </div>
  );
};

export default ImageDisplay;
