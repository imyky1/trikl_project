import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ImageDisplay from './imagedisplay';
import TextOverlay from './textoverlay';
import config from '../config';
// const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const apiKey = config.apiKey;
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [textOverlays, setTextOverlays] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    // Fetch an image from the Unsplash API when the component mounts
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/random?client_id=${apiKey}`
        );
        setImageUrl(response.data.urls.regular);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  }, []);

  const handleAddText = () => {
    setTextOverlays([...textOverlays, { text, position }]);
    setText('');
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddText}>Add Text</button>
      </div>
      <div className="image-container">
        <ImageDisplay imageUrl={imageUrl} />
        {textOverlays.map((overlay, index) => (
          <TextOverlay
            key={index}
            text={overlay.text}
            position={overlay.position}
            onDrag={(e, data) => {
              const updatedPosition = {
                top: data.y,
                left: data.x,
              };
              const updatedOverlays = [...textOverlays];
              updatedOverlays[index].position = updatedPosition;
              setTextOverlays(updatedOverlays);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
