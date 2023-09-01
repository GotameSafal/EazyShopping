"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetAddress, ShippingConfirm } from "@components/clients";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "@utils/iconExport";
import { updateUserOnGlobalStore } from "@utils/getUser";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { reassignToCart } from "@redux/slices/cartSlice";
import axios from "axios";
const page = () => {
  useEffect(() => {
    let products = localStorage.getItem("cart") || "[]";
    dispatch(reassignToCart(JSON.parse(products)));
  }, []);

  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const params = useSearchParams().get("pidx");
  const cartitems = useSelector((state) => state.cartSection);
  const cart = cartitems.cart.filter((item) => item.quantity > 0).slice(0, 2);
  const user = useSelector((state) => state.configUser.user);
  const router = useRouter()
  useEffect(() => {
    const checkPayment = async () => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/khalti-lookup`,
        { pidx: params },
        { withCredentials: true }
      );
     
      if (data?.data?.status === "Completed") {
        toast.success("Payment successful");
        toast.success("Order placed");
        let finalOrderinProductsDetail = {
          ...JSON.parse(localStorage.getItem("confirmedProduct")),
          paymentInfo: { id: data?.data?.transaction_id, status: "paid" },
        };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/new`,
          finalOrderinProductsDetail,
          { withCredentials: true }
        );
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          dispatch(
            reassignToCart(cartitems.cart?.filter((item) => item.quantity === 0))
          )
          router.replace('/shipping')
        }
        
      }
    };

    if (params) {
      checkPayment();
    } else {
      localStorage.removeItem("confirmedProduct");
    }
  }, [params]);
  const deleteHandler = async (addressId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/me/address/${addressId}`,
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success(data?.message);
        await updateUserOnGlobalStore(dispatch);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const radioChangeHandler = (ind) => {
    setSelectedLocation(user?.address[ind]);
  };

  return (
    <section className="lg:w-4/5 lg:mx-auto lg:p-0 p-2 lg:grid lg:grid-cols-12 lg:gap-4">
      <div className="lg:col-span-8  flex flex-col gap-3">
        <SetAddress />
        <div className="shadow-md drop-shadow-md rounded-md p-3 my-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-900">Addresses</h2>
            <p className="text-gray-800">Choose existing addresses</p>
          </div>
          {user?.address?.map((address, ind) => {
            return (
              <div className="bg-[#f6f6f6] mb-2 p-2 rounded-sm flex  gap-4">
                <input
                  type="radio"
                  className="w-4 h-4 "
                  id={address?.username + ind}
                  name="addressList"
                  onChange={(e) => radioChangeHandler(ind)}
                />
                <div className="flex items-center w-full px-2 justify-between">
                  <div>
                    <label
                      className="font-lg font-semibold"
                      htmlFor={address?.username + ind}
                    >
                      {address?.username}
                    </label>
                    <p>{address?.zipPostalCode}</p>
                    <p>{address?.phoneNo}</p>
                    <p>{address?.city}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => deleteHandler(address?._id)}
                      className="w-24 border py-1 px-2 rounded-sm text-sm text-red-500  bg-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="shadow-md drop-shadow-md rounded-md p-3 my-3">
          <h2 className="text-lg font-semibold text-gray-900">Pay via</h2>
          <div className="my-1 flex gap-x-3">
            <Image
              className={`${
                paymentMethod === "cash" ? "border-4 border-blue-400" : ""
              } rounded-sm`}
              width={70}
              height={50}
              src={"https://res.cloudinary.com/dzat8mbl6/image/upload/v1693553632/cashOnDelivery_tcyv5b.avif"}
              alt="cash on delivery"
              onClick={() => setPaymentMethod("cash")}
            />
            <Image
              className={`${
                paymentMethod === "khalti" ? "border-4 border-blue-400" : ""
              } rounded-sm`}
              width={130}
              height={50}
              src={"https://res.cloudinary.com/dzat8mbl6/image/upload/v1693553631/khalti_kfdjdi.png"}
              alt="khati pay"
              onClick={() => setPaymentMethod("khalti")}
            />
          </div>
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="drop-shadow-md rounded-md w-full gap-2 py-2 px-3 flex flex-col shadow-md">
          {cart?.map((product, index) => {
            return (
              <div className="flex gap-2">
                <Image
                  src={product.images}
                  alt={"image.jpg"}
                  width={30}
                  height={30}
                />
                <div>
                  <h2>{product.name.slice(0, 25).concat("...")}</h2>
                  <p className="flex gap-x-2">
                    quantity: <span>{product.quantity}</span>
                  </p>
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-end">
            <Link className="flex items-center gap-2" href="/cart">
              more <HiOutlineArrowLongRight size={20} />
            </Link>
          </div>
        </div>
        <ShippingConfirm
          address={selectedLocation}
          paymentMethod={paymentMethod}
        />
      </div>
    </section>
  );
};

export default page;
