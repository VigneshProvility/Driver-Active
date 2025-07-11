import React, { useState } from "react";
import {
    FaHome,
    FaBell,
    FaEuroSign,
    FaCalendarAlt,
    FaUser,
    FaChartBar,
    FaPowerOff,
    FaGlobe,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

const MENU_LIST = [
    {
        title: "Home",
        link: "/dashboard",
        icon: <FaHome />,
    },{
        title: "Notification",
        link: "/dashboard",
        icon: <FaBell />,
    },{
        title: "Earnings",
        link: "/dashboard",
        icon: <FaEuroSign />,
    },{
        title: "Shift",
        link: "/dashboard",
        icon: <FaCalendarAlt />,
    },{
        title: "Profile",
        link: "/dashboard",
        icon: <FaUser />,
    },{
        title: "Report",
        link: "/dashboard",
        icon: <FaChartBar />,
    },

]

const Home = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className={`sidebar ${!collapsed ? "collapsed" : ""}`}>
                {/* Top */}
                <div className="sidebar__top">
                    <h2 className="sidebar__logo">{collapsed && "Driver Portal"}</h2>
                    <button
                        className="sidebar__collapse-btn"
                        onClick={() => setCollapsed(!collapsed)}>
                        {!collapsed ? <FaChevronRight /> : <FaChevronLeft />}
                    </button>
                </div>

                {/* Menu */}
                <nav className="sidebar__nav">
                    <ul>
                        {MENU_LIST.map((item, index) => (
                            <li key={index}>
                                {item.icon}
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom */}
                <div className="sidebar__bottom">
                    <div className="sidebar__lang">
                        <FaGlobe />
                        {!collapsed && <span>English</span>}
                    </div>
                    <div className="sidebar__logout">
                        <FaPowerOff />
                        {!collapsed && <span>Sign Out</span>}
                    </div>
                    {!collapsed && <div className="sidebar__version">Version 3.7.4</div>}
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard__content">
                {children || (
                    <>
                        <h1>Welcome!</h1>
                        <p>This is your dashboard content.</p>
                    </>
                )}
            </main>
        </div>
    );
};

export default Home;
