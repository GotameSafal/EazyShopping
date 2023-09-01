"use client";
import { RxCross1, FiThumbsUp } from "@utils/iconExport";
import Image from "next/image";
import { FiEdit, FaTrashAlt } from "@utils/iconExport";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const ProductList = ({ data }) => {
  const [show, setshow] = useState(false);
  const router = useRouter();
  const [id, setId] = useState(null);
  const clickHandler = (id) => {
    setshow(true);
    setId(id);
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`,
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success(data?.message);
        setshow(false);
        router.refresh();
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <>
      <div className="container mx-auto p-4 h-[calc(100vh-150px)] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4"></h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="border-b-2">
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 text-left py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Discount</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.product?.map((item, index) => {
                return (
                  <tr className=" border-b" key={index}>
                    <td className=" px-4 text-center py-2">{index + 1}</td>
                    <td className=" px-4 flex justify-center py-2">
                      <Image
                        src={item?.images[0]?.url}
                        alt="Product 1"
                        width={64}
                        height={64}
                        className="mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2">{`${item.name.slice(
                      0,
                      26
                    )}...`}</td>
                    <td className="px-4 text-center py-2">{`Rs ${item.price}`}</td>
                    <td className="px-4 text-center py-2">{`${item.discount}%`}</td>
                    <td className="px-4 text-center py-2">{item.stock}</td>
                    <td className="flex gap-2 justify-center  px-4 py-2">
                      <Link href={`/admin/products/update/${item._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  p-4 rounded-full">
                          <FiEdit />
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold p-4 rounded-full"
                        onClick={() => clickHandler(item._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={`${
          show ? "block" : "hidden"
        } fixed left-[calc(50%-128px)] top-12 w-72 rounded-md bg-[#f6f6f6] px-4 py-2 shadow-sm drop-shadow-sm`}
      >
        <p className="text-center">Do you want to delete this product?</p>
        <div className="flex justify-center gap-2 py-2">
          <button
            onClick={() => setshow(false)}
            className="flex w-24 items-center justify-center gap-2 rounded-md border bg-white py-1 shadow-sm"
          >
            <span className="text-red-500">
              <RxCross1 size={15} />
            </span>
            Cancel
          </button>
          <button
            onClick={() => deleteHandler(id)}
            className="flex items-center w-24 justify-center gap-2 rounded-md border bg-white py-1 shadow-sm"
          >
            <span className="text-green-500">
              <FiThumbsUp size={15} />
            </span>
            Ok
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductList;
