import { Footer, Navbar } from "../components";
import { Outlet } from "react-router-dom";

const StructurePages = () => {
  return (
    <div>
      <div className="max-w-full py-4 md:px-8 sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] mx-auto">
        <Navbar />

        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StructurePages;
