import { AppName } from "@/lib/Constant";
import React from "react";
import { FaImage } from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-white shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between dark:text-white">
          {/* <a
            href={`http://${domain}`}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
  >*/}
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <FaImage className="text-2xl" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              {AppName}
            </span>
          </div>
          {/*</a>*/}
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          {/*<a href={`https://${domain}`} className="hover:underline">
            {AppName}™
</a>*/}
          {AppName}™ . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
