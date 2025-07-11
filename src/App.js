import "./styles/main.scss";
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import SignInForm from "./components/login/SignInForm";
import ForgotPassword from "./components/login/forgotPassword";
import SignUP from "./components/login/sign-up";
import VerifySignUp from "./components/login/VerifySignUp";
import ForgotPasswordVerify from "./components/login/forgot-password-verify";
import Home from "./components/home/home";

import {AuthProvider} from "./contexts/auth-context";
import ProtectedRoute from "./protected-route";


function App() {
    return (
        <>
            <ToastContainer
                position="bottom-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                autoClose={2000} // 2sec
            />
            <AuthProvider>
                <Router basename="/CodeDriver">
                    <Routes>
                        {/* Public routes (no auth needed) */}
                        <Route path="/" element={<SignInForm />} />
                        <Route path="/login" element={<SignInForm />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/sign-up" element={<SignUP />} />
                        <Route path="/verification-sign-up" element={<VerifySignUp />} />
                        <Route path="/forgot-password-verify" element={<ForgotPasswordVerify />} />

                        {/* Protected route */}
                        <Route path="/home-page"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }/>
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    )
        ;
}

export default App;
