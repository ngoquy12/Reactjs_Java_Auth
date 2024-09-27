import React, { useEffect } from "react";
import HeaderLayout from "./header";
import MenuLayout from "./menu";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFormCookie } from "../../services/authService";
import Cookies from "js-cookie";

export default function AdminLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(Cookies.get("token"));

    dispatch(loadUserFormCookie(token));
  }, []);
  return (
    <>
      <HeaderLayout />
      <Outlet />
      <MenuLayout />
    </>
  );
}
