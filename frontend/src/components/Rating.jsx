import React, { useState } from "react";
import "../componentStyles/Rating.css";
import { Star } from "@mui/icons-material";

function Rating({ value, onRatingChange, disabled }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value || 0);

  // Handle star hover
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoverRating(rating);
    }
  };

  // Mouse leave
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  // Handle click
  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);
      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };

  // Function to generate start based on the selected rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || selectedRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? "filled" : "empty"}`}
          style={{pointerEvents: disabled ? 'none' : 'auto'}}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          <Star />
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="rating">{generateStars()}</div>
    </div>
  );
}

export default Rating;
