import { ReactNode } from "react";

interface MainPopup_TP {
  children: ReactNode;
  className: string;
}

const MainPopup: React.FC<MainPopup_TP> = ({ children, className }) => {
  return (
    <div
      className={`bg-mainColor text-white p-6 ${className} rounded-2xl text-center`}
    >
      {children}
    </div>
  );
};

export default MainPopup;
