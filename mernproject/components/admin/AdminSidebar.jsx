"use client";
import { RxCross1 } from "@utils/iconExport";
import Link from "next/link";
import { sideItem } from "@utils/dummy";
import { useDispatch, useSelector } from "react-redux";
import { openNavbar, closeNavbar, setScreen } from "@redux/slices/adminNav";
import { useEffect, useRef } from "react";
import Image from "next/image";

const NavItem = ({ icon, name, url, func }) => {
  return (
    <li className="px-2 py-1 hover:bg-gray-400 rounded-md" onClick={func}>
      <Link href={url} className="flex items-center gap-2" passHref>
        <span className="font-bold">{icon}</span>
        <span>{name}</span>
      </Link>
    </li>
  );
};
const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigation = useRef();
  const { sidebar, screen } = useSelector((state) => state.adminNav);
  useEffect(() => {
    const handler = () => {
      dispatch(setScreen(window.innerWidth));
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });
  useEffect(() => {
    if (screen < 1024) {
      dispatch(closeNavbar());
    } else {
      dispatch(openNavbar());
    }
  }, [screen]);
  useEffect(() => {
    const handler = (event) => {
      if (!navigation.current.contains(event.target)) {
        dispatch(closeNavbar());
      }
    };
    if (screen < 1024 && sidebar) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  });
  const clickHandler = () => {
    if (screen < 1024 && sidebar) {
      dispatch(closeNavbar());
    }
  };
  return (
    <div
      ref={navigation}
      className={`w-72 transition-transform duration-200 drop-shadow-lg overflow-y-auto bg-[#f6f6f6] h-screen fixed lg:relative z-10 lg:block`}
      style={{ transform: sidebar ? "translateX(0px)" : "translateX(-300px)" }}
    >
      <div className="flex shadow-md p-3 items-center justify-between">
        <Link href="/" className="flex gap-3" passHref>
          <Image alt="logo" width={60} height={50} className='rounded-full' src="https://res.cloudinary.com/dzat8mbl6/image/upload/v1693554058/Screenshot_from_2023-09-01_13-09-55_esr3dz.png" />
          <p className="tracking-tight text-xl font-extrabold">EazyShop</p>
        </Link>
        {screen < 1024 && (
          <button
            type="button"
            className="cursor-pointer p-1 hover:bg-gray-300 rounded-full"
            onClick={clickHandler}
          >
            <RxCross1 size={20} />
          </button>
        )}
      </div>
      <div className=" p-3">
        {sideItem.map((item, index) => {
          return (
            <div className="my-4" key={index}>
              <h2 className="uppercase text-[gray] select-none text-md font-semibold">
                {item.title}
              </h2>
              <ul>
                {item.items?.map((child, i) => (
                  <NavItem
                    key={i}
                    name={child.name}
                    url={
                      child.name === "Ecommerce"
                        ? "/admin"
                        : `/admin/${child.name.toLowerCase()}`
                    }
                    icon={child.icon}
                    func={() => clickHandler()}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;
