import { RouterProvider } from "react-router-dom";
import router from "./router";
import ThemeService from "../features/theme/services/theme.service";

ThemeService().initializeTheme();

function App() {
    return <RouterProvider router={router} />
}
export default App;