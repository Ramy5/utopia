import React from "react";
import cn from "../../../utils/cn";
import testImage from "../../../assets/user11.png";

const UserCard = (user) => {
  const { id, image, name, phoneNumber, email, school } = user;
  return (
    <div>
      {/* DESKTOP */}
      <div
        key={id}
        className={cn(
          "md:flex hidden  flex-col items-center sm:flex-row gap-8 sm:gap-16 mx-4 pt-6 pb-2 xl:mx-20 border-t border-[#BEC8CF]"
        )}
      >
        <div>
          <img
            src={testImage}
            alt={name}
            className="w-full h-full rounded-xl md:w-36 sm:w-40"
          />
        </div>
        <div className="flex flex-col justify-between gap-12">
          <div>
            <div className="flex items-center justify-between"></div>
            <div className="grid items-start gap-10 sm:gap-16 xl:gap-32 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      {/* MOBILE */}
      <div
        key={id}
        className={cn("flex md:hidden gap-4 p-2  mx-4 pt-6 shadow-lg")}
      >
        <div>
          <img src={testImage} alt={name} className="w-32 h-full" />
        </div>
        <div className="">
          <div>
            <div className="flex"></div>
            <div className="grid items-start gap-2">
              <h3 className="text-xl">{name}</h3>
              <div className="flex gap-2">
                <h3 className="">school</h3>
                <p className="text-mainColor">{school}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#AEAAAE]">{email}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#AEAAAE]">{phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
