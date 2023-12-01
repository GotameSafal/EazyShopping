"use client";
import { AiOutlineGooglePlus, BsFacebook } from "@utils/iconExport";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@redux/slices/api";
const SignPage = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  let [value, setValue] = useState({
    email: "",
    password: "",
    username: "",
    repassword: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await register(value);
      if (response.data) {
        toast.success(response?.data?.message);
        router.push("/login");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const changeHandler = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex items-center h-[550px]">
      <div className=" shadow-lg bg-[#f6f6f6] my-4 p-4 rounded-md mx-auto w-[350px]">
        <h1 className="text-2xl font-bold py-4">Signup</h1>
        <form className="flex form gap-4 flex-col" onSubmit={submitHandler}>
          <div className="relative">
            <input
              className="rounded w-full px-3 py-2 input_field "
              type="text"
              placeholder=""
              name="username"
              onChange={changeHandler}
              value={value.username}
              required
            />

            <p className="absolute label">Username</p>
          </div>

          <div className="relative">
            <input
              className="rounded w-full px-3 py-2 input_field "
              type="email"
              placeholder=""
              name="email"
              onChange={changeHandler}
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
              name="password"
              onChange={changeHandler}
              value={value.password}
              required
            />
            <p className="absolute label">Password</p>
          </div>
          <div className="relative">
            <input
              className="rounded-sm px-3 w-full py-2 input_field"
              type="password"
              placeholder=""
              name="repassword"
              onChange={changeHandler}
              value={value.repassword}
              required
            />
            <p className="absolute label">Confirm password</p>
          </div>
          <button
            disabled={isLoading}
            className={`bg-blue-400 py-2 rounded-md ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            type="submit"
          >
            Signin
          </button>
        </form>
        <div className="mt-4 pb-6 flex flex-col gap-3">
          <p className="text-sm font-semibold">or, Sign up with</p>
          <div className="grid gap-2 grid-cols-2">
            <div className=" cursor-pointer flex gap-3 py-2 rounded-md bg-red-500 justify-center">
              <AiOutlineGooglePlus size={25} />
              <p>Google</p>
            </div>
            <div className="bg-blue-500 cursor-pointer gap-3 flex py-2 rounded-md justify-center">
              <BsFacebook className="text-white" size={25} />
              <p>Facebook</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignPage;
