import { Footer, Navbar } from "../components";
import { Outlet } from "react-router-dom";
import PartnerNavbar from "../components/Global/Navbar/PartnerNavbar";
import { ROLE } from "../constants/LocalStorageKeys";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const StructurePages = () => {
  const { role } = useAuth();

  return (
    <div>
      <div>
        <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] mx-auto">
          {role === "Partner" ? <PartnerNavbar /> : <Navbar />}
        </div>

        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StructurePages;
