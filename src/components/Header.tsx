import React from "react";
import { FaImage } from "react-icons/fa";

function Header() {
  return (
    <header className="w-full  h-14 border-b bg-white border-gray-300 bg-gradient-to-b from-zinc-200">
      <div className="flex justify-between items-center h-full px-4">
        <div className="flex items-center space-x-2 mx-auto">
          <FaImage className="text-2xl" />
          <h1 className="text-2xl font-bold">Image Gallery</h1>
        </div>
      </div>
    </header>
  );
}
export default Header;
