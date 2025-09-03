import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {getAuthCredentials} from "../../util/login";
import {setUserCrendIntoLocalStorage} from "../../services/local-storage";
import {useAuth} from "../../contexts/auth-context";
import Loader from "../loader";
import {AUTH_REDUCER_INFO} from "../../util/reducer";
import {initProfileInfo} from "../../services/driver-workspace";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authorized = useAuth()
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    function canShowLoader() {
        if (!loading) return;
        return <div style={{textAlign: "center", marginTop: "50px"}}>
            <Loader size={50} color="tomato"/>
        </div>
    }

    async function onLoginClick(e) {
        try {
            e.preventDefault();
            setLoading(true);
            const userCred = await getAuthCredentials(email, password);
            setUserCrendIntoLocalStorage(userCred);
            dispatch({type: AUTH_REDUCER_INFO.LOGIN, payload: userCred});
            authorized.login(userCred);
            navigate('/home-page');
            await initProfileInfo();
            toast.success('Success', {
                onClose: () => {
                    setEmail('');
                    setPassword('');

                }
            })
        } catch (error) {
            toast.error(error.message);
            setPassword('');
        } finally {
            setLoading(false);
        }

    }


    return <>
        {canShowLoader()}
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
                        <p>Don't have an account? <Link to="/sign-up"
                                                        className="primary-color fw-bold  text-decoration-none">Sign
                            Up</Link></p>

                    </div>
                </form>
            </div>
        </div>
    </>
}
