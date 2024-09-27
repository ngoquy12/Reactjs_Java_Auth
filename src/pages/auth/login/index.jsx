import { Alert, Button, Input, message, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { validateEmail } from "../../../utils/validateData";
import { Link, useNavigate } from "react-router-dom";
import { login, verifyToken } from "../../../services/authService";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { ROLE_ADMIN } from "../../../constants/role";
import { text } from "../../../resources/resourceVN";

export default function Login() {
  const navigate = useNavigate();
  const inputRefFocus = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputRefFocus) {
      inputRefFocus.current.focus();
    }
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorServer, setErrorServer] = useState(false);

  const validateData = (name, value) => {
    let invalid = true;
    switch (name) {
      case "email":
        if (!value) {
          setEmailError("Email không được để trống");
          invalid = false;
        } else {
          if (!validateEmail(value)) {
            setEmailError("Email không đúng định dạng");
            invalid = false;
          } else {
            setEmailError("");
          }
        }
        break;

      case "password":
        if (!value) {
          setPasswordError("Mật khẩu không được để trống");
          invalid = false;
        } else {
          setPasswordError("");
        }
        break;

      default:
        break;
    }

    return invalid;
  };

  // Lấy giá trị từng ô input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    validateData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValid = validateData("email", user.email);
    const passwordValid = validateData("password", user.password);

    if (emailValid && passwordValid) {
      try {
        setIsLoading(true);
        // Submit form
        const resultAction = await dispatch(login(user));

        const originalPromiseResult = unwrapResult(resultAction);

        if (originalPromiseResult) {
          // Gọi hàm giải mã token
          const resultVerify = await verifyToken(
            originalPromiseResult.accessToken
          );

          // Kiểm tra quyền
          if (resultVerify.roles.some((item) => item.roleName === ROLE_ADMIN)) {
            // Chuyển hướng về dashboard
            navigate("/admin");
          } else {
            navigate("/");
            // Chuyển hướng về trang chủ
          }

          // Hiển thị thông báo
          notification.success({
            message: "Thành công",
            description: "Đăng nhập thành công",
          });
        }
      } catch (error) {
        const responseError = error?.response?.data?.error;

        setErrorServer(responseError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[450px] border px-6 py-5 rounded-lg shadow-sm flex flex-col gap-5"
        >
          <header>
            <h3 className="text-center font-bold text-[24px]">
              {text.loginAccount}
            </h3>
          </header>
          <main className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="email">{text.email} &#42;</label>
              <Input
                ref={inputRefFocus}
                status={emailError ? "error" : ""}
                onChange={handleChange}
                name="email"
                id="email"
                className="h-10"
              />
              {emailError && (
                <p className="absolute bottom-[-24px] text-[14px] text-red-500">
                  {emailError}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password">{text.password} &#42;</label>
              <Input.Password
                status={passwordError ? "error" : ""}
                onChange={handleChange}
                name="password"
                id="password"
                className="h-10"
              />
              {passwordError && (
                <p className="absolute bottom-[-24px] text-[14px] text-red-500">
                  {passwordError}
                </p>
              )}
            </div>
          </main>
          <footer className="mt-4">
            {errorServer && (
              <Alert className="mb-3" type="error" message={errorServer} />
            )}
            <Button
              loading={isLoading}
              htmlType="submit"
              className="w-full h-10"
              type="primary"
            >
              {text.login}
            </Button>
            <p className="text-center mt-3">
              {text.notAccount}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-500"
              >
                {text.register}
              </Link>
            </p>
          </footer>
        </form>
      </div>
    </>
  );
}
