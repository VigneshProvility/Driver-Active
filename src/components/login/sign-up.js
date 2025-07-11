import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {toast} from "react-toastify";




export default function SignUP() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false
    });
    const navigate = useNavigate();

    function signUpClick(e) {
        e.preventDefault();
        toast.success('Success', {
            onClose: () => {
                navigate('/login');
            }
        });
    }


    const togglePassword = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-cover w-100">
            <div className="login-box card p-4 shadow-lg">
                <div className="brand-logo mb-3"></div>
                <h2 className="text-center fw-bolder mb-4">Sign Up</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email<span
                            className="text-danger">*</span></label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3 position-relative" >
                        <label htmlFor="password" className="form-label fw-semibold">Password<span
                            className="text-danger">*</span></label>
                        <input type={showPassword.password ? 'text' : 'password'}  className="form-control" id="password" placeholder="Password"
                               value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <span
                            onClick={() => togglePassword("password")}
                            className="position-absolute top-50 translate-middle-y"
                            style={{
                                bottom:'35px',
                                right: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {showPassword.password ? <FaEye /> : <FaEyeSlash /> }
                        </span>
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label fw-semibold">Confirm password<span
                            className="text-danger">*</span></label>
                        <input type={showPassword.confirm ? 'text' : 'password'} className="form-control" id="password" placeholder="Password"
                               value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <span
                            onClick={() => togglePassword("confirm")}
                            className="position-absolute top-50 translate-middle-y"
                            style={{
                                bottom:'35px',
                                right: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {showPassword.confirm ? <FaEye /> : <FaEyeSlash /> }
                        </span>
                    </div>
                    <button type="submit" className="btn btn-login w-100"  onClick={signUpClick}>Sign Up</button>
                    <div className="text-center mt-3 ">
                        <p >Already Registered <Link to="/login" className="primary-color fw-bold  text-decoration-none">Sign On</Link></p>
                    </div>
                    <div className="text-center mt-3 ">
                        <p >I have  <Link to="/verification-sign-up" className="primary-color fw-bold  text-decoration-none">verification code</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
