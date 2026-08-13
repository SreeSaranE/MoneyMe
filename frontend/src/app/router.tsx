import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../Pages/dashboard/DashboardPage";
import CategoryPage from "../Pages/category/CategoryPage";
import TransactionPage from "../Pages/transaction/TransactionPage";
import AppLayout from "./layout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
      },
    ],
  },

  // {path: "", element: < />},
]);

export default router;