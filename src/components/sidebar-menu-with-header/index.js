import React from "react";
import {Outlet} from "react-router-dom";


import Header from "./header";
import SidebarMenu from "./sidebar-menu";


function Index({children}) {

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <SidebarMenu/>
            {/* Main Content */}
            <main className="dashboard_content">
                {children || (
                    <>
                        <Header/>
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
