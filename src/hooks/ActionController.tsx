"use client";   
import React, { useState, createContext, useContext, ReactNode } from "react";

interface ActionContextProps {
  children: ReactNode;
}
interface ContextProps {
  compressor: boolean;
  setCompressor: (compressor: boolean) => void;
  
}
const ActionController = ({ children }: ActionContextProps) => {
    const [compressor, setCompressor] = useState<boolean>(true);
    const [convert, setConvert] = useState<boolean>(false);
    return (
      <Context.Provider value={{ compressor, setCompressor }}>
        {children}
      </Context.Provider>
    );
};

const Context = createContext<ContextProps>({
  compressor: true,
  setCompressor: (action: boolean) => {},
 
});

const useAction = () => useContext(Context);

export { ActionController, useAction };