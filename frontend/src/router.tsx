import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardPage from "./Pages/dashboard/DashboardPage";
import CategoryPage from "./Pages/category/CategoryPage";


const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "dashboard", element: <DashboardPage />},
    {path: "category", element: <CategoryPage />},

    // {path: "", element: < />},
])


export default router;