import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const MAX_VERIFICATION_CODE = 6;
const DEFAULT_STATE = {code: '', confirmPassword: '', password: ''};

function ForgotPasswordVerify() {
    const [passwordInfo, setPasswordInfo] = useState(DEFAULT_STATE);
    const [btnDisable, setBtnDisable] = useState(true);
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false
    });
    const navigate = useNavigate();

    function onPasswordEnter(evt, valuePath) {
        setPasswordInfo(prev => (
            {
                ...prev,
                [valuePath]: evt.target.value
            }
        ));
    }

    function forgotPassVerifyClick(e) {
        e.preventDefault();  // Prevent form submission and page reload
        toast.success('Success', {
            onClose: () => {
                setPasswordInfo(DEFAULT_STATE);
                navigate('/login');
            }
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function canShowResetBtn() {
        const {code, password, confirmPassword} = passwordInfo;
        return code && code.length === MAX_VERIFICATION_CODE && password.length && confirmPassword === password;
    }

    useEffect(() => {
        if(canShowResetBtn()) {
            return setBtnDisable(false);
        }
        setBtnDisable(true);
    },[canShowResetBtn, passwordInfo])

    const togglePassword = (valuePath) => {
        setShowPassword(prev => ({
            ...prev,
            [valuePath]: !prev[valuePath]
        }));
    };

    return <div className="d-flex align-items-center forgot-password justify-content-center min-vh-100 bg-cover w-100">
        <div className="login-box card p-4 shadow-sm forgot-password-form">
            <div className="brand-logo mb-3"></div>
            <h2 className="text-center fw-bolder mb-4">Forgot Password</h2>
            <Link to="/forgot-password">
                <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
            </Link>
            <form>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label fw-semibold">Verification Code<span
                        className="text-danger">*</span></label>
                    <input type="number"  maxLength={6} className="form-control" id="code" placeholder="Code" value={passwordInfo.code} onChange={(event) => onPasswordEnter(event, 'code')}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">Password<span
                        className="text-danger">*</span></label>
                    <input type={showPassword.password ? 'text' : 'password'} className="form-control" id="password" placeholder="Password" value={passwordInfo.password} onChange={(event) => onPasswordEnter(event, 'password')}/>
                    <span className="position-absolute top-60 translate-middle-y fa-eye" onClick={() => togglePassword("password")}> {showPassword.password ? <FaEye /> : <FaEyeSlash /> } </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">Confirm Password<span
                        className="text-danger">*</span></label>
                    <input type={showPassword.confirm ? 'text' : 'password'} className="form-control" id="confirmPassword" placeholder="Password" value={passwordInfo.confirmPassword} onChange={(event) => onPasswordEnter(event, 'confirmPassword')}/>
                    <span className="position-absolute top-70 translate-middle-y fa-eye fa-eye1" onClick={() => togglePassword("confirm")}> {showPassword.confirm ? <FaEye /> : <FaEyeSlash /> } </span>
                </div>
                <button type="submit" className="btn btn-login forgot-password-btn w-100" disabled={btnDisable} onClick={forgotPassVerifyClick}>Reset Password</button>
            </form>
        </div>
    </div>
}

export default ForgotPasswordVerify;
