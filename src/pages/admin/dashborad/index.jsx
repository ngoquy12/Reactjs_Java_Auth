import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashbord() {
  const data = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    // Chuyển hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Đăng xuất</Button>
    </div>
  );
}
