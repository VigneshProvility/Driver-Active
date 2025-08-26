import React from "react";
import {ToastContainer} from "react-toastify";
import {BrowserRouter as Router} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

import {persistor, store} from "../store";

import {AuthProvider} from "../contexts/auth-context";
import SignInForm from "../components/login/SignInForm";
import ForgotPassword from "../components/login/forgotPassword";
import SignUP from "../components/login/sign-up";
import VerifySignUp from "../components/login/VerifySignUp";
import ForgotPasswordVerify from "../components/login/forgot-password-verify";
import ProtectedRoute from "../protected-route";
import SidebarMenuWithHeader from "../components/sidebar-menu-with-header";
import Home from "../components/home";
import Report from "../components/report";
import TripReport from "../components/report/list/trip-sheet";

import '../language-selection';


function Routers() {
    return <>
        <ToastContainer
            position="bottom-center"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            autoClose={2000} // 2sec
        />
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AuthProvider>
                    <Router basename="/">
                        <Routes>
                            {/* Public routes (no auth needed) */}
                            <Route path="/" element={<SignInForm/>}/>
                            <Route path="/login" element={<SignInForm/>}/>
                            <Route path="/forgot-password" element={<ForgotPassword/>}/>
                            <Route path="/sign-up" element={<SignUP/>}/>
                            <Route path="/verification-sign-up" element={<VerifySignUp/>}/>
                            <Route path="/forgot-password-verify" element={<ForgotPasswordVerify/>}/>

                            {/* Protected route */}
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <SidebarMenuWithHeader />
                                    </ProtectedRoute>
                                }
                            >
                                <Route index path="home-page" element={<Home />} />
                                <Route path="report" element={<Report />} />
                                <Route path="trip-sheet-report" element={<TripReport />} />
                            </Route>
                        </Routes>
                    </Router>
                </AuthProvider>
            </PersistGate>
        </Provider>
    </>
}

export default Routers;
