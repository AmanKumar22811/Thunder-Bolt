import { Zap } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";

const Header = () => {
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="p-4 flex justify-between items-center bg-gradient-to-r from-black from-[20%] via-[#5e98c7] via-[50%] to-black to-[80%]">
      <Zap height={40} width={40} />
      {!userDetail?.name && (
        <div className="flex gap-5">
          <Button variant="ghost" className="cursor-pointer bg-gray-700">
            Sign In
          </Button>
          <Button className="cursor-pointer bg-blue-400 text-white">
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
