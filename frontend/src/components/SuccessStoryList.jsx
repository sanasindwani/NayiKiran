import React from "react";
import SuccessStoryCard from "./SuccessStoryCard";

const SuccessStoriesList = ({ stories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {stories.map((story, index) => (
        <SuccessStoryCard key={index} story={story} />
      ))}
    </div>
  );
};

export default SuccessStoriesList;