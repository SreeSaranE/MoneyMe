import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import ThemeService from '../../features/theme/services/theme.service';
import { useEffect, useState } from 'react';


export default function Navbar() {

    const themeService = ThemeService();
    const [currentTheme, setCurrentTheme] = useState('');
    
    const navItems= ["Dashboard", "Transaction"]

    useEffect(() => {ToggleTheme()}, [])

    function ToggleTheme() {
        
        themeService.toggleTheme();
        setCurrentTheme(themeService.getTheme());
    }

    return <>
    <div className="navbarContent">
        
        <div className='leftContent'>

            {navItems.map((item) => (
                <NavLink
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="navItems"
                >
                    {item}
                </NavLink>
            ))}
        </div>
        
        <div className='userName'>
            <p className='name'>Silicon</p>

            <button
            className="icon-btn"
            onClick={ToggleTheme}>
                <p className="theme">
                    {(currentTheme === 'light') ? '☀︎': '⏾'}
                </p>
            </button>

            <Link to="/settings" className="settings">⛭</Link>
        </div>

    </div>
    </>
}