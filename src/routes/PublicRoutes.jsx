import React from "react";
import UserLayout from "../layouts/user/UserLayout";

const HomePage = React.lazy(() => import("../pages/user/home"));
const AboutPage = React.lazy(() => import("../pages/user/about"));
const ContactPage = React.lazy(() => import("../pages/user/contact"));
const LoginPage = React.lazy(() => import("../pages/auth/login"));
const RegisterPage = React.lazy(() => import("../pages/auth/register"));
const ListProductPage = React.lazy(() => import("../pages/user/listProduct"));
const ProductDetailPage = React.lazy(() =>
  import("../pages/user/productDetail")
);

const PublicRoutes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "list-product",
        element: <ListProductPage />,
      },
      {
        path: "product-detail/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export default PublicRoutes;
