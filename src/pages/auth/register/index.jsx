import { Button, Input, message, notification } from "antd";
import React, { useState } from "react";
import { validateEmail } from "../../../utils/validateData";
import { register } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateData = (name, value) => {
    let invalid = true;
    switch (name) {
      case "fullName":
        if (!value) {
          setFullNameError("Họ và tên không được để trống");
          invalid = false;
        } else {
          setFullNameError("");
        }
        break;

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
          if (value.length < 8) {
            setPasswordError("Mật khẩu phải dài tối thiểu 8 ký tự");
            invalid = false;
          } else {
            setPasswordError("");
          }
        }
        break;

      case "confirmPassword":
        if (!value) {
          setConfirmPasswordError("Mật khẩu không được để trống");
          invalid = false;
        } else {
          if (value !== user.password) {
            setConfirmPasswordError("Xác nhận mật khẩu không đúng");
            invalid = false;
          } else {
            setConfirmPasswordError("");
          }
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

    const fullNameValid = validateData("fullName", user.fullName);
    const emailValid = validateData("email", user.email);
    const passwordValid = validateData("password", user.password);
    const confirmPasswordValid = validateData(
      "confirmPassword",
      user.confirmPassword
    );

    if (fullNameValid && emailValid && passwordValid && confirmPasswordValid) {
      delete user.confirmPassword;
      try {
        // Submit forrm
        const response = await register(user);

        if (response.status == 201) {
          // CHuyển hướng về đăng nhập
          navigate("/login");

          // Hiển thị thông báo
          notification.success({
            message: "Thành công",
            description: response.data,
          });
        }
      } catch (error) {
        const responseError = error?.response?.data;

        const errorObj = Object.values(responseError);

        message.error(errorObj[0]);
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
              Đăng ký tài khoản
            </h3>
          </header>
          <main className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="fullName">Họ và tên &#42;</label>
              <Input
                onChange={handleChange}
                name="fullName"
                status={fullNameError ? "error" : ""}
                id="fullName"
                className="h-10"
              />

              {fullNameError && (
                <p className="absolute bottom-[-24px] text-[14px] text-red-500">
                  {fullNameError}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="email">Email &#42;</label>
              <Input
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
              <label htmlFor="password">Mật khẩu &#42;</label>
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
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu &#42;</label>
              <Input.Password
                status={confirmPasswordError ? "error" : ""}
                onChange={handleChange}
                name="confirmPassword"
                id="confirmPassword"
                className="h-10"
              />

              {confirmPasswordError && (
                <p className="absolute bottom-[-24px] text-[14px] text-red-500">
                  {confirmPasswordError}
                </p>
              )}
            </div>
          </main>
          <footer className="mt-4">
            <Button htmlType="submit" className="w-full h-10" type="primary">
              Đăng ký
            </Button>
          </footer>
        </form>
      </div>
    </>
  );
}
