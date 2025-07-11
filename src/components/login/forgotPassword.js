import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-toastify";

const EMAIL_REGAX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!EMAIL_REGAX.test(email)) return setBtnDisable(true);
        setBtnDisable(false);
    }, [email]);


    function passwordInput(e) {
        const value = e.target.value;
        setEmail(value);
    }

    function forgotPassClick(e) {
        e.preventDefault();  // Prevent form submission and page reload
        toast.success('Success', {
            onClose: () => {
                setEmail('');

                navigate('/forgot-password-verify');
            }
        });
    }


    return (
        <div
            className="d-flex align-items-center forgot-password justify-content-center min-vh-100 bg-cover w-100 h-75">
            <div className="login-box forgot-password-form card p-4 shadow-lg">
                <div className="brand-logo mb-3"></div>
                <h2 className="text-center fw-bolder mb-4">Forgot Password</h2>
                <Link to="/login">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </Link>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email<span
                            className="text-danger">*</span></label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={email}
                               onChange={passwordInput}/>
                    </div>
                    <button type="submit" className="btn btn-login forgot-password-btn w-100" disabled={btnDisable}
                            onClick={forgotPassClick}>Send
                        Verify Code
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;
