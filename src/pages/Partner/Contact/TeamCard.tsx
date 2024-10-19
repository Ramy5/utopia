import React from "react";
import cn from "../../../utils/cn";
import testImage from "../../../assets/LandingPage/SuccessStories_1.png";

const TeamCard = (teamMember) => {
  const { id, image, name, phoneNumber, email, position } = teamMember;
  return (
    <div
      key={id}
      className={cn(
        "flex flex-col items-center sm:flex-row gap-8 sm:gap-16 mx-4 sm:mx-14 pt-6 pb-2 lg:mx-20 border-t border-[#BEC8CF]"
      )}
    >
      <div>
        <img
          src={testImage}
          alt={name}
          className="w-full h-full rounded-full md:w-36 sm:w-40"
        />
      </div>
      <div className="grid items-start w-full gap-10 sm:gap-16 xl:gap-32 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl">{name}</h3>
          <p className=" text-mainColor">{position}</p>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <p className="text-sm">{email}</p>
          <h3 className="text-sm">{phoneNumber} </h3>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
