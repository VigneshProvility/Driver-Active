import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import {getAuthCredentials} from "../../util/login";
import {setUserCrendIntoLocalStorage} from "../../services/local-storage";
import {useAuth} from "../../contexts/auth-context";


export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authorized = useAuth()
    const navigate = useNavigate();

    async function onLoginClick(e) {
        try {
            e.preventDefault();
            const userCred = await getAuthCredentials(email, password);
            setUserCrendIntoLocalStorage(userCred);
            authorized.login(userCred);
            toast.success('Success', {
                onClose: () => {
                    // setEmail('');
                    // setPassword('');
                    navigate('/home-page');
                }
            })
        } catch(error) {
            toast.error(error.message)
        }

    }


    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-cover w-100">
        <div className="login-box card p-4 shadow-lg">
                <div className="brand-logo mb-3"></div>
                <h2 className="text-center fw-bolder mb-4">Sign On</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Email<span
                        className="text-danger">*</span></label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">Password<span
                        className="text-danger">*</span></label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                           value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-login w-100" onClick={onLoginClick}>Sign On</button>
                <div className="text-center mt-3 ">
                    <Link to="/forgot-password" className="text-dark text-decoration-none">Forgot Password</Link>
                    <p >Don't have an account? <Link to="/sign-up" className="primary-color fw-bold  text-decoration-none">Sign Up</Link></p>

                </div>
            </form>
        </div>
        </div>
    );
}
