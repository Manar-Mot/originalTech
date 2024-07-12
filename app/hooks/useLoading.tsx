"use client"
import React, { createContext, useContext, useState } from "react";

interface LoadingContextProps {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}
interface Props {
  [propsName: string]: any;
}
const LoadingContext = createContext<LoadingContextProps | null>(null);
export const LoadingProvider = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, startLoading, stopLoading }}
      {...props}
    />
  );
};

export const useLoading = () => {
  const loadingContext = useContext(LoadingContext);
  if (!loadingContext)
    throw new Error("useLoading must be used within a LoadingContextProvider");
  return loadingContext;
};
