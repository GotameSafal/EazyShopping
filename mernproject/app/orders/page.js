"use client";
import { ListofOrderedProduct } from "@components/clients";
import { useGetMyOrdersQuery } from "@redux/slices/api";
import { useRouter } from "next/navigation";
const Order = () => {
  const { data: orderedProduct, isLoading } = useGetMyOrdersQuery();
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  if (orderedProduct?.order.length === 0) {
    return (
      <div className="h-screen text-2xl font-bold w-screen flex justify-center items-center">
        No any product
        <button className="py-1 px-2 rounded-md border-blue" onClick={() => router.push("/")}>Go back</button>
      </div>
    );
  }
  return (
    <div className="lg:w-[80%] mx-auto">
      {orderedProduct && (
        <ListofOrderedProduct orderData={orderedProduct.order} />
      )}
    </div>
  );
};

export default Order;
