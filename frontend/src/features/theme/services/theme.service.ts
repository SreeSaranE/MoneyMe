import type { Theme } from "../types/theme.types";

const STORAGE_KEY = "theme";

const ThemeService = () => {
    const getTheme = (): Theme => {
        const theme = localStorage.getItem(STORAGE_KEY);

        if (theme === "light" || theme === "dark") {
            return theme;
        }

        return "light";
    };

    const setTheme = (theme: Theme) => {
        localStorage.setItem(STORAGE_KEY, theme);

        document.documentElement.setAttribute("data-theme", theme);
    };

    const initializeTheme = () => {
        setTheme(getTheme());
    };

    const toggleTheme = () => {
        const newTheme = getTheme() === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return {
        getTheme,
        setTheme,
        toggleTheme,
        initializeTheme,
    };
};

export default ThemeService;