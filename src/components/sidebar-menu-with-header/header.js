import {FaBars} from "react-icons/fa";
import React from "react";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";


function Header({collapseMenu, notifyExpiry}) {
    const navigate = useNavigate();

    function canShowBellIcon() {
        if (!notifyExpiry) return;
        return <img src={'images/bell.png'} className='show-pointer' alt="" onClick={() => navigate('/notification')} />;
    }

    return <>
        <header className="custom-header row">
            <div className="header-left col-4">
                <FaBars className={'mobile-menu'}  onClick={collapseMenu}/>
            </div>

            <div className="header-center col-4">
                <h1 className="logo-text">
                    <span className="logo-dark">TaxiBook</span><span className="logo-green">ai</span>
                </h1>
            </div>

            <div className="header-right col-4">
                <div className="profile-box">
                    { canShowBellIcon()}
                    <img src="https://via.placeholder.com/32" alt="profile" className="profile-img"/>
                    <div className="rating-box">
                        <span>1</span>
                        <Rating className={'rating-star'} name="rating" value={3.4} precision={0.1}/>
                    </div>
                    {/*<div className="datetime-box">*/}
                    {/*    <div>{1223}</div>*/}
                    {/*    <div>{'tue'}</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </header>
    </>
}

export default Header;
