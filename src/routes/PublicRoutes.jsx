import React from "react";
import UserLayout from "../layouts/user/UserLayout";
import LazyLoader from "../components/LazyLoad";

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
    element: <LazyLoader children={<UserLayout />} />,
    children: [
      {
        index: true,
        element: <LazyLoader children={<HomePage />} />,
      },
      {
        path: "about",
        element: <LazyLoader children={<AboutPage />} />,
      },
      {
        path: "contact",
        element: <LazyLoader children={<ContactPage />} />,
      },
      {
        path: "list-product",
        element: <LazyLoader children={<ListProductPage />} />,
      },
      {
        path: "product-detail/:id",
        element: <LazyLoader children={<ProductDetailPage />} />,
      },
    ],
  },
  {
    path: "/login",
    element: <LazyLoader children={<LoginPage />} />,
  },
  {
    path: "/register",
    element: <LazyLoader children={<RegisterPage />} />,
  },
];

export default PublicRoutes;
