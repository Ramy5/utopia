import React from "react";
import DownLoadApp from "../../../components/atoms/molecules/downLoad-app/DownLoadApp";
import UserCard from "./UserCard";

const UserList = () => {
  const userList = [
    {
      id: 1,
      image: "",
      name: "Stacey MaKcre",
      phoneNumber: "00966553136690",
      email: "Stacey@lilaliverpool.com",
      school: "Lila Liverpoll",
    },
    {
      id: 2,
      image: "",
      name: "Jake Daiel",
      phoneNumber: "00966553136690",
      email: "Jake@lilaliverpool.com",
      school: "Lila Liverpoll",
    },
  ];

  return (
    <div>
      <div className="max-w-full my-16 sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 mx-auto">
        {/* LIST OF REQUESTS */}
        <div className="my-6 space-y-4 ">
          {userList?.map((user) => {
            return <UserCard key={user.id} {...user} />;
          })}
        </div>
      </div>
      <DownLoadApp />
    </div>
  );
};

export default UserList;
