import React, {useState} from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaGlobe,
    FaPowerOff
} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { Tooltip } from 'react-tooltip';

import {MENU_LIST} from "../../util/menu-list";
import {useAuth} from "../../contexts/auth-context";

const initialMenu = (() => {
    const path = window.location.pathname.toLowerCase();
    const menuInfo = MENU_LIST.find((menu) =>
        path.includes(menu.title.toLowerCase())
    );
    return menuInfo ? menuInfo.title : "home";
})();


function SidebarMenu(props) {
    const {isCollapsed, collapseMenu} = props
    const [activeMenu, setActiveMenu] = useState(initialMenu);
    const navigate = useNavigate();
    const {logout} = useAuth();

    function onMenuChange(menuInfo) {
        setActiveMenu(menuInfo.title);
        navigate(menuInfo.link);
    }

    return <>
            <aside className={`sidebar ${!isCollapsed ? "collapsed" : ""}`}>
                {/* Top */}
                <div className="sidebar__top">
                    <h2 className="sidebar__logo">{isCollapsed && "Driver Portal"}</h2>
                    <button
                        className="sidebar__collapse-btn"
                        onClick={() => collapseMenu(!isCollapsed)}>
                        {!isCollapsed ? <FaChevronRight/> : <FaChevronLeft/>}
                    </button>
                </div>

                {/* Menu */}
                <nav className="sidebar__nav">
                    <ul>
                        {MENU_LIST.map((item, index) => (
                            <li
                                key={index}
                                data-tooltip-id={`menu-tooltip-${index}`}
                                data-tooltip-content={item.title}
                                className={item.title.toLowerCase() === activeMenu.toLowerCase() ? "active" : ""}
                                onClick={() => onMenuChange(item)}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                                <Tooltip id={`menu-tooltip-${index}`} place="right" />
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom */}
                <div className="sidebar__bottom">
                    <div className="sidebar__lang">
                        <FaGlobe/>
                        {isCollapsed && <span>English</span>}
                    </div>
                    <div data-tooltip-id={`sign-out`} data-tooltip-content={"Sign Out"} className="sidebar__logout" onClick={() => logout()}>
                        <FaPowerOff/>
                        {isCollapsed && <span>Sign Out</span>}
                        <Tooltip id={`sign-out`} place="right" />
                    </div>
                    <div className="sidebar__version">{!isCollapsed ? '3.7.4' : 'Version 3.7.4'}</div>
                </div>
            </aside>
        </>;
}

export default SidebarMenu;
