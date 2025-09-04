import {FaEye, FaEyeSlash} from "react-icons/fa";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import ConfirmDialog from "../../popup";
import {updatePassword} from "../../../services/user";
import {getDriverEmail} from "../../../services/profile";
import {toast} from "react-toastify";

// Validation schema (keys match PASSWORD_LIST)
const schema = yup.object().shape({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup
        .string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const PASSWORD_LIST = [
    {
        id: "current-password",
        title: "Current Password",
        valuePath: "currentPassword",
        placeHolder: "Current Password",
    },
    {
        id: "new-password",
        title: "New Password",
        valuePath: "newPassword",
        placeHolder: "New Password",
    },
    {
        id: "confirm-password",
        title: "Confirm Password",
        valuePath: "confirmPassword",
        placeHolder: "Confirm New Password",
    },
];

export default function PasswordChange(props) {
    const [showPassword, togglePassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [userData, setUserData] = useState(null);

    function closePasswordPage() {
        props.setCanShowNewTabs((prev) => ({
            ...prev,
            canShowPasswordChangeTab: !prev["canShowPasswordChangeTab"],
        }))
    }

    function onToggleClick(valuePath) {
        togglePassword((prev) => ({
            ...prev,
            [valuePath]: !prev[valuePath],
        }));
    }

    const handleConfirm = async () => {
        try {
            const payload = {
                username: getDriverEmail(),
                password: userData.currentPassword,
                newPassword: userData.newPassword
            }
            setOpenPopup(false);
            await updatePassword(payload);
            toast.success("Password changed successfully");
            closePasswordPage();
        } catch (error) {
            toast.error(`Error while trying to change password, ${error.message}`);
        }
    };

    const handleCancel = () => {
        setOpenPopup(false);
    };

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur", // validate only when user leaves field
    });

    const onSubmit = (data) => {
        setUserData(data);
        setOpenPopup(!openPopup)
    };

    return (
        <form
            className="password-change-container"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="row profile-header">
                <span>Password</span>
                <span className="password-description">
          Use this password to sign on the portal
        </span>
            </div>

            {PASSWORD_LIST.map((password, index) => (
                <div className="row mt-4" key={index}>
                    <div className="col-12 password-group">
                        <label className="ml-4 password-sub-header">
                            {password.title} <span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-12 password-group position-relative">
                        <input
                            className="password-field"
                            type={showPassword[password.valuePath] ? "text" : "password"}
                            placeholder={password.placeHolder}
                            {...register(password.valuePath)}
                        />
                        <span
                            onClick={() => onToggleClick(password.valuePath)}
                            className="position-absolute top-50 translate-middle-y eye-icon show-pointer"
                        >
              {showPassword[password.valuePath] ? <FaEye/> : <FaEyeSlash/>}
            </span>
                    </div>
                    {errors[password.valuePath] && (
                        <p className="p-0 mb-0 text-danger small mt-1 ml-3 password-validation-error">
                            {errors[password.valuePath].message}
                        </p>
                    )}
                </div>
            ))}

            <div className="row mt-4 button">
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary update-btn" disabled={!isValid}>
                        Update
                    </button>
                </div>
                <div className="col-12 text-center">
                    <button
                        type="button"
                        className="btn btn-primary cancel-btn"
                        onClick={closePasswordPage}>
                        Cancel
                    </button>
                </div>
            </div>
            <ConfirmDialog
                open={openPopup}
                title="Confirm Action"
                message="Do you want to commit changes?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </form>
    );
}
