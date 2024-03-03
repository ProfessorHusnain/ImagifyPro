"use client";
import React, { use, useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import DragAndDrop from "./DragAndDrop";
import Image from "next/image";
import { useAction } from "@/hooks/ActionController";
import { AppName } from "@/lib/Constant";


//JPEG, PNG, WebP, GIF, AVIF and TIFF
const ImageExtension = [
  "jpeg",
  "jpg",
  "png",
  "gif",
  "tiff",
  "webp",
  "avif",
];



function Convert() {
  const [compressedData, setCompressedData] = useState(null);
  const {
    image,
    setImage,
    quality,
    setQuality,
    isUploadedClicked,
    setIsUploadedClicked,
    isServerAction,
    setIsServerAction,
  } = useAction();
  const handleExtentionChange = (e: any) => {
    setExtention(e.target.value);
  };
  const [extention, setExtention] = useState("jpeg");
  const CompressedAgain = () => {
    setCompressedData(null);
  };
  const Downlaod = () => {
    const link = document.createElement("a");
    link.href = `data:image/${extention};base64,${compressedData}`;
    link.download =
      image?.name.split(".")[0] + "_compressed by_" + AppName +"."+ extention;
    document.body.appendChild(link);
    link.click();
    // document.body.removeChild(link);
  };
  const formData = new FormData();

  formData.append("formate", extention);
  if (image != null) {
    formData.append("image", image);
    //formData.append("imageData",URL.createObjectURL(image) );
  }
  const handleUpload = async () => {
    try {
      setIsServerAction(true);
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Image convert successfully");
        setExtention(data.formate)
        setCompressedData(data.image);
      } else {
        console.error(data.message);
        console.error("Image convert failed");
      }
    } catch (error) {
      console.error("Error during image compression:", error);
    } finally {
      setIsServerAction(false);
    }
  };

  return (
    <div
      className={`flex min-h-[70vh]  md:px-8 flex-col items-center ${
        image != null && "md:flex-col"
      } `}
    >
      <div className="flex flex-col items-center text-center p-8">
        <h1 className="text-2xl font-bold">Image Convert</h1>
        <p className="text-gray-500">
          Convert and optimize your images form the web
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
                <span className="flex flex-row justify-between gap-3">
                  <span className="items-center flex flex-row mt-1 gap-2">
                    <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                      {image?.name.split(".")[1]}
                    </kbd>
                    <label htmlFor="extention">To</label>
                  </span>
                  <select
                    id="extention"
                    name="extention"
                    value={extention}
                    onChange={handleExtentionChange}
                    className="p-2 border border-cyan-200 outline-none shadow-md rounded-lg"
                  >
                    {ImageExtension.map((ext, index) => {
                      return (
                        <option key={index} value={ext}>
                          {ext}
                        </option>
                      );
                    })}
                  </select>
                </span>
                <div className="flex flex-col mt-4">
                  <button
                    onClick={handleUpload}
                    className="hover:bg-blue-500 bg-transparent transition-all duration-300 border font-bold  border-black hover:border-transparent p-2 hover:text-white rounded-lg"
                  >
                    Convert
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setCompressedData(null)}
                  className="hover:bg-blue-500 bg-transparent transition-all duration-300 border font-bold  border-black hover:border-transparent p-2 hover:text-white rounded-lg"
                >
                  Convert Again
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
export default Convert;

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
