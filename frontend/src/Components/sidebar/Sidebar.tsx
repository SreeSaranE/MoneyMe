import { NavLink, Link } from "react-router-dom";
import ThemeService from "../../features/theme/services/theme.service";
import { useState, useEffect } from "react";
import "./Sidebar.css";

export default function Sidebar() {
    const themeService = ThemeService();
    const [currentTheme, setCurrentTheme] = useState('');

    const navItems = ['Dashboard', 'Transaction', 'Category'];
    const navItemsIcon = [
        'fi fi-br-dashboard-panel',
        'fi fi-br-exchange',
        'fi fi-br-category'
    ];

    useEffect(() => {
        ToggleTheme();
    }, []);

    function ToggleTheme() {
        themeService.toggleTheme();
        setCurrentTheme(themeService.getTheme());
    }

    return (
        <aside className="sidebarContent">

            <div className="topSidebarContent">
                <p className="sidebarName">MoneyMe</p>
            </div>

            <div className="middleSidebarContent">
                {navItems.map((item, index) => (
                    <NavLink
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className="sidebarNavItems"
                    >
                        <span className="sidebarNavIcon">
                            <i className={navItemsIcon[index]}></i>
                        </span>

                        <span className="sidebarNavText">
                            {item}
                        </span>
                    </NavLink>
                ))}
            </div>

            <div className="rightSidebarContent">

                <button
                    className="sidebarIconBtn sidebarThemeBtn"
                    onClick={ToggleTheme}
                    aria-label="Toggle theme"
                >
                    {currentTheme === 'light' ? '☀︎' : '⏾'}
                </button>

                <Link
                    className="sidebarSettings"
                    to="/settings"
                    aria-label="Settings"
                >
                    ⛭
                </Link>

            </div>

        </aside>
    );
}