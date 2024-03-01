"use client";   
import { useAction } from "@/hooks/ActionController";
import React, { useState } from "react";
import { FaCompress } from "react-icons/fa";
import { SiConvertio } from "react-icons/si";
import Compressor from "./Compressor";
import Convert from "./Convert";

function ActionMenu() {
    const {compressor, setCompressor } = useAction();

  // Define styles based on the active status
  const compressorButtonStyle = compressor
    ? "bg-green-600"
    : "bg-blue-500 hover:bg-blue-600";

  const converterButtonStyle = compressor
    ? "bg-blue-500 hover:bg-blue-600"
    : "bg-green-600";
    return (
      <>
        <div className="flex w-full px-16 py-3 flex-col gap-5 gap-x-5 items-center md:flex-row">
          <button
            className={`w-1/2 p-2 flex justify-center items-center gap-5 text-white rounded-md ${compressorButtonStyle}`}
            onClick={() => setCompressor(!compressor)}
            disabled={compressor}
          >
            <span>
              <FaCompress className="text-xl" />
            </span>{" "}
            Wanna to Compress?
          </button>
          <button
            className={`w-1/2 p-2 flex justify-center items-center gap-5 text-white rounded-md ${converterButtonStyle}`}
            onClick={() => setCompressor(!compressor)}
            disabled={!compressor}
          >
            <span>
              <SiConvertio className="text-xl" />
            </span>{" "}
            Wanna to Convert?
          </button>
            </div>
            
            {compressor ? <Compressor />:<Convert />}
      </>
    );
}

export default ActionMenu;
