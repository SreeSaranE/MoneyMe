import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../Pages/dashboard/DashboardPage";
import CategoryPage from "../Pages/category/CategoryPage";
import AppLayout from "../layouts/AppLayout";


const router = createBrowserRouter([

    { element: <AppLayout />,
        children: [
            {path: "/", element: <DashboardPage />},
            {path: "/dashboard", element: <DashboardPage />},
            {path: "category", element: <CategoryPage />},
        ]
    },

    // {path: "", element: < />},
])


export default router;