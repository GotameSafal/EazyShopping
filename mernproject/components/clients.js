"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  AiOutlineSearch,
  RxHamburgerMenu,
  AiFillStar,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  FcNext,
  FcPrevious,
  RxCross1,
  AiOutlineRight,
  FiThumbsUp,
} from "@utils/iconExport";
import { categories } from "@utils/categories";
import { Toaster, toast } from "react-hot-toast";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setUser, setToken } from "@redux/slices/configUser";
import {
  addToCart,
  reassignToCart,
  removeNotification,
  setNotification,
} from "@redux/slices/cartSlice";
import Pagination from "react-js-pagination";
import { caluculatePrice } from "@utils/calculatePrice";
import { convertTime } from "@utils/convertTime";
import { generateMerchantId, setFilterPriceParams } from "@utils/dummy";
import {
  openUserSidebar,
  closeUserSideBar,
  setUserScreen,
} from "@redux/slices/userNav";
import {
  useAddAddressMutation,
  useAddOrderMutation,
  useDeleteAddressMutation,
  useLazyGetMyInfoQuery,
  useLazyLogoutQuery,
  useMakePaymentMutation,
} from "@redux/slices/api";
import { IoIosStar } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
export const SearchBar = ({ classname }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const pathName = usePathname();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (searchText) {
      pathName !== "/"
        ? router.push(`/?keyword=${searchText.trim()}`)
        : router.push(`?keyword=${searchText.trim()}`);
    } else {
      router.push("/");
    }
  };
  return (
    <div className={classname}>
      <form className="flex items-center" onSubmit={submitHandler}>
        <input
          type="text"
          className="focus:outline-none border-2 py-1 px-2"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <button
          type="button"
          className="py-1 px-2 rounded-sm rounded-r-full border-slate-300 border-2"
          onClick={submitHandler}
        >
          <AiOutlineSearch size={24} />
        </button>
      </form>
    </div>
  );
};

export const UserNavbar = () => {
  const router = useRouter();
  const [logout] = useLazyLogoutQuery();
  const [getMyInfo] = useLazyGetMyInfoQuery();
  const dispatch = useDispatch();
  const [profileToggle, setProfileToggle] = useState(false);
  const token = useSelector((state) => state.configUser.token);
  const user = useSelector((state) => state.configUser.user);
  const cart = useSelector((state) => state.cartSection.cart);
  const notification = useSelector((state) => state.cartSection.notification);
  const [toShow, setToShow] = useState(false);
  let { screen } = useSelector((state) => state.userNav);
  useEffect(() => {
    if (token) {
      (() => {
        getMyInfo()
          .unwrap()
          .then((response) => dispatch(setUser(response?.user)))
          .catch((error) => console.log(error));
      })();
    }
  }, [token]);
  useEffect(() => {
    const handler = () => {
      dispatch(setUserScreen(window.innerWidth));
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });
  useEffect(() => {
    if (screen <= 768) {
      setToShow(false);
    }
  }, [screen]);
  const handleClick = () => {
    setProfileToggle((prev) => !prev);
  };
  const logoutHandler = async () => {
    logout()
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        dispatch(setToken(null));
        dispatch(setUser(null));
        Cookies.remove("EazyShopping");
        localStorage.removeItem("cart");
        router.push("/");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      {screen <= 768 && (
        <div
          className={`sm:px-0 px-1 ${
            toShow ? "block" : "hidden"
          } h-[60px] border-b-2 mx-auto flex items-center justify-center`}
        >
          <SearchBar classname="" />
        </div>
      )}
      <div className="lg:w-[80%] sm:px-0 px-1 h-[60px] border-b-2 mx-auto flex items-center justify-between">
        <div className="flex">
          <Link href="/" passHref>
            <Image
              width={35}
              height={35}
              src="https://res.cloudinary.com/dzat8mbl6/image/upload/v1693554058/Screenshot_from_2023-09-01_13-09-55_esr3dz.png"
              alt="logo.svg"
            />
          </Link>
        </div>

        <div className="flex  gap-4">
          {screen > 768 ? (
            <SearchBar classname={"md:block"} />
          ) : (
            <span
              onClick={() => setToShow((prev) => !prev)}
              className="p-2 cursor-pointer font-bold rounded-full hover:shadow-lg border hover:bg-[#ddd]"
            >
              <AiOutlineSearch size={20} />
            </span>
          )}

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex gap-2 items-center">
                <Link href="/cart" className="flex items-center" passHref>
                  <button
                    onClick={() => dispatch(removeNotification())}
                    className="w-16 rounded-md flex gap-1 text-sm py-1 px-2 border-2 cursor-pointer border-slate-400"
                  >
                    Cart{" "}
                    <span className="text-red-500">
                      {notification && cart.length > 0 && cart.length}
                    </span>
                  </button>
                </Link>

                <div className="relative h-[40px] w-[40px] rounded-full">
                  <Image
                    className="rounded-full"
                    src="https://res.cloudinary.com/dzat8mbl6/image/upload/v1693553632/user_kjl9rk.png"
                    alt=""
                    width={39}
                    height={39}
                    onClick={handleClick}
                  />
                  <div
                    className={`${
                      profileToggle ? "block" : "hidden"
                    } w-20 absolute top-full  left-0 bg-red-500 z-10`}
                  >
                    <div className="profile_container cursor-pointer flex flex-col gap-1 p-2 bg-[#f6f6f6] bg-red shadow-sm drop-shadow-md rounded-sm">
                      <p className="cursor-pointer">Profile</p>
                      <p
                        className="cursor-pointer"
                        onClick={() => router.push("/orders")}
                      >
                        Orders
                      </p>
                      <button
                        onClick={logoutHandler}
                        className="w-16 rounded-md  text-sm py-1 px-2 border-2 cursor-pointer border-slate-400"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" passHref>
                  <button className="w-16 rounded-md text-sm py-1 px-2 border-2 cursor-pointer border-slate-400">
                    Login
                  </button>
                </Link>
                <Link href="/signin" passHref>
                  <button className="w-16 rounded-md text-sm py-1 px-2 border-2 cursor-pointer border-slate-400">
                    SignIn
                  </button>
                </Link>
              </div>
            )}
            <span
              onClick={() => dispatch(openUserSidebar())}
              className="p-1 rounded-full sm:hidden cursoer-pointer hover:bg-gray-300"
            >
              <RxHamburgerMenu size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const arr = [1, 2, 3, 4, 5];
export const FilterSection = ({ classname }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [value, setValue] = useState({ minimum: "", maximum: "" });
  const pathname = usePathname();
  const router = useRouter();
  const categoryHandler = (e, value) => {
    setSelectedCategory(value);
    let searchQuery;
    if (typeof window !== "undefined") {
      searchQuery = new URLSearchParams(window.location.search);
      if (searchQuery.has("category")) {
        searchQuery.set("category", e.target.value);
      } else {
        searchQuery.append("category", e.target.value);
      }
      const path = `${window.location.pathname}?${searchQuery.toString()}`;
      pathname !== "/" ? router.push(`/${path}`) : router.push(path);
    }
  };
  const changeHandler = (e) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const priceHandler = (e) => {
    if (typeof window !== "undefined") {
      let searchQuery = new URLSearchParams(window.location.search);
      searchQuery = setFilterPriceParams(searchQuery, "min", value.minimum);
      searchQuery = setFilterPriceParams(searchQuery, "max", value.maximum);
      const path = `${window.location.pathname}?${searchQuery.toString()}`;
      router.push(path);
    }
  };

  const ratingHandler = (num) => {
    if (typeof window !== "undefined") {
      let searchQuery = new URLSearchParams(window.location.search);
      if (searchQuery.has("ratings")) {
        searchQuery.set("ratings", num);
      } else {
        searchQuery.append("ratings", num);
      }
      const path = `${window.location.pathname}?${searchQuery.toString()}`;
      pathname !== "/" ? router.push(`/${path}`) : router.push(path);
    }
  };
  return (
    <div className={`w-[260px] flex flex-col gap-1 ${classname}`}>
      <div className="flex p-2 flex-col gap-1 rounded-md  border-2 border-slate-200">
        <h3 className="py-1 font-semibold">Price</h3>
        <div className="flex w-full items-center justify-between gap-1 ">
          <input
            className="text-sm border-blue-200 w-24 border-2 py-1 px-2"
            type="number"
            name="minimum"
            placeholder="MIN"
            value={value.minimum}
            onChange={(e) => changeHandler(e)}
          />
          <span>-</span>
          <input
            className="text-sm border-blue-200 w-24 border-2 py-1 px-2"
            type="number"
            placeholder="MAX"
            name="maximum"
            value={value.maximum}
            onChange={(e) => changeHandler(e)}
          />
          <button
            onClick={priceHandler}
            className="py-1 px-2 bg-blue-400 rounded-md"
          >
            Go
          </button>
        </div>
      </div>
      <div className="flex p-2 flex-col gap-y-1 rounded-md border-2 border-slate-200 ">
        <h3 className=" font-semibold py-1">Categories</h3>
        <div className="flex flex-col text-sm gap-1 py-1">
          {categories?.map((obj, ind) => {
            return (
              <div className="flex gap-2" key={ind}>
                <input
                  className="text-lg"
                  checked={ind === selectedCategory}
                  onChange={(e) => categoryHandler(e, ind)}
                  type="checkbox"
                  value={obj?.parent}
                  id={obj.parent}
                />
                <label htmlFor={obj.parent}>{obj.parent}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex p-2 flex-col gap-y-1 rounded-md border-2 border-slate-200 ">
        <h3 className=" font-semibold py-1">Ratings</h3>
        <div className="flex flex-col text-sm gap-2 py-1">
          <div
            onClick={() => ratingHandler("1")}
            className="flex gap-2 cursor-pointer"
          >
            <IoIosStar size={20} className="text-yellow-300" />
            <FaRegStar size={20} className="text-gray-400" />
            <FaRegStar size={20} className="text-gray-400" />
            <FaRegStar size={20} className="text-gray-400" />
            <FaRegStar size={20} className="text-gray-400" />
          </div>
          <div
            onClick={() => ratingHandler("2")}
            className="flex gap-2 cursor-pointer"
          >
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
            <FaRegStar size={20} className="text-gray-400" />
            <FaRegStar size={20} className="text-gray-400" />
            <FaRegStar size={20} className="text-gray-400" />
          </div>
          <div
            onClick={() => ratingHandler("3")}
            className="flex gap-2 cursor-pointer"
          >
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
            <FaRegStar size={20} className="text-gray-400" />
            <FaRegStar size={20} className="text-gray-400" />
          </div>
          <div
            onClick={() => ratingHandler("4")}
            className="flex gap-2 cursor-pointer"
          >
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
            <FaRegStar size={20} className="text-gray-400" />
          </div>
          <div
            onClick={() => ratingHandler("5")}
            className="flex gap-2 cursor-pointer"
          >
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
            <IoIosStar size={20} className="text-yellow-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const MainBody = ({ data }) => {
  const params = useSearchParams();
  const keywordValue = params.get("keyword");
  const categoryValue = params.get("category");
  const minValue = params.get("min");
  const maxValue = params.get("max");

  const selectedValue = keywordValue || categoryValue || minValue || maxValue;

  const total = selectedValue ? data?.filteredProductCount : data?.total;
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-auto flex gap-y-3 gap-x-1 sm:justify-start justify-center flex-wrap">
        {data?.filteredProductCount > 0 ? (
          data.product.map((product) => {
            return (
              <Link key={product._id} href={`/product/${product._id}`} passHref>
                <div className="sm:w-[189px] sm:p-0 p-2 sm:h-[292px] h-[375px] w-[320px] bg-[#f6f6f6] hover:-translate-y-2 duration-300 ease-in-out transition-transform cursor-pointer rounded-md">
                  <div>
                    <img
                      src={product?.images[0]?.url || "/noImage.jpg"}
                      className="rounded-t-md mx-auto sm:w-[189px] sm:h-[189px] w-64 h-64"
                      alt={product?.images[0]?.url}
                    />
                  </div>
                  <div className="p-1">
                    <div className="border-b-2 border-gray-200 py-1">
                      <h2 className="font-semibold text-sm">
                        {`${product.name.slice(0, 18)}...`}
                      </h2>
                      <div className="flex gap-1 text-yellow-400">
                        <div className="flex gap-1">
                          {arr.map((e, ind) => (
                            <span key={ind} className="">
                              <AiFillStar size={15} />
                            </span>
                          ))}
                        </div>
                        <span className="text-xs">{`(${product.no_of_reviews})`}</span>
                      </div>
                    </div>
                    <p className="text-xl font-semibold">{`Rs ${
                      product.price -
                      ((product.discount / 100) * product.price).toFixed(0)
                    }`}</p>
                    {product.discount > 0 ? (
                      <div className="flex gap-3 text-sm">
                        <span className="line-through">{`Rs ${product.price}`}</span>
                        <span className="text-red-500">{`${product.discount}% off`}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="w-full h-full text-lg font-semibold flex items-center justify-center">
            No products found
          </div>
        )}
      </div>

      <Cpagination total={total} />
    </div>
  );
};

export const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
};

export const CartAndBuyButton = ({
  product,
  quantity,
  selectedColors,
  selectedSizes,
}) => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartSection.cart);
  const userLoggedIn = useSelector((state) => state.configUser.user);
  const cartClickHandler = (cartItem) => {
    if (!userLoggedIn) return toast.error("Please login first");
    let exists = cartList.find((item) => item.id === cartItem.id);
    if (exists) return toast.success("Product already exists in cart");
    dispatch(addToCart(cartItem));
    dispatch(setNotification());
    toast.success("Successfully added to cart");
  };

  return (
    <div className="flex gap-2">
      <button
        className={`w-40 py-1 rounded-md ${
          product?.stock <= 0 ? "cursor-not-allowed" : "cursor-pointer"
        } bg-blue-200`}
        onClick={() =>
          cartClickHandler({
            id: product?._id,
            name: product?.name,
            stock: product?.stock,
            brand: product?.brand,
            price: product?.price,
            discount: product?.discount,
            color: product?.color,
            images: product?.images[0]?.url,
            sizes: product?.sizes,
            colors: product?.colors,
            quantity,
            selectedColors,
            selectedSizes,
          })
        }
        disabled={product?.stock === 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export const ProductQuantity = () => {
  let [quantity, setQuantity] = useState(0);
  const increment = (e) => {
    if (quantity >= 5) {
      return;
    }
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity === 0) return;
    setQuantity((prev) => prev - 1);
  };
  return (
    <div className="flex gap-2 items-center">
      <span className=" text-gray-400 w-32">Quantity</span>
      <div className="flex gap-2">
        <button
          className={`${
            quantity === 0 ? "cursor-not-allowed" : "cursor-pointer"
          } bg-gray-300 rounded-sm px-3 py-1`}
          onClick={decrement}
          disabled={quantity === 0}
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
            quantity >= 5 || quantity >= product?.stock
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } bg-gray-300 rounded-sm px-3 py-1`}
          onClick={increment}
          disabled={quantity >= 5}
        >
          +
        </button>
      </div>
    </div>
  );
};

export const ProductDetailImage = ({ product }) => {
  const [mainImageUrl, setMainImageUrl] = useState(product?.images[0]?.url);

  const changeMainImage = (url) => {
    setMainImageUrl(url);
  };

  return (
    <div className="flex gap-2 justify-center md:w-[328px] flex-col">
      <Image
        src={mainImageUrl}
        alt={mainImageUrl}
        className="mx-auto"
        width={328}
        height={330}
      />
      <hr className="bg-gray-300" />
      <div className="flex gap-2 justify-center">
        {product?.images?.map((image, ind) => {
          return (
            <Image
              key={ind}
              className="cursor-pointer rounded-sm hover:border-1 border-slate-300"
              width={60}
              height={60}
              src={image.url}
              alt={image.url}
              onClick={() => changeMainImage(image.url)}
              onMouseOver={() => changeMainImage(image.url)}
            />
          );
        })}
      </div>
    </div>
  );
};

export const ConditionalNavbar = ({ cookie }) => {
  const path = usePathname();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.configUser.token);
  const [getUser] = useLazyGetMyInfoQuery();

  useEffect(() => {
    // Update the token if the cookie is provided
    if (cookie) {
      dispatch(setToken(cookie.value));
    }

    // Fetch user information when the token changes
    if (token) {
      getUser()
        .unwrap()
        .then((response) => {
          dispatch(setUser(response?.user));
        })
        .catch((error) => console.error(error));
    }
  }, [token, dispatch, cookie, getUser]);

  return path.startsWith("/admin") ? (
    ""
  ) : (
    <>
      <UserNavbar />
      <UserSidebar />
    </>
  );
};

export const UserSidebar = () => {
  const nav = useRef();
  const dispatch = useDispatch();
  const { screen, sidebar } = useSelector((state) => state.userNav);
  useEffect(() => {
    const handler = (event) => {
      if (!nav.current.contains(event.target)) dispatch(closeUserSideBar());
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });
  const clickHandler = () => {
    dispatch(closeUserSideBar());
  };
  return (
    screen && (
      <div
        ref={nav}
        className={`w-72  transition-transform duration-200 top-0 left-0 drop-shadow-lg overflow-y-auto bg-[#f6f6f6] h-[100vh] fixed z-10`}
        style={{
          transform: sidebar ? "translateX(0px)" : "translateX(-400px)",
        }}
      >
        <div className="flex shadow-md p-3 items-center justify-between">
          <Link href="/" className="flex gap-3">
            <Image
              alt="logo"
              width={40}
              height={40}
              src="https://res.cloudinary.com/dzat8mbl6/image/upload/v1693554058/Screenshot_from_2023-09-01_13-09-55_esr3dz.png"
            />
            <p className="tracking-tight text-xl font-extrabold">EazyShop</p>
          </Link>
          <button
            type="button"
            className="cursor-pointer p-1 hover:bg-gray-300 rounded-full"
            onClick={clickHandler}
          >
            <RxCross1 size={20} />
          </button>
        </div>
        <div className="">
          <ul>
            <li
              onClick={clickHandler}
              className="py-1 px-3 hover:bg-gray-400 rounded-md font-semibold text-gray-800"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={clickHandler}
              className="py-1 px-3 hover:bg-gray-400 rounded-md font-semibold text-gray-800"
            >
              <Link href="/orders">Orders</Link>
            </li>
            <li
              onClick={clickHandler}
              className="py-1 px-3 hover:bg-gray-400 rounded-md font-semibold text-gray-800"
            >
              <Link href="/cart">Cart</Link>
            </li>
            <li
              onClick={clickHandler}
              className="py-1 px-3 hover:bg-gray-400 rounded-md font-semibold text-gray-800"
            >
              <Link href="/shipping">Shipping</Link>
            </li>
            <li
              onClick={clickHandler}
              className="py-1 px-3 hover:bg-gray-400 rounded-md font-semibold text-gray-800"
            >
              <Link href="/shipping">Addresses</Link>
            </li>
            <li className="py-1 px-3  hover:bg-gray-400 rounded-md font-semibold text-gray-800">
              Filter
            </li>
            <li className="ps-2">
              <FilterSection />
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export const Addresses = () => {
  const [deleteAddress] = useDeleteAddressMutation();
  const user = useSelector((state) => state.configUser.user);
  const deleteHandler = async (addressId) => {
    deleteAddress(addressId)
      .unwrap()
      .then((response) => toast.success(response?.message))
      .catch((error) => console.error(error));
  };
  return (
    <div className="shadow-md drop-shadow-md rounded-md p-3 my-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-900">Addresses</h2>
        <p className="text-gray-800">Choose existing addresses</p>
      </div>
      {user?.address?.map((address, ind) => {
        return (
          <div
            key={ind}
            className="bg-[#f6f6f6] mb-2 p-2 rounded-sm flex  gap-4"
          >
            <input
              type="radio"
              className="w-4 h-4 "
              id={address?.username + ind}
              name="addressList"
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
  );
};

export const SetAddress = () => {
  const initialState = {
    username: "",
    email: "",
    phoneNo: "",
    city: "",
    town: "",
    province: "",
    zipPostalCode: "",
  };
  const [addressData, setAddressData] = useState(initialState);
  const [addAddress, { isLoading }] = useAddAddressMutation();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    addAddress(addressData)
      .unwrap()
      .then((response) => {
        toast.success(response?.message);
        setAddressData(initialState);
      })
      .catch((error) => toast.error("something went wrong"));
  };

  return (
    <>
      <div className="shadow-md flex flex-col pb-6 gap-3 drop-shadow-md px-6 py-2">
        <div>
          <h4>Use a Permanent email address to reaceive mail</h4>
          <p className="text-xs text-red-500">
            *If address already provide no need to fill this form
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={submitHandler}>
          <div>
            <label htmlFor="username">Full name</label>
            <input
              type="text"
              placeholder="example example"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="username"
              value={addressData.username}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="email"
              onChange={changeHandler}
              value={addressData.email}
            />
          </div>
          <div>
            <label htmlFor="phoneNo">Phone No</label>
            <input
              type="tel"
              placeholder="9238729834"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="phoneNo"
              onChange={changeHandler}
              value={addressData.phoneNo}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              placeholder="Kathmandu"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="city"
              onChange={changeHandler}
              value={addressData.city}
            />
          </div>
          <div>
            <label htmlFor="town">Address</label>
            <input
              type="text"
              placeholder="Bouddha"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="town"
              onChange={changeHandler}
              value={addressData.town}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label htmlFor="province">Province</label>
              <input
                type="text"
                placeholder="Bagmati"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                name="province"
                onChange={changeHandler}
                value={addressData.province}
              />
            </div>
            <div className="w-full">
              <label htmlFor="zipPostalCode">Zip/Postal code</label>
              <input
                type="text"
                placeholder="982347"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                name="zipPostalCode"
                onChange={changeHandler}
                value={addressData.zipPostalCode}
              />
            </div>
          </div>
          <button
            disable={isLoading}
            type="submit"
            className={`${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
          >
            Add shipping
          </button>
        </form>
      </div>
    </>
  );
};

export const Cpagination = ({ total }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const pageHandler = (pageNumber) => {
    let searchQuery;
    if (typeof window !== "undefined") {
      searchQuery = new URLSearchParams(window.location.search);
      if (searchQuery.has("page")) {
        searchQuery.set("page", pageNumber);
      } else {
        searchQuery.append("page", pageNumber);
      }
      const path = `${window.location.pathname}?${searchQuery.toString()}`;
      router.push(path);
    }
  };

  return (
    <div className="flex jusitfy-center w-48 mx-auto gap-2">
      <Pagination
        activePage={Number(page)}
        itemsCountPerPage={10}
        pageRangeDisplayed={5}
        totalItemsCount={total}
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
  );
};

export const ShippingConfirm = ({ paymentMethod, address }) => {
  const dispatch = useDispatch();
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const [makeKhaltiPayment] = useMakePaymentMutation();
  const cart = useSelector((state) => state.cartSection);
  const user = useSelector((state) => state.configUser.user);
  const { costWithVat, shipping, total, vat } = caluculatePrice(cart);
  const [show, setShow] = useState(false);

  const orderHandler = async (totalcost) => {
    if (!address || !paymentMethod)
      toast.error("please select location and payment method");
    else if (totalcost === 0) {
      toast.error("please select some products in cart");
    } else if (paymentMethod === "cash") {
      setShow(true);
    } else if (paymentMethod === "khalti") {
      const payload = {
        return_url: process.env.NEXT_PUBLIC_KHALTI_SUCCESS,
        website_url: process.env.NEXT_PUBLIC_WEB_URL,
        amount: totalcost * 1000,
        purchase_order_id: generateMerchantId,
        purchase_order_name: "products",
        customer_info: {
          name: user.name,
          email: user.email,
          phone: address?.phoneNo,
        },
      };
      makeKhaltiPayment(payload)
        .unwrap()
        .then((response) => {
          localStorage.setItem(
            "confirmedProduct",
            JSON.stringify(finalOrderinProductsDetail)
          );
          window.location.href = response.data?.payment_url;
        })
        .catch((error) => console.error(error));
    }
  };
  const confirmHandler = async () => {
    addOrder(finalOrderinProductsDetail)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        dispatch(
          reassignToCart(cart.cart?.filter((item) => item.quantity === 0))
        );
      })
      .catch((error) => console.error(error));
    setShow(false);
  };
  const finalOrderinProductsDetail = {
    shipping: address,
    orderItems: cart.cart
      .filter((item) => item.quantity > 0)
      .map((item) => ({ ...item, product: item.id })),
    totalPrice: costWithVat,
    shippingPrice: shipping,
    taxPrice: vat,
    paymentInfo: {
      id: address.username,

      status: paymentMethod === "cash" ? "unpaid" : "paid",
    },
    orderStatus: "processing",
  };
  return (
    <>
      <div className="drop-shadow-md rounded-md w-full py-2 px-3 flex flex-col shadow-md">
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
            disabled={isLoading}
            onClick={() => orderHandler(costWithVat)}
            className={`${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            } text-sm w-36 bg-blue-500 py-1 px-2 text-white cursor-pointer rounded-md`}
          >
            Order
          </button>
          <Link href="/">
            <button className="text-sm bg-green-500 w-36 py-1 px-2 text-white cursor-pointer rounded-md">
              Continue shopping
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`${
          show ? "block" : "hidden"
        } fixed left-[calc(50%-128px)] top-12 w-72 rounded-md bg-[#f6f6f6] px-4 py-2 shadow-sm drop-shadow-sm`}
      >
        <p className="text-center">Order this product?</p>
        <div className="flex justify-center gap-2 py-2">
          <button
            onClick={() => setShow(false)}
            className="flex w-24 items-center justify-center gap-2 rounded-md border bg-white py-1 shadow-sm"
          >
            <span className="text-red-500">
              <RxCross1 size={15} />
            </span>
            Cancel
          </button>
          <button
            onClick={() => confirmHandler()}
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

export const ListofOrderedProduct = ({ orderData }) => {
  return (
    <div
      className="flex flex-col gap-3"
      style={{ minHeight: "calc(100vh - 160px)" }}
    >
      {orderData &&
        orderData?.map((item, ind) => {
          return (
            <div
              key={ind}
              className="bg-[#f6f6f6] p-4 shadow-md drop-shadow-md rounded-sm"
            >
              <div className="flex justify-between sm:flex-row flex-col">
                <div className="flex flex-col">
                  <h2>
                    Order{" "}
                    <span className="text-blue-500">{`#${item._id}`}</span>
                  </h2>
                  <p>Placed on {convertTime(item.createdAt)}</p>
                </div>
                <div className="flex w-36 items-center gap-2">
                  <span>status:</span>
                  <span>{item.orderStatus}</span>
                </div>
              </div>
              <hr className="my-3" />
              <ul className="flex flex-col gap-2">
                {item.orderItems?.map((product, ind) => {
                  return (
                    <li
                      key={ind}
                      className="grid gap-y-3 align-center grid-cols-2"
                    >
                      <div>
                        <div className="w-full flex gap-2">
                          <Image
                            width={70}
                            height={70}
                            src={product.images}
                            alt={product.images}
                          />
                          <p>
                            <Link href={`/product/${product._id}`}>
                              {product?.name.slice(0, 28).concat("...")}
                            </Link>
                          </p>
                        </div>
                      </div>
                      <span>{`Quantity: ${product?.quantity}`}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export const BreadCrumbs = ({ Crumb }) => {
  return (
    <div className="flex items-center h-14 py-3 rounded-lg">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {Crumb?.map((crumb, ind) => {
          return (
            <li key={ind} className="py-3">
              <div className="flex items-center">
                {ind !== 0 && (
                  <AiOutlineRight className="w-4 h-4 text-gray-700 font-semibold" />
                )}

                <Link
                  href={crumb?.link}
                  className="text-gray-700 hover:text-gray-900 ml-1 font-semibold md:ml-2 text-md"
                >
                  {crumb?.name}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
