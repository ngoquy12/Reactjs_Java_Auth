import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosInstance";
import { GET, POST } from "../constants/httpMethod";
import Cookies from "js-cookie";

/**
 *
 * @param {*} user
 * @returns
 */
export const register = (user) => {
  const response = BASE_URL[POST]("auth/register", user);

  return response;
};

/**
 *
 * @param {*} user
 * @returns
 */
export const login = createAsyncThunk("auth/login", async (user) => {
  const response = await BASE_URL[POST]("auth/login", user);

  Cookies.set("token", JSON.stringify(response.data.accessToken));

  return response.data;
});

/**
 * Giải mã token sau khi đăng nhập
 * @param {*} token Chuỗi token cần giải mã
 * @returns Trả về thông tin chi tiết của user
 */
export const verifyToken = async (token) => {
  const response = await BASE_URL[GET]("user/info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Hàm lấy dữ liệu từ Cookie và lưu vào redux
 */
export const loadUserFormCookie = createAsyncThunk(
  "auth/loadUserFormCookie",
  async (token) => {
    return token;
  }
);
