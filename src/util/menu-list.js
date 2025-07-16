import {FaBell, FaCalendarAlt, FaChartBar, FaEuroSign, FaHome, FaUser} from "react-icons/fa";

export const MENU_LIST = [
    {
        title: "Home",
        link: "/home-page",
        icon: <FaHome />,
    },
    {
        title: "Notification",
        link: "/notification",
        icon: <FaBell />,
    },
    {
        title: "Earnings",
        link: "/earnings",
        icon: <FaEuroSign />,
    },
    {
        title: "Shift",
        link: "/shift",
        icon: <FaCalendarAlt />,
    },
    {
        title: "Profile",
        link: "/profile",
        icon: <FaUser />,
    },
    {
        title: "Report",
        link: "/report",
        icon: <FaChartBar />,
    },
]
