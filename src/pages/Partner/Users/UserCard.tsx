import React from "react";
import cn from "../../../utils/cn";
import testImage from "../../../assets/LandingPage/SuccessStories_1.png";

const UserCard = (user) => {
  const { id, image, name, phoneNumber, email, school } = user;
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
      <div className="flex flex-col justify-between gap-12">
        <div>
          <div className="flex items-center justify-between"></div>
          <div className="grid items-start gap-10 sm:gap-16 xl:gap-32 lg:grid-cols-3 xl:grid-cols-4">
            <h3 className="text-xl">{name}</h3>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm text-mainColor">Phone Number</h3>
              <p className="">{phoneNumber}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm text-mainColor">Email </h3>
              <p className="">{email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm text-mainColor">school</h3>
              <p className="">{school}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
