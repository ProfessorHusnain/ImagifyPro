"use client";
import { useAction } from "@/hooks/ActionController";
import React, { useState } from "react";
import { FaCompress } from "react-icons/fa";
import { SiConvertio } from "react-icons/si";
import Compressor from "./Compressor";
import Convert from "./Convert";

function ActionMenu() {
  const { compressor, isUploadedClicked, setIsUploadedClicked, setCompressor } =
    useAction();

  // Define styles based on the active status
  const compressorButtonStyle = compressor
    ? "bg-green-600"
    : "bg-blue-500 hover:bg-blue-600";

  const converterButtonStyle = compressor
    ? "bg-blue-500 hover:bg-blue-600"
    : "bg-green-600";
  const handleCompressor = () => {
    setCompressor(!compressor);
    setIsUploadedClicked(false);
  };
  return (
    <>
      <div className="flex w-full px-2 md:px-16 py-3 flex-col gap-5 gap-x-5 items-center md:flex-row">
        <button
          className={`md:w-1/2 p-2 flex justify-center items-center gap-5 text-white rounded-md ${compressorButtonStyle}`}
          onClick={() => handleCompressor()}
          disabled={compressor}
        >
          <span>
            <FaCompress className="text-xl" />
          </span>{" "}
          Wanna Compress?
        </button>
        <button
          className={`md:w-1/2  p-2 flex justify-center items-center gap-5 text-white rounded-md ${converterButtonStyle}`}
          onClick={() => handleCompressor()}
          disabled={!compressor}
        >
          <span>
            <SiConvertio className="text-xl" />
          </span>{" "}
          Wanna Convert?
        </button>
      </div>

      {compressor ? <Compressor /> : <Convert />}
    </>
  );
}

export default ActionMenu;
