import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  // Fill the stars array with star icons based on the rating
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="text-yellow-400 text-xl">
          &#9733;
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-300 text-xl">
          &#9733;
        </span>
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

export default StarRating;
