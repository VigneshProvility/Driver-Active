import React, {useState} from "react";
import {Outlet} from "react-router-dom";


import Header from "./header";
import SidebarMenu from "./sidebar-menu";
import {licenseExpiryCount} from "../../services/license-expiry";


function Index({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const notifyExpiry = licenseExpiryCount();


    function collapseMenu() {
        setCollapsed(prev => !prev);
    }

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <SidebarMenu isCollapsed={collapsed} collapseMenu={collapseMenu} notifyExpiry={notifyExpiry} />
            {/* Main Content */}
            <main className="dashboard_content">
                {children || (
                    <>
                        <Header collapseMenu={collapseMenu} notifyExpiry={notifyExpiry}/>
                        <div className={"mt-2 ml-2"}>
                        <Outlet/>
                        </div>
                        <div className='col-12'>
                            <img className='copy-right' src={'images/copy-rights-mobile.png'} alt="logo"/>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default Index;
