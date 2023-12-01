"use client";

import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "@redux/slices/api";
import { convertTime } from "@utils/convertTime";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  FcPrevious,
  FcNext,
} from "@utils/iconExport";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Orders = () => {
  const [sortBy, setSort] = useState("all");
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [product, setProduct] = useState(null);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [page, setPage] = useState(1);
  
  const router = useRouter();
  useEffect(() => {
    if (data) {
      setProduct(structuredClone(data));
    }
  }, [data]);
  useEffect(() => {
    const filtration = (status) => {
      if (status == "all") {
        return product?.orderList;
      } else {
        return product?.orderList.filter((item) => item.orderStatus === status);
      }
    };
    if (product) setFilteredProduct(filtration(sortBy));
  }, [sortBy, product]);
  const pageHandler = (pageNo) => {
    setPage(pageNo);
  };
  const statusChangeHandler = (e, id) => {
    updateOrderStatus({ id, orderStatus: { orderStatus: e.target.value } })
      .unwrap()
      .then((response) => {
        toast.success(response?.message);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const orderDeleteHandler = (id) => {
    deleteOrder(id)
      .unwrap()
      .then((response) => toast.success(response?.message))
      .catch((error) => console.log(error));
  };
  const skip = page * 10 - 10;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex p-2 shadow-sm drop-shadow-md justify-between">
        <h4 className="text-gray-800 font-semibold">List of orders</h4>
        <div className="flex gap-2">
          <label>Sort By:</label>
          <select
            className="py-1 px-2 rounded-md "
            onChange={(e) => setSort(e.target.value)}
            value={sortBy}
          >
            <option value="all">All</option>
            <option value="processing">Processing</option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
      <div className="align-middle inline-block min-w-full lg:max-h-[80vh] min-h-[80vh]  shadow overflow-x-auto bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Order Id
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredProduct &&
              filteredProduct
                .slice(skip, 10 * Number(page))
                .map((item, index) => {
                  return (
                    <tr>
                      <td
                        onClick={() => router.push(`/admin/orders/${item._id}`)}
                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
                      >
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5 text-gray-800">
                              {skip + 1 + index}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        onClick={() => router.push(`/admin/orders/${item._id}`)}
                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
                      >
                        <div className="text-sm leading-5 text-blue-900">
                          {item.user.name}
                        </div>
                      </td>
                      <td
                        onClick={() => router.push(`/admin/orders/${item._id}`)}
                        className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
                      >
                        {item.user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        {item._id}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <select
                            className="py-1 px-2"
                            onChange={(e) => statusChangeHandler(e, item._id)}
                          >
                            <option
                              value="processing"
                              selected={item.orderStatus === "processing"}
                            >
                              Processing
                            </option>
                            <option
                              value="shipping"
                              selected={item.orderStatus === "shipping"}
                            >
                              Shipping
                            </option>
                            <option
                              value="delivered"
                              selected={item.orderStatus === "delivered"}
                            >
                              Delivered
                            </option>
                          </select>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                        {convertTime(item.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                        <button
                          onClick={() => orderDeleteHandler(item._id)}
                          className="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <div className="flex jusitfy-center w-48 mx-auto gap-2">
        {filteredProduct && (
          <Pagination
            activePage={Number(page)}
            itemsCountPerPage={10}
            pageRangeDisplayed={5}
            totalItemsCount={filteredProduct.length}
            onChange={pageHandler}
            firstPageText={<HiOutlineChevronDoubleLeft />}
            lastPageText={<HiOutlineChevronDoubleRight />}
            prevPageText={<FcPrevious />}
            nextPageText={<FcNext />}
            innerClass="flex text-md font-bold items-center font-bold bg-[#f6f6f6] rounded-sm"
            activeClass="bg-blue-500 text-white"
            itemClass="flex w-9 h-9 items-center border border-blue-300"
            linkClass="mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
