import './Navbar.css'

export default function Navbar() {

    const navbarItems = ["Home", "History", "Category", ]

    return<>
    <div className="navbarContent">

        <div className="navbarLeftContent">
            <p>MoneyMe</p>
        </div>

        <div className="navbarRightContent">
            <ul className="navbarList">
                {navbarItems.map((item, index) => (
                    <li key={index} className="navbarItem">
                        <a href={item}>{item}</a>
                    </li>
                ))}
            </ul>

            
        </div>
        
        <div className='navbarUtilities'>
                <p className='toggleTheme'>⏾</p>
                <p className='settings'>⛭</p>
        </div>
        
        
    </div>
    </>
}