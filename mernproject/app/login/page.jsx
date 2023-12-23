"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@redux/slices/configUser";
import { useLoginMutation } from "@redux/slices/api";
import Cookies from "js-cookie";
const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    login(value)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        Cookies.set("EazyShopping", res?.token, { expires: 7 });
        dispatch(setToken(res?.token));
        router.push("/");
      })
      .catch((error) => toast.error(error?.data?.message));
  };
  const inputHandler = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex items-center h-[550px]">
      <div className=" shadow-lg bg-[#f6f6f6] my-4 p-4 rounded-md mx-auto w-[350px]">
        <h1 className="text-2xl font-bold py-4">Login</h1>
        <form className="flex form gap-4 flex-col" onSubmit={loginHandler}>
          <div className="relative">
            <input
              className="rounded w-full px-3 py-2 input_field "
              type="email"
              name="email"
              placeholder=""
              onInput={inputHandler}
              value={value.email}
              required
            />
            <p className="absolute label">Email</p>
          </div>
          <div className="relative">
            <input
              className="rounded-sm px-3 w-full py-2 input_field"
              type="password"
              placeholder=""
              value={value.password}
              onInput={inputHandler}
              name="password"
              required
            />
            <p className="absolute label">Password</p>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex gap-2">
              <input type="checkbox" name="" id="" />
              <p className="text-xs ">Remember password</p>
            </div>
            <Link
              className="text-xs hover:underline text-blue-600"
              href="/password/forgotpassword?"
            >
              Forgot password?
            </Link>
          </div>
          <button
            disabled={isLoading}
            className={`bg-blue-400 py-2 rounded-md ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
