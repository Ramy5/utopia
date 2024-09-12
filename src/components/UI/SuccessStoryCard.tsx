import React from "react";

export interface SuccessStoryCardProps {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({
  name,
  location,
  description,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col items-center w-full p-4 mb-4 rounded-lg shadow-md bg-mainColor/40 md:flex-row md:max-w-2xl">
      <div className="flex items-center justify-between w-full mb-2">
        <div>
          <h2 className="mb-2 text-xl font-semibold">{name}</h2>
          <p className="text-sm text-black">{location}</p>
        </div>
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full md:w-16 md:h-16 md:mr-4 md:mb-0"
        />
      </div>
      <p className="text-gray-800">{description}</p>
    </div>
  );
};

export default SuccessStoryCard;
