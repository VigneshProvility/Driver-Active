import React, { useEffect, useState } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaPowerOff
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Select from "react-select";


import { MENU_LIST } from "../../util/menu-list";
import { useAuth } from "../../contexts/auth-context";

function SidebarMenu({ isCollapsed, collapseMenu, notifyExpiry }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const getActiveMenu = (pathname) => {
        const path = pathname.toLowerCase();
        const menuInfo = MENU_LIST.find(menu =>
            path.includes(menu.title.toLowerCase())
        );
        return menuInfo ? menuInfo.title : "home";
    };

    // initialize from current path
    const [activeMenu, setActiveMenu] = useState(getActiveMenu(location.pathname));

    // update on route change
    useEffect(() => {
        setActiveMenu(getActiveMenu(location.pathname));
    }, [location.pathname]);

    function onMenuChange(menuInfo) {
        setActiveMenu(menuInfo.title);
        navigate(menuInfo.link);
    }

    return (
        <aside className={`sidebar ${!isCollapsed ? "collapsed" : ""}`}>
            {/* Top */}
            <div className="sidebar__top">
                <h2 className="sidebar__logo">
                    {isCollapsed && "Driver Portal"}
                </h2>
                <button
                    className="sidebar__collapse-btn"
                    onClick={() => collapseMenu(!isCollapsed)}
                >
                    {!isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
            </div>

            {/* Menu */}
            <nav className="sidebar__nav">
                <ul>
                    {MENU_LIST.map((item) => (
                        <li
                            key={item.title}
                            data-tooltip-id={`menu-tooltip-${item.title}`}
                            data-tooltip-content={item.title}
                            className={
                                activeMenu?.toLowerCase() === item.title.toLowerCase()
                                    ? "active"
                                    : ""
                            }
                            onClick={() => onMenuChange(item)}
                        >
                            {item.icon}
                            {item.title.includes('Notification') && notifyExpiry > 0 ? <span className={"alert-notification"}></span> : null}
                            <span className={!isCollapsed ? 'sidebar-title' : ''}>{item.title}</span>
                            <Tooltip id={`menu-tooltip-${item.title}`} place="right"/>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom */}
            <div className="sidebar__bottom">
                <div className="sidebar__lang">
                    {isCollapsed && <div>
                        <Select
                            placeholder="Select a fruit"
                        />
                    </div>}
                </div>
                <div
                    data-tooltip-id="sign-out"
                    data-tooltip-content="Sign Out"
                    className="sidebar__logout"
                    onClick={logout}
                >
                    <FaPowerOff />
                    {isCollapsed && <span>Sign Out</span>}
                    <Tooltip id="sign-out" place="right" />
                </div>
                <div className="sidebar__version">
                    {!isCollapsed ? "3.7.4" : "Version 3.7.4"}
                </div>
            </div>
        </aside>
    );
}

export default SidebarMenu;
