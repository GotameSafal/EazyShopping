"use client";
import {
  RxCross1,
  FiThumbsUp,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  FcPrevious,
  FcNext,
} from "@utils/iconExport";
import Image from "next/image";
import { FiEdit, FaTrashAlt } from "@utils/iconExport";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { ProductBody } from "@components/admin/adminClient";
import Pagination from "react-js-pagination";
import {
  useDeleteProductMutation,
  useGetProductByPageQuery,
} from "@redux/slices/api";
const Page = () => {
  const [show, setshow] = useState(false);
  const [id, setId] = useState(null);
  const [page, setPage] = useState(1);
  const { data: product, isLoading } = useGetProductByPageQuery(page);
  const [deleteProduct] = useDeleteProductMutation();
  const clickHandler = (id) => {
    setshow(true);
    setId(id);
  };

  const deleteHandler = async (id) => {
    deleteProduct(id)
      .unwrap()
      .then((response) => {
        toast.success(response?.message);
        setshow(false);
      })
      .catch((error) => console.error(error));
  };

  const productIndex = page * 10 - 10 + 1;
  console.log(product);
  if (isLoading) return <div>Loading...</div>;
  return (
    <ProductBody>
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
              {product?.product?.map((item, index) => {
                return (
                  <tr className=" border-b" key={index}>
                    <td className=" px-4 text-center py-2">
                      {productIndex + index}
                    </td>
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
                        className={`bg-red-500 hover:bg-red-700 text-white font-bold p-4 rounded-full`}
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
      <div className="flex jusitfy-center w-48 mx-auto gap-2">
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          pageRangeDisplayed={5}
          totalItemsCount={product?.total}
          onChange={(pageNumber) => setPage(pageNumber)}
          firstPageText={<HiOutlineChevronDoubleLeft />}
          lastPageText={<HiOutlineChevronDoubleRight />}
          prevPageText={<FcPrevious />}
          nextPageText={<FcNext />}
          innerClass="flex text-md font-bold items-center font-bold bg-[#f6f6f6] rounded-sm"
          activeClass="bg-blue-500 text-white"
          itemClass="flex w-9 h-9 items-center border border-blue-300"
          linkClass="mx-auto"
        />
      </div>
    </ProductBody>
  );
};
export default Page;
