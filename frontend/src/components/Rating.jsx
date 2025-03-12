import React, { useState } from "react";
import "../componentStyles/Rating.css";
import { Star } from "@mui/icons-material";

function Rating({ value, onRatingChange, disable }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value || 0);

  // Handle star hover
  const handleMouseEnter = (rating) => {
    if (!disable) {
      setHoverRating(rating);
    }
  };

  // Mouse leave
  const handleMouseLeave = () => {
    if (!disable) {
      setHoverRating(0);
    }
  };

  // Handle click
  const handleClick = (rating) => {
    if (!disable) {
      setHoverRating(rating);
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
          style={{pointerEvents: disable ? 'none' : 'auto'}}
          onMouseEnter={() => handleMouseEnter}
          onMouseLeave={() => handleMouseLeave}
          onClick={() => handleClick}
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
