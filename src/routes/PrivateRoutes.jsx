import React from "react";

const AdminLayout = React.lazy(() => import("../layouts/admin/AdminLayout"));
const DashboardPage = React.lazy(() => import("../pages/admin/dashborad"));
const CategoryPage = React.lazy(() => import("../pages/admin/managerCategory"));
const ProductPage = React.lazy(() => import("../pages/admin/managerProduct"));

const PrivateRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "manager-product",
        element: <ProductPage />,
      },
      {
        path: "manager-category",
        element: <CategoryPage />,
      },
    ],
  },
];

export default PrivateRoutes;
