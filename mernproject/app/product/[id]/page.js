"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BreadCrumbs,
  CartAndBuyButton,
  ProductDetailImage,
} from "@components/clients";
import styles from "@styles/product.module.scss";
const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${params.id}`
        );
        const data = response.data?.product;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.id]);

  const increment = () => {
    if (quantity >= 5) {
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity === 0) return;
    setQuantity((prev) => prev - 1);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSizes((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((s) => s !== value);
      }
    });
  };
  if (!product) {
    return (
      <div className="h-vh flex justify-center items-center text-xl font-semibold text-gray-800">
        Loading...
      </div>
    );
  }

  const handleColorClick = (color) => {
    if (selectedColors.includes(color)) {
      // If color is already selected, remove it from the selectedColors array
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      // If color is not selected, add it to the selectedColors array
      setSelectedColors((prev) => [...prev, color]);
    }
  };

  const crumbArray = [
    { name: "Home", link: "/" },
    {
      name: `${product?.name.substring(0, 30)}...`,
      link: `/product/${product?._id}`,
    },
  ];
  return (
    <div className="lg:w-[80%] flex flex-col gap-1 mx-auto">
      <BreadCrumbs Crumb={crumbArray} />
      <div className="flex md:flex-row flex-col bg-[#f6f6f6] rounded-sm gap-6 p-2 pb-8 ">
        <ProductDetailImage product={product} />
        <div className="flex flex-col w-full">
          <div className="flex gap-1 my-1 flex-col">
            <h2 className="font-bold text-lg">{product.name}</h2>
            <div className="flex items-center gap-2 text-sm">
              <div className="">Rating stars</div>
              <div className="flex text-xs items-center  tracking-tighter">
                {" "}
                No of Ratings <span>{`(${product.no_of_reviews})`}</span>
              </div>
            </div>
          </div>
          <hr className="bg-gray-300" />
          <div className="flex flex-col gap-6">
            <div className="my-2 flex gap-2 flex-col">
              <p className="text-2xl">{`Rs ${
                product.price -
                Math.round((product.discount / 100) * product.price)
              }`}</p>
              {product.discount > 0 && (
                <div className="flex gap-2 text-xs  items-center">
                  <p className="line-through">{`Rs ${product.price}`}</p>
                  <span className="text-red-400">{`${product.discount}% off`}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <span className=" text-gray-800 w-32">Quantity</span>
              <div className="flex gap-2">
                <button
                  className={`${
                    quantity === 0 ? "cursor-not-allowed" : "cursor-pointer"
                  } bg-gray-300 rounded-sm px-3 py-1`}
                  onClick={() => decrement()}
                  disabled={quantity === 0 || product?.stock <= 0}
                >
                  -
                </button>
                <input
                  className="focus:outline-none caret-transparent border-blue-300 border-2 w-10 px-2"
                  value={quantity}
                  type="text"
                  readOnly
                />
                <button
                  className={`${
                    quantity >= 5 || quantity >= product.stock
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } bg-gray-300 rounded-sm px-3 py-1`}
                  onClick={() => increment()}
                  disabled={quantity >= 5 || product?.stock <= 0}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-0 text-sm">
              <div className="flex gap-2">
                <h4 className="font-semibold w-32">Stock: </h4>
                <p
                  className={`${
                    product.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of stock"}
                </p>
              </div>
              <div className="flex gap-2">
                <h4 className="font-semibold w-32">Category:</h4>
                <p>{product.category}</p>
              </div>
              <div className="flex gap-2 items-center">
                <h4 className="font-semibold w-32">Brand:</h4>
                <p>{product.brand ? product?.brand : "none"}</p>
              </div>
              {product?.sizes.length > 0 && (
                <div className="flex gap-2 items-center">
                  <h4 className="font-semibold w-32">sizes:</h4>
                  <div className="sizes">
                    {product?.sizes?.map((size) => {
                      return (
                        <input
                          key={size}
                          type="checkbox"
                          className={styles.sizeCheckBox}
                          value={size}
                          onChange={handleCheckboxChange}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              {product?.colors.length > 0 && (
                <div className="flex items-center gap-2">
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
                            opacity: selectedColors.includes(color) ? 1 : 0.5,
                            borderRadius: "50%",
                          }}
                          onClick={() => handleColorClick(color)}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <CartAndBuyButton
              product={product}
              quantity={quantity === 0 ? 1 : quantity}
              selectedSizes={sizes}
              selectedColors={selectedColors}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-[#f6f6f6] rounded-sm p-2">
        <h2 className="font-semibold text-lg my-2">
          {`Product Details of ${product.name}`}
        </h2>
        <p className="text-sm">{product.description}</p>
      </div>
      <div className="flex flex-col bg-[#f6f6f6] p-2">
        <h2 className="font-semibold text-lg">Reviews</h2>
        {product?.reviews?.map((review, ind) => (
          <div className="flex flex-col gap-0" key={ind}>
            <h4 className="">{Obj?.name}</h4>
            <p className="text-sm">{obj?.comment}</p>
            <p className="text-right text-blue-300 size-xs">
              Created At: <span>{obj.time.slice(0, 10)}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
