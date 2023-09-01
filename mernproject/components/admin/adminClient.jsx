'use client'
import { useState } from "react";
import AddProductPage from "./AddProduct";

export const ProductBody = ({ children }) => {
  const [show, setShow] = useState(true);
  return (
    <div className="px-4 lg:max-h-[100vh-180px] lg:overflow-auto py-1">
      <div className="flex justify-between items-center py-1">
        <h1 className="text-xl text-gray-500 font-bold">Products</h1>
        <div className="flex gap-3 font-sembold">
          <button
            className={`${
              show && ` bg-gray-400 text-white`
            } w-auto px-2 py-1 text-sm rounded-sm`}
            onClick={() => setShow(true)}
          >
            All
          </button>
          <button
            className={`${
              !show && ` bg-gray-400 text-white`
            } w-auto px-2 py-1 text-sm rounded-sm`}
            onClick={() => setShow(false)}
          >
            Add product
          </button>
        </div>
      </div>
      {show && children}
      {!show && <AddProductPage />}
    </div>
  );
};
