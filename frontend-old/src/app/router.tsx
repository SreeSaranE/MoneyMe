import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../Pages/dashboard/DashboardPage";
import CategoryPage from "../Pages/category/CategoryPage";
import AppLayout from "../layouts/AppLayout";
import TransactionPage from "../Pages/transaction/TransactionPage";


const router = createBrowserRouter([

    { element: <AppLayout />,
        children: [
            {path: "/", element: <DashboardPage />},
            {path: "/dashboard", element: <DashboardPage />},
            {path: "category", element: <CategoryPage />},
            {path: "/transaction", element: <TransactionPage />},
          
        ]
    },

    // {path: "", element: < />},
])


export default router;