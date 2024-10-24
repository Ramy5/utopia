import React from "react";
import DownLoadApp from "../../../components/atoms/molecules/downLoad-app/DownLoadApp";
import UserCard from "./UserCard";
import { apiRequest } from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";

const UserList = () => {
  const fetchUserData = async () => {
    try {
      const data: any = await apiRequest({
        url: `/api/partner/partner-users`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: usersData } = useQuery({
    queryKey: ["partner_usersData"],
    queryFn: fetchUserData,
    suspense: true,
  });
  console.log("🚀 ~ BookingList ~ usersData:", usersData);
  const userList = usersData?.map((item) => ({
    id: item?.id,
    image: item?.image,
    name: item?.name,
    phoneNumber: item?.phone,
    email: item?.email,
    school: item?.school,
  }));

  console.log("🚀 ~ userListx ~ userListx:", userList);

  // const userList = [
  //   {
  //     id: usersData?.id,
  //     image: usersData?.image,
  //     name: "Stacey MaKcre",
  //     phoneNumber: "00966553136690",
  //     email: "Stacey@lilaliverpool.com",
  //     school: "Lila Liverpoll",
  //   },
  //   {
  //     id: 2,
  //     image: "",
  //     name: "Jake Daiel",
  //     phoneNumber: "00966553136690",
  //     email: "Jake@lilaliverpool.com",
  //     school: "Lila Liverpoll",
  //   },
  // ];

  return (
    <div>
      <div className="max-w-full md:my-16 sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 mx-auto">
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
