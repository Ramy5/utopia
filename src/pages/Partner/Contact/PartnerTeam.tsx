import React from "react";
import TeamCard from "./TeamCard";

const PartnerTeam = () => {
  const memberList = [
    {
      id: 1,
      image: "",
      name: "Ahmed Aljawy",
      phoneNumber: "096 5503036690",
      position: "CEO",
      email: "Ahmed@utopia.com",
    },
    {
      id: 2,
      image: "",
      name: "Marium Mohammed",
      position: "Inrenatinal Sales Manager",
      phoneNumber: "096 5503036690",
      email: "M.Mohammed@utopia.com",
    },
    {
      id: 3,
      image: "",
      name: "Ahmed Salem",
      phoneNumber: "096 5503036690",
      position: "International Sales Manager",
      email: "A.salem@utopia.com",
    },
  ];

  return (
    <div>
      {/* DESKTOP */}
      <div className="hidden md:flex bg-[#F7F7F7] max-w-full sm:max-w-5xl flex-col justify-between items-center md:max-w-6xl lg:max-w-[80rem] p-24 rounded-[150px] shadow-lg mx-auto h-[85vh] my-8 mb-20">
        <div className="w-full my-6 space-y-4">
          {memberList?.map((teamMember) => {
            return <TeamCard key={teamMember.id} {...teamMember} />;
          })}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden max-w-full sm:max-w-5xl flex-col justify-between items-center md:max-w-6xl lg:max-w-[80rem]  mx-auto my-8 mb-20">
        <div className="w-full my-6 space-y-4">
          {memberList?.map((teamMember) => {
            return <TeamCard key={teamMember.id} {...teamMember} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PartnerTeam;
