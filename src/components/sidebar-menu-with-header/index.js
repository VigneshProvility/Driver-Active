import React, {useState} from "react";
import {Outlet} from "react-router-dom";


import Header from "./header";
import SidebarMenu from "./sidebar-menu";


function Index({children}) {
    const [collapsed, setCollapsed] = useState(false);
    function collapseMenu() {
        setCollapsed(prev => !prev);
    }

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <SidebarMenu isCollapsed={collapsed} collapseMenu={collapseMenu} />
            {/* Main Content */}
            <main className="dashboard_content col-12">
                {children || (
                    <>
                        <Header collapseMenu={collapseMenu}/>
                        <div className={"mt-2 ml-2"}>
                        <Outlet/>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default Index;
