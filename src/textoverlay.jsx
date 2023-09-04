import React, { useState } from 'react';
import Draggable from 'react-draggable';

const TextOverlay = ({ text, position, onDrag}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleTextBlur = () => {
    setIsEditing(false);
  };

  return (
    <Draggable onDrag={onDrag} >
        <div   className="text-overlay" style={position}>
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
            />
          ) : (
            <div onClick={handleTextClick}>{editedText}</div>
            
          )}
        </div>
    </Draggable>
  );
};

export default TextOverlay;
