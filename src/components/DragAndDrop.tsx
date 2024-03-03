"use client";

import { useRef, useState } from "react";
export default function DragAndDrop({
  setFiles,
  files,
  setIsUploadedClicked,
}: {
  setFiles: any;
  files: any;
  setIsUploadedClicked: any;
}) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  function handleChange(e: any) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setFiles(file);
        setIsUploadedClicked(true);
      } else {
        // Handle non-image file error
        const errorMessage = "Please select an image file.";
        setErrorMessage(errorMessage);
        setShowConfirmationModal(true); // Display confirmation modal with error message
      }
    }
  }
  function handleSubmitFile(e: any) {
    e.preventDefault();
    if (files.length === 0) {
      // no file has been submitted
      console.error("Please select a file to submit.");
    } else {
      // write submit logic here
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = e.dataTransfer.files;

      // Filter out non-image files
      const imageFiles:any = Array.from(droppedFiles).filter((file:any) =>
        file.type.startsWith("image/")
      );

      const acceptedFormats = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/avif",
        "image/tiff",
        "image/svg+xml",
      ];
      if (imageFiles.length > 0) {
        const isValidFormat = acceptedFormats.includes(imageFiles[0].type);

        if (isValidFormat) {
          setFiles(imageFiles[0]);
          setIsUploadedClicked(true);
        } else {
          const errorMessage =
            "Unsupported image format. Please upload only JPEG, PNG, WebP, GIF, AVIF, TIFF, or SVG.";
          setErrorMessage(errorMessage);
          setShowConfirmationModal(true); // Display confirmation modal with error message
        }
      } else {
        const errorMessage = "Please drop image files only.";
        setErrorMessage(errorMessage);
        setShowConfirmationModal(true); // Display confirmation modal with error message
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }
  function handleModalConfirmation() {
    setShowConfirmationModal(false); // Hide confirmation modal
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex items-center w-full justify-center">
      <form
        className={`${
          dragActive ? "bg-blue-400" : "bg-blue-100"
        }  p-4 w-11/12 md:w-7/12 rounded-lg  min-h-[20rem] text-center flex flex-col items-center justify-center `}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          onChange={handleChange}
          accept="image/jpeg, image/png, image/webp, image/gif, image/avif, image/tiff, image/svg+xml"
        />

        <p>
          Drag & Drop file
          <br />
          <span className="font-bold text-blue-600 cursor-pointer">
            <kbd>or</kbd>
          </span>{" "}
        </p>

        <button
          className="bg-black rounded-lg p-2 mt-3 w-auto"
          onClick={openFileExplorer}
        >
          <span className="p-2 text-white">Upload Image</span>
        </button>
      </form>
      {showConfirmationModal && (
        <ConfirmationModel
          errorMessage={errorMessage}
          handleModalConfirmation={handleModalConfirmation}
        />
      )}
    </div>
  );
}

const ConfirmationModel = ({ errorMessage, handleModalConfirmation }: any) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={handleModalConfirmation}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {errorMessage}
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleModalConfirmation}
            >
              Okay, sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
/**
 * 
 loader{
 width: 100px;
 height: 100px;
 position: absolute;
  top: 50%;
  left: 50%;
  margin: -20px -50px;
 }
 loader div{
  width: 20px;
  height: 20px;
  background: #000;
  border-radius: 50%;
  position: absolute;
 }
 #div1{
  animation: animate 2s linear infinite;
 }
 #div2{
  animation: animate 2s linear infinite -.4s;
 }
 #div3{
  animation: animate 2s linear infinite -.8s;
 }
 #div4{
  animation: animate 2s linear infinite -1.2s;
 }
 #div5{
  animation: animate 2s linear infinite -1.6s;
 }
 @-webkit-keyframes animate{
 0%{
 left:100px;
 top:0;
 }
 80%{
  left:0;
  top:0;
  }
  85%{
  left:0;
  top:-20px;
  width:20px;
  height:20px;
  }
  90%{
  left:100px;
  top:-20px;
  width:20px;
  height:20px;
  }
  100%{
  left:100px;
  top:0;
  }
  }
 */