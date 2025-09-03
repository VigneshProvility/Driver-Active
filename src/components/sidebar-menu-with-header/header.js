import {FaStar, FaBars} from "react-icons/fa";
import React from "react";
import {Rating} from "@mui/material";


function Header({collapseMenu}) {
    return <>
        <header className="custom-header">
            <div className="header-left">
                <FaBars className={'mobile-menu'}  onClick={collapseMenu}/>
            </div>

            <div className="header-center">
                <h1 className="logo-text">
                    <span className="logo-dark">TaxiBook</span><span className="logo-green">ai</span>
                </h1>
            </div>

            <div className="header-right">
                <div className="profile-box">
                    <img src="https://via.placeholder.com/32" alt="profile" className="profile-img"/>
                    <div className="rating-box">
                        <span>1</span>
                        <Rating name="rating" value={3.4} precision={0.1}/>
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
