"use client";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  removeCartItem,
  addColor,
  increaseQuantity,
  decreaseQuantity,
  addSizes,
  reassignToCart,
} from "@redux/slices/cartSlice";
import Link from "next/link";
import styles from "@styles/product.module.scss";
import { caluculatePrice } from "@utils/calculatePrice";
import { useEffect } from "react";
const CartPage = () => {
  const shoppingCart = useSelector((state) => state.cartSection);
  const cartItems = shoppingCart?.cart || [];
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    let products = localStorage.getItem("cart") || "[]";
    dispatch(reassignToCart(JSON.parse(products)));
  }, []);
  const removeCart = (id) => {
    dispatch(removeCartItem(id));
    toast.success("Item remove from cart");
  };

  const clickHandler = () => {
    if (cartItems.length > 0) {
      document.body.style.overflow = "hidden";
      router.push("/shipping");
      return;
    }
    toast.error("Please add atleast 1 item to cart and request again");
  };

  const handleColorClick = (color, ind) => {
    let newColor = null;

    if (cartItems[ind].selectedColors.includes(color)) {
      // If color is already selected, remove it from the selectedColors array
      newColor = selectedColors.filter((c) => c !== color);
    } else {
      // If color is not selected, add it to the selectedColors array
      newColor = [...cartItems.colors, color];
    }
    dispatch(addColor({ ind, newColor }));
  };

  const handleCheckboxChange = (event, ind) => {
    const { value } = event.target;
    let newSizes = null;
    if (cartItems[ind].selectedSizes.includes(value)) {
      newSizes = cartItems[ind].selectedSizes.filter((s) => s !== value);
    } else {
      newSizes = [...cartItems[ind].selectedSizes, value];
    }
    dispatch(addSizes({ ind, newSizes }));
  };

  const increment = (ind) => {
    if (cartItems[ind]?.quantity >= 5) return;
    const quantity = cartItems[ind].quantity + 1;
    dispatch(increaseQuantity({ ind, quantity }));
  };

  const decrement = (ind) => {
    if (cartItems[ind].quantity === 0) return;
    const quantity = cartItems[ind].quantity - 1;
    dispatch(decreaseQuantity({ ind, quantity }));
  };
  const { costWithVat, shipping, total, vat } = caluculatePrice(shoppingCart);
  
  return (
    <div className="lg:w-[80%] h-[calc(100vh-60px)] overflow-auto mx-auto px-1">
      <div className="flex flex-col gap-2">
        <div className="h-[60px] flex items-center">
          <p className="text-xl font-bold">{cartItems.length} items in cart</p>
        </div>
        <div className="shadow-md  drop-shadow-md">
          {cartItems &&
            cartItems?.map((product, productIndex) => (
              <div
                className="p-3 flex gap-2 border-b-2 md:flex-row flex-col border-gray-300"
                key={product.id}
              >
                <div className="flex  justify-center items-center">
                  <Image
                    src={`${product?.images}`}
                    alt={`${product?.images}`}
                    width={230}
                    height={230}
                  />
                </div>
                <div className="flex flex-col gap-2 px-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <h1 className="text-bold">{product.name}</h1>
                    <div className="flex items-center gap-1">
                      <button
                        className={`${
                          product.quantity === 0
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } bg-gray-300 rounded-sm px-3 py-1`}
                        onClick={() => decrement(productIndex)}
                        disabled={product.quantity === 0}
                      >
                        <AiOutlineMinus size={20} />
                      </button>
                      <input
                        className={`${
                          product.quantity === 0
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } bg-gray-300 w-8 rounded-sm px-3 py-1`}
                        type="text"
                        name="quantity"
                        value={product.quantity || 0}
                        max={5}
                        min={1}
                        readOnly
                      />
                      <button
                        className={`${
                          product.quantity >= 5 ||
                          product?.quantity >= product?.stock
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } bg-gray-300 rounded-sm px-3 py-1`}
                        onClick={() => increment(productIndex)}
                        disabled={
                          product.quantity >= 5 ||
                          product.quantity >= product?.stock
                        }
                      >
                        <AiOutlinePlus size={20} />
                      </button>
                    </div>
                  </div>
                  <span className="text-lg font-semibold">{`Rs${
                    product.price -
                    Math.ceil((product.price * product.discount) / 100 / 5) * 5
                  }`}</span>
                  {product.discount > 0 && (
                    <p className="flex gap-2 text-sm">
                      <span className="line-through">{`Rs${product.price}`}</span>{" "}
                      <span className="text-red-500">{`${product.discount}% off`}</span>
                    </p>
                  )}

                  <ul className=" flex flex-col list-none text-sm">
                    <li className="flex item-center ">
                      <span className="font-bold  w-24">Brand</span>
                      <span>{product.brand ? product.brand : "none"}</span>
                    </li>

                    {product?.colors.length > 0 && (
                      <li className="flex items-center gap-2">
                        <h4 className="font-semibold w-32">colors:</h4>
                        <div className="flex items-center gap-2">
                          {product?.colors?.map((color, ind) => {
                            return (
                              <div
                                key={ind}
                                style={{
                                  backgroundColor: color,
                                  width: "35px",
                                  height: "35px",
                                  margin: "5px",
                                  border: "1px solid black",
                                  display: "inline-block",
                                  cursor: "pointer",
                                  opacity: product.selectedColors.includes(
                                    color
                                  )
                                    ? 1
                                    : 0.5,
                                  borderRadius: "50%",
                                }}
                                onClick={() =>
                                  handleColorClick(color, productIndex)
                                }
                              ></div>
                            );
                          })}
                        </div>
                      </li>
                    )}

                    {product?.sizes.length > 0 && (
                      <li className="flex gap-2 items-center">
                        <h4 className="font-semibold w-32">sizes:</h4>
                        <div className="sizes">
                          {product?.sizes?.map((size) => {
                            return (
                              <input
                                key={size}
                                type="checkbox"
                                className={styles.sizeCheckBox}
                                value={size}
                                onChange={(event) =>
                                  handleCheckboxChange(event, productIndex)
                                }
                                checked={product.selectedSizes.includes(size)}
                              />
                            );
                          })}
                        </div>
                      </li>
                    )}

                    <li className="flex item-center ">
                      <span className="font-bold  w-24">stock</span>
                      <span>
                        {product?.stock > 0 ? "in stock" : "out of Stock"}
                      </span>
                    </li>
                  </ul>
                  <div className="flex mt-1 justify-between">
                    <button
                      className="flex gap-2 bg-[#f6f6f6] px-2 py-1 text-xs shadow-md rounded-sm"
                      onClick={() => removeCart(product?.id)}
                    >
                      Remove
                    </button>
                    <p className="text-right">
                      Total:{" "}
                      <span>
                        {`Rs ${product.quantity * product?.price -
                          Math.ceil(
                            (product?.price *
                              product.quantity *
                              product.discount) /
                              100 /
                              5
                          ) *
                            5}`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="drop-shadow-md w-[380px] py-2 px-3 flex flex-col shadow-md">
          <div className="flex">
            <span className="w-40 font-semibold">Price before tax:</span>
            <span>{`Rs ${total}`}</span>
          </div>
          <div className="flex">
            <span className="w-40 font-semibold">VAT:</span>
            <span>{`${vat}%`}</span>
          </div>
          <div className="flex">
            <span className="w-40 font-semibold">Shipping:</span>
            <span>{shipping}</span>
          </div>
          <div className="flex">
            <span className="w-40 font-semibold">Total Cost</span>
            <span>{`Rs ${costWithVat}`}</span>
          </div>
          <hr className="my-1" />
          <div className="mt-1 flex flex-col gap-1">
            <button
              onClick={clickHandler}
              className="text-sm w-36 bg-blue-500 py-1 px-2 text-white cursor-pointer rounded-md"
            >
              Checkout
            </button>
            <Link href="/">
              <button className="text-sm bg-green-500 w-36 py-1 px-2 text-white cursor-pointer rounded-md">
                Continue shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
