"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ListofOrderedProduct } from "@components/clients";
import { toast } from "react-hot-toast";
const Order = () => {
  const [orderedProduct, setOrderedProduct] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/me/order`,
          { withCredentials: true }
        );
        if (data?.success) setOrderedProduct(data?.order);
      } catch (err) {
        toast.error('something went wrong try again later')
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="lg:w-[80%] mx-auto">
      {orderedProduct ? (
        <ListofOrderedProduct orderData={orderedProduct} />
      ) : (
        <div className="my-3 flex justify-center text-center">
          <p>No any product</p>
        </div>
      )}
    </div>
  );
};

export default Order;
