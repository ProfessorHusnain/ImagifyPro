"use client";
import React, { use, useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import DragAndDrop from "./DragAndDrop";
import Image from "next/image";
import { useAction } from "@/hooks/ActionController";
import { AppName } from "@/lib/Constant";

function Compressor() {
  const [compressedData, setCompressedData] = useState(null);
  const {
    image,
    setImage,
    quality,
    setQuality,
    isUploadedClicked,
    setIsUploadedClicked,
  } = useAction();
  const handleQualityChange = (e: any) => {
    setQuality(Number(e.target.value));
  };
  const CompressedAgain = () => {
    setCompressedData(null);
  };
  const Downlaod = () => {
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${compressedData}`;
    link.download =
      image?.name.split(".")[0] + "_compressed by_" + AppName + ".jpeg";
    document.body.appendChild(link);
    link.click();
    // document.body.removeChild(link);
  };
  const formData = new FormData();

  formData.append("quality", String(quality));
  if (image != null) {
    formData.append("image", image);
    //formData.append("imageData",URL.createObjectURL(image) );
  }
  const handleUpload = async () => {
    try {
      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Image compressed successfully");
        console.log(data);
        setCompressedData(data.image);
      } else {
        console.error(data.message);
        console.error("Image compression failed");
      }
    } catch (error) {
      console.error("Error during image compression:", error);
    }
  };

  return (
    <div
      className={`flex justify-between  md:px-8 flex-col items-center ${
        image != null && "md:flex-col"
      } `}
    >
      <div className="flex flex-col items-center text-center p-8">
        <h1 className="text-2xl font-bold">Image Compressor</h1>
        <p className="text-gray-500">
          Compress and optimize your images form the web
        </p>
      </div>
      {!isUploadedClicked ? (
        <DragAndDrop
          files={image}
          setFiles={setImage}
          setIsUploadedClicked={setIsUploadedClicked}
        />
      ) : (
        <div className="flex flex-col gap-y-3  items-center md:flex-row w-full justify-between pb-48">
          <UploadedImage files={image} />
          <div className="flex flex-col justify-around">
            {compressedData == null ? (
              <>
                <span className="flex flex-col">
                  <label htmlFor="quality">Select Image Quality:</label>
                  <select
                    id="quality"
                    name="quality"
                    value={quality}
                    onChange={handleQualityChange}
                    className="p-2 border border-cyan-200 outline-none shadow-md rounded-lg mt-2"
                  >
                    <option value={100}>100%</option>
                    <option value={75}>75%</option>
                    <option value={50}>50%</option>
                    <option value={25}>25%</option>
                  </select>
                </span>
                <div className="flex flex-col mt-4">
                  <button
                    onClick={handleUpload}
                    className="hover:bg-blue-500 bg-transparent transition-all duration-300 border font-bold  border-black hover:border-transparent p-2 hover:text-white rounded-lg"
                  >
                    Compress
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setCompressedData(null)}
                  className="hover:bg-blue-500 bg-transparent transition-all duration-300 border font-bold  border-black hover:border-transparent p-2 hover:text-white rounded-lg"
                >
                  Compress Again
                </button>
                <button
                  onClick={() => Downlaod()}
                  className="hover:bg-blue-500 bg-transparent transition-all duration-300 border font-bold  border-black hover:border-transparent p-2 hover:text-white rounded-lg"
                >
                  Download
                </button>
              </div>
            )}
          </div>

          {compressedData != null ? (
            <CompressedImage files={compressedData} />
          ) : (
            <DummyImage />
          )}
        </div>
      )}
    </div>
  );
}
export default Compressor;

const UploadedImage = ({ files }: any) => {
  return (
    <div className="flex px-7 md:px-0 md:w-1/3">
      <Image
        src={URL.createObjectURL(files)}
        alt="preview"
        width={500}
        height={500}
        quality={100}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

const CompressedImage = ({ files }: any) => {
  return (
    <div className="flex px-7 md:px-0 md:w-1/3">
      <Image
        src={`data:image/jpeg;base64,${files}`}
        alt="preview"
        width={500}
        height={500}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

const DummyImage = () => {
  return (
    <div className="flex w-1/2 md:w-1/3">
      <Image
        src={"/Download.png"}
        alt="preview"
        width={500}
        height={500}
        quality={100}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};
