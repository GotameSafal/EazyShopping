"use client";
import { openNavbar } from "@redux/slices/adminNav";
import {
  RxHamburgerMenu,
  BsChatLeft,
  MdNotificationsNone,
} from "@utils/iconExport";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const NavButton = ({ title, icon, customFunc, dotNum }) => {
  return (
    <div
      className="hover:scale-110  transition-transform duration 300 cursor-pointer flex relative w-8 h-8 rounded-full items-center justify-center"
      onClick={customFunc}
    >
      <div className="text-xl">{icon}</div>

      {dotNum && (
        <div className="absolute bg-red-500 flex items-center justify-center rounded-full w-4 h-4 top-0 left-[60%]">
          {dotNum}
        </div>
      )}
    </div>
  );
};

const AdminNavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { sidebar, screen } = useSelector((state) => state.adminNav);
  const burgerClick = () => {
    if (screen < 1024 || !sidebar) dispatch(openNavbar());
  };
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success(data?.message);
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full h-[52px] px-2 bg-[#f6f6f6] shadow-md flex justify-between items-center">
      <NavButton icon={<RxHamburgerMenu />} customFunc={burgerClick} />
      <div className="flex gap-2 items-center">
        <NavButton icon={<BsChatLeft />} dotNum={3} customFunc={() => {}} />
        <NavButton
          icon={<MdNotificationsNone />}
          dotNum={3}
          customFunc={() => {}}
        />
        <div className="flex gap-3 ">
          <Image
            src="https://res.cloudinary.com/dzat8mbl6/image/upload/v1693554058/Screenshot_from_2023-09-01_13-09-55_esr3dz.png"
            alt="logo.png"
            width={32}
            height={32}
            className="rounded-full"
          />
          <button
            className="py-1 px-2 rounded-md border-gray-400"
            onClick={logoutHandler}
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
