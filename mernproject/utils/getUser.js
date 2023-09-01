"use client";
import { setUser } from "@redux/slices/configUser";
import axios from "axios";

export const updateUserOnGlobalStore = async (dispatch) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/me`,
    { withCredentials: true }
  );
  if (data?.success) {
    dispatch(setUser(data?.user));
  }
};
