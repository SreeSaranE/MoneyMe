import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import ThemeService from '../../features/theme/services/theme.service';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const themeService = ThemeService();
    const [currentTheme, setCurrentTheme] = useState('');

    const navItems = ['Dashboard', 'Transaction', 'Category'];

    const navItemsIcon = ['𓃑', '↔', '⌂'];

    useEffect(() => {
        ToggleTheme();
    }, []);

    function ToggleTheme() {
        themeService.toggleTheme();
        setCurrentTheme(themeService.getTheme());
    }

    return (
        <nav className="navbarContent">

            <div className="leftNavbarContent">
                <p className="name">MoneyMe</p>
            </div>

            <div className="middleNavbarContent">
                {navItems.map((item, index) => (
                    <NavLink
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className="navItems"
                    >
                        <span className="navText">{item}</span>
                        <span className="navIcon">{navItemsIcon[index]}</span>
                    </NavLink>
                ))}
            </div>

            <div className="rightNavbarContent">

                <button
                    className="icon-btn theme-btn"
                    onClick={ToggleTheme}
                    aria-label="Toggle theme"
                >
                    {currentTheme === 'light' ? '☀︎' : '⏾'}
                </button>

                <Link
                    className="settings"
                    to="/settings"
                    aria-label="Settings"
                >
                    ⛭
                </Link>

            </div>

        </nav>
    );
}