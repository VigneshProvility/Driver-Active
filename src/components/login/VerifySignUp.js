import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-toastify";

const EMAIL_REGAX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function VerifySignUp() {
    const [email, setEmail] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!EMAIL_REGAX.test(email)) return setBtnDisable(true);
        setBtnDisable(false);
    }, [email]);


    function emailInput(e) {
        const value = e.target.value;
        setEmail(value);
    }

    function forgotPassClick(e) {
        e.preventDefault();
        setEmail('');
        toast.success('Success', {
            onClose: () => {
                navigate('/login');
            }
        });
    }


    return (
        <div
            className="d-flex align-items-center forgot-password justify-content-center min-vh-100 bg-cover w-100 h-75">
            <div className="login-box forgot-password-form card p-4 shadow-lg">
                <div className="brand-logo mb-3"></div>
                <h2 className="text-center fw-bolder mb-4">verification</h2>
                <h6 className="text-center fs-6">Verification 6 digit code
                </h6>
                <Link to="/sign-up">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </Link>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email<span
                            className="text-danger">*</span></label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={email}
                               onChange={emailInput}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Verification code<span
                            className="text-danger">*</span></label>
                        <input type="password" className="form-control" id="email" placeholder=""
                               />
                    </div>
                    <button type="submit" className="btn btn-login forgot-password-btn w-100" disabled={btnDisable}
                            onClick={forgotPassClick}>
                        Verify
                    </button>
                </form>
            </div>
        </div>
    )
}

export default VerifySignUp;
