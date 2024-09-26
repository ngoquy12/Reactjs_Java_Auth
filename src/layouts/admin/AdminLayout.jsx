import React from "react";
import HeaderLayout from "./header";
import MenuLayout from "./menu";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <HeaderLayout />
      <Outlet />
      <MenuLayout />
    </>
  );
}
