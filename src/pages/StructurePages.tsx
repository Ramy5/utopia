import { Footer, Navbar } from "../components";
import { Outlet } from "react-router-dom";

const StructurePages = () => {
  return (
    <div>
      <div>
        <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] mx-auto">
          <Navbar />
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
