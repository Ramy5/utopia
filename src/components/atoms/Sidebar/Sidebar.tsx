import { ReactNode } from "react";

interface Sidebar_TP {
  children: ReactNode;
  className?: string;
}

const Sidebar: React.FC<Sidebar_TP> = ({ children, className }) => {
  return (
    <div
      className={`${className} w-full h-full fixed top-0 z-30 left-0 bg-white py-2 px-4`}
    >
      <div>{children}</div>
    </div>
  );
};

export default Sidebar;