import React from "react";
import HeaderLayout from "./header";
import FooterLayout from "./footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <HeaderLayout />
      <Outlet />
      <FooterLayout />
    </>
  );
}
