"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";

interface ActionContextProps {
  children: ReactNode;
}
interface ContextProps {
  compressor: boolean;
  isUploadedClicked: boolean;
  image: File | null;
  quality: number;
  isServerAction: boolean;

  setIsServerAction: (isServerAction: boolean) => void;
  setCompressor: (compressor: boolean) => void;
  setIsUploadedClicked: (isUploadedClicked: boolean) => void;
  setImage: (image: File) => void;
  setQuality: (quality: number) => void;
}
const ActionController = ({ children }: ActionContextProps) => {
  const [compressor, setCompressor] = useState<boolean>(true);
  const [convert, setConvert] = useState<boolean>(false);
  const [isUploadedClicked, setIsUploadedClicked] = useState<boolean>(false);
  const [isServerAction, setIsServerAction] = useState<boolean>(false);

  const [image, setImage] = useState<File | null>(null); // Update the type of `image` state

  const [quality, setQuality] = useState(100);
  return (
    <Context.Provider
      value={{
        compressor,
        image,
        quality,
        isUploadedClicked,
        setIsUploadedClicked,
        isServerAction,
        setIsServerAction,
        setImage,
        setQuality,
        setCompressor,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const Context = createContext<ContextProps>({
  compressor: true,
  isUploadedClicked: false,
  image: null,
  quality: 100,
  isServerAction: false,
  setIsServerAction: (action: boolean) => {},
  setIsUploadedClicked: (action: boolean) => {},
  setCompressor: (action: boolean) => {},
  setImage: (image: File) => {},
  setQuality: (quality: number) => {},
});

const useAction = () => useContext(Context);

export { ActionController, useAction };
