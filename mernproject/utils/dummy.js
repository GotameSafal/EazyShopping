import {
  TbTruckDelivery,
  FiUsers,
  FiEdit,
  AiOutlineBarChart,
  AiOutlineCalendar,
  AiOutlinePieChart,
  AiOutlineLineChart,
  FaStore,
  AiFillShopping,
  HiUsers,
} from "@utils/iconExport";
export const sideItem = [
  {
    title: "Dashboard",
    items: [
      { icon: <AiFillShopping />, name: "Ecommerce" },
      { icon: <FaStore />, name: "Products" },
    ],
  },
  {
    title: "Pages",
    items: [
      { icon: <TbTruckDelivery />, name: "Orders" },
      { icon: <HiUsers />, name: "Employees" },
      { icon: <FiUsers />, name: "Customers" },
    ],
  },
  {
    title: "Apps",
    items: [
      { icon: <AiOutlineCalendar />, name: "Calendar" },
      { icon: <FiEdit />, name: "Editor" },
    ],
  },
  {
    title: "Charts",
    items: [
      { icon: <AiOutlinePieChart />, name: "Pie" },
      { icon: <AiOutlineLineChart />, name: "Line" },
      { icon: <AiOutlineBarChart />, name: "Bar" },
    ],
  },
];

export const SalesData = [
  {
    name: "Page A",
    uv: 4000,
    sales: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    sales: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    sales: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    sales: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    sales: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    sales: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    sales: 4300,
    amt: 2100,
  },
];

export const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    filterable: true,
    sortable: true,
  },
  {
    field: "image",
    headerName: "Image",
    width: 130,
    sortable: false,
    filterable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 130,
    sortable: true,
    filterable: true,
  },
  {
    field: "status",
    headerName: "Status",
    type: Boolean,
    width: 90,
  },
  {
    field: "orderStatus",
    headerName: "Order Status",
    type: "singleSelect",
    valueOptions: ["processing", "approved", "ordered"],
    editable: true,
    width: 130,
  },
  {
    field: "created at",
    headerName: "Created At",
    sortable: true,
    width: 160,
  },
];

export const filterSection = [
  {
    title: "Brand",
    child: ["numph", "jlwkeri", "deodratn", "leloe", "lolita"],
  },
  { title: "Size", child: ["xs", "sm", "lg", "xl", "2xl", "3xl"] },
  { title: "Rating", child: [4, 3, 2, 1] },
  { title: "Color", child: ["black", "blue", "red", "orange", "green"] },
];

export const ProductRow = [
  {
    id: 1,
    product: "/url/name",
    name: "tshirt",
    price: "discount",
    discount: 20,
    category: "wearings",
    action: <button className="py-1 px-2 bg-red-500">Remove</button>,
  },
];

export const ProductCol = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    filterable: true,
    sortable: true,
  },
  {
    field: "product",
    headerName: "ProductImg",
    width: 200,
    editable: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 170,
    filterable: true,
    editable: true,
    sortable: true,
  },
  {
    field: "price",
    headerName: "Price",
    width: 70,
    filterable: true,
    sortable: true,
    editable: true,
  },
  {
    field: "discount",
    headerName: "Discount %",
    width: 70,
    filterable: true,
    sortable: true,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    width: 180,
    filterable: true,
    sortable: true,
    editable: true,
  },
  {
    field: "action",
    headerName: "Update",
    width: 130,
  },
];

export const setFilterPriceParams = (queryParams, query, value) => {
  let hasQuery = queryParams.has(query);
  if (value && hasQuery) {
    queryParams.set(query, value);
  } else if (value) {
    queryParams.append(query, value);
  } else {
    queryParams.delete(query);
  }
  return queryParams;
};


  

export const ConditionalNavbar = ({ cookie }) => {
  const path = usePathname();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.configUser.token);
  const cartItem = useSelector((state) => state.cartSection.cart);
  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/me`,
            {
              withCredentials: true,
            }
          );
          if (data?.success) {
            dispatch(setUser(data?.user));
          }
        } catch (err) {
          console.log(`error : ${err.response.data}`);
        }
      })();
    }
  }, [token]);

  if (cookie) {
    dispatch(setToken(cookie.value));
  }

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
            <Image alt="logo" width={40} height={40} src="/next.svg" />
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
      </div>
    )
  );
};

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
  const dispatch = useDispatch();
  const [profileToggle, setProfileToggle] = useState(false);
  const token = useSelector((state) => state.configUser.token);
  const user = useSelector((state) => state.configUser.user);
  const cart = useSelector((state) => state.cartSection.cart);
  const notification = useSelector((state) => state.cartSection.notification);
  const [toShow, setToShow] = useState(false);
  const { screen } = useSelector((state) => state.userNav);
  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/me`,
            {
              withCredentials: true,
            }
          );
          if (data?.success) {
            dispatch(setUser(data?.user));
          }
        } catch (err) {
          console.log(`error : ${err.response.data}`);
        }
      })();
    }
  }, [token]);
  useEffect(() => {
    const handler = () => {
      dispatch(setUserScreen(window.innerWidth));
    };
    handler();
    window.addEventListener("resize", handler);
    return window.removeEventListener('resize', handler)
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
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
        {
          withCredentials: true,
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("cart");
        router.push("/");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {screen <= 768 && (
        <div
          className={`sm:px-0 px-1 ${
            toShow ? "block" : "hidden"
          } h-[60px] border-b-2 mx-auto flex items-center justify-center`}
        >
          <SearchBar class="" />
        </div>
      )}
      <div className="lg:w-[80%] sm:px-0 px-1 h-[60px] border-b-2 mx-auto flex items-center justify-between">
        <div className="flex">
          <Link href="/" passHref>
            <Image width={35} height={35} src="/next.svg" alt="logo.svg" />
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
                    src="/user.png"
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
                    <div className="profile_container flex flex-col gap-1 p-2 bg-[#f6f6f6] bg-red shadow-sm drop-shadow-md rounded-sm">
                      Profile
                      <button
                        onClick={logoutHandler}
                        className="w-16 rounded-md text-sm py-1 px-2 border-2 cursor-pointer border-slate-400"
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