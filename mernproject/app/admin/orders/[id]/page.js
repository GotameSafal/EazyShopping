"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { convertTime } from "@utils/convertTime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetUserSingleOrderQuery } from "@redux/slices/api";
const page = ({ params }) => {
  // const [orderedProduct, setOrderedProduct] = useState("");
  // const [fetchError, setFetchError] = useState("");
  const { data, isLoading, isError } = useGetUserSingleOrderQuery(params.id);
  const router = useRouter();

  // useEffect(() => {
  //   const getOrderedProduct = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/order/${params.id}`,
  //         {
  //           withCredentials: true,
  //         }
  //       );

  //       setOrderedProduct(data.order);
  //     } catch (error) {
  //       setFetchError("Something went wrong please try again");
  //     }
  //   };
  //   getOrderedProduct();
  // }, []);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Something went wrong try again later
      </div>
    );
  }
  const orderedTime = convertTime(data?.order?.createdAt);
  let tableHeadClassStyle =
    "bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase";
  return (
    <section
      className="flex flex-col px-4 gap-4 py-2"
      style={{ minHeight: "calc(100vh - 250px)" }}
    >
      <div className="flex gap-y-1 gap-x-3 flex-col border-b-2 border-gray-400 py-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">User Details</h2>
          <p className="flex items-center gap-2">
            Status :
            <span className="py-1 px-3 border rounded-md ">
              {data?.order?.orderStatus}
            </span>
          </p>
        </div>
        <div className="ps-4 text-sm">
          <p>{params.id}</p>
          <p>{data?.order?.user?.name}</p>
          <p>{data?.order?.user?.email}</p>
          <p>{orderedTime}</p>
        </div>
      </div>
      <section class="bg-blueGray-50 py-1">
        <h2 className="font-semibold text-gray-700 py-4">
          Ordered product list
        </h2>
        <div class="block w-full overflow-x-auto">
          <table class="w-full border-collapse items-center bg-transparent">
            <thead>
              <tr>
                <th class={`${tableHeadClassStyle}`}>Name</th>
                <th class={`${tableHeadClassStyle}`}>Price</th>
                <th class={`${tableHeadClassStyle}`}>Quantity</th>
                <th class={`${tableHeadClassStyle}`}>Image</th>
                <th class={`${tableHeadClassStyle}`}>ProductId</th>
              </tr>
            </thead>
            <tbody>
              {data?.order?.orderItems?.map((product, index) => {
                return (
                  <tr key={index} className="py-1 border-b-2 border-gray-700">
                    <th class="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 py-1 px-6 text-left align-middle">
                      {product?.name.slice(0, 20).concat("...")}
                    </th>
                    <td class="whitespace-nowrap border-l-0 border-r-0 border-t-0 py-1 px-6 align-middle ">
                      {`Rs ${product?.price}`}
                    </td>
                    <td class="align-center whitespace-nowrap border-l-0 border-r-0 border-t-0 py-1 px-6 ">
                      {product?.quantity}
                    </td>
                    <td class="whitespace-nowrap border-l-0 border-r-0 border-t-0 py-1 px-6 align-middle">
                      <Image
                        src={product?.images}
                        alt="image.webp"
                        width={45}
                        height={50}
                      />
                    </td>
                    <td class="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle">
                      {product?.product}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-blueGray-100 border-b-2 overflow-x-hidden">
                <th
                  colSpan={4}
                  class="text-blueGray-700 whitespace-nowrap py-3 px-6 text-left align-middle text-md"
                >
                  Total:
                </th>
                <td className="px-6 py-3">{`Rs ${data?.order?.totalPrice}`}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      <div className="flex justify-end items-center">
        <button
          onClick={() => router.push("/admin/orders")}
          className="py-1 px-2 rounded-md border-gray-400 border border-solid"
        >
          Go back
        </button>
      </div>
    </section>
  );
};

export default page;
