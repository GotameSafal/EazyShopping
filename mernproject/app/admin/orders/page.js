"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { convertTime } from "@utils/convertTime";
import Pagination from "react-js-pagination";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  FcPrevious,
  FcNext,
} from "@utils/iconExport";
import { useRouter } from "next/navigation";
const page = () => {
  const [orders, setOrders] = useState(null);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [orderStatus, setOrderStatus] = useState({});
  const [sortBy, setSortBy] = useState("all");
  const [page, setPage] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/orders`,
          { withCredentials: true }
        );
        if (data?.success) {
          setOrders(data?.orderList);
          setFilteredProduct(data?.orderList);
        }
      } catch (err) {
        toast.error('something went wrong later try again later')
      }
    };
    fetchOrders();
  }, [orderStatus]);

  const statusChangeHandler = async (event, id) => {
    const { value } = event.target;

    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/order/update/${id}`,
        { orderStatus: value },
        { withCredentials: true }
      );
      if (data?.success) toast.success(data?.message);
    } catch (err) {
      console.log(err);
    }
    setOrderStatus({ id: id, value });
  };

  const changeHandler = (e) => {
    setSortBy(e.target.value);
    filterProducts(e.target.value);
  };
  const filterProducts = (status) => {
    switch (status) {
      case "all":
        setFilteredProduct(orders);
        break;
      case "processing":
        setFilteredProduct(
          orders?.filter((item) => item.orderStatus === "processing")
        );
        break;
      case "shipping":
        setFilteredProduct(
          orders?.filter((item) => item.orderStatus === "shipping")
        );
        break;
      case "delivered":
        setFilteredProduct(
          orders?.filter((item) => item.orderStatus === "delivered")
        );
        break;
      default:
        setFilteredProduct(orders);
    }
  };
  const pageHandler = (pageNumber) => {
    setPage(pageNumber);
  };
  const skip = Number(page) * 10 - 10;
  const tableNumbering = Number(page) * 10 - 9;

  const clickHandler = (id) => {
    router.push(`/admin/orders/${id}`);
  };
  if (!filteredProduct) {
    return (
      <div className="flex justify-center w-full h--screen items-center">
        <p className="text-lg font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full" style={{minHeight:'calc(100vh - 155px)'}}>
      <div className="lg:m-4 m-2 flex justify-between items-center shadow-lg p-3">
        <h3 className="text-[gray] font-semibold">List of Orders</h3>
        <select
          name="sortBy"
          className=" px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={sortBy}
          onChange={changeHandler}
        >
          <option className="text-gray-900" value="all">
            all
          </option>
          <option className="text-gray-900" value="processing">
            processing
          </option>
          <option className="text-gray-900" value="shipping">
            shipping
          </option>
          <option className="text-gray-900" value="delivered">
            delevered
          </option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="border-b-2">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 text-left py-2">Email</th>
              <th className="px-4 py-2">OrderId</th>
              <th className="px-4 py-2">totalPrice</th>
              <th className="px-4 py-2">OrderStatus</th>
              <th className="px-4 py-2">CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {filteredProduct
              .reverse()
              .slice(skip, page * 10)
              .map((product, index) => {
                return (
                  <tr className="border-b" key={index}>
                    <td className=" px-4 text-center py-2">
                      {tableNumbering + index}
                    </td>
                    <td
                      onClick={() => {
                        clickHandler(product?._id);
                      }}
                      className=" px-4 flex justify-center py-2"
                    >
                      {product?.user?.name}
                    </td>
                    <td
                      onClick={() => {
                        clickHandler(product?._id);
                      }}
                      className="px-4 py-2"
                    >
                      {product?.user?.email}
                    </td>
                    <td className="px-4 text-center py-2">{product?._id}</td>
                    <td
                      onClick={() => {
                        clickHandler(product?._id);
                      }}
                      className="px-4 text-center py-2"
                    >
                      {product?.totalPrice}
                    </td>

                    <td className="px-4 text-center py-2">
                      {
                        <select
                          onChange={(e) => statusChangeHandler(e, product?._id)}
                          name="orderStatus"
                          className="py-1 px-2"
                        >
                          <option
                            value="processing"
                            selected={product?.orderStatus === "processing"}
                          >
                            processing
                          </option>
                          <option
                            value="shipping"
                            selected={product?.orderStatus === "shipping"}
                          >
                            shipped
                          </option>
                          <option
                            value="delivered"
                            selected={product?.orderStatus === "delivered"}
                          >
                            delivered
                          </option>
                        </select>
                      }
                    </td>
                    <td className="px-4 text-center py-2">
                      {convertTime(product?.createdAt.toString())}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex jusitfy-center w-48 mx-auto gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default page;
