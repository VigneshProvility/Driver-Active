import React, {useState} from "react";
import ConfirmDialog from "../../popup";
import {toast} from "react-toastify";
import {updatePhoneForDriver} from "../../../services/profile";
import {useTranslation} from "react-i18next";

export default function PhoneNumberChange(props) {
    const [address, setAddress] = React.useState(props.number);
    const [openPopup, setOpenPopup] = useState(false);
    const {t} = useTranslation();

    function closeAddressPage() {
        props.setCanShowNewTabs((prev) => ({
            ...prev,
            canShowPhoneChangeTab: !prev["canShowPhoneChangeTab"],
        }))
    }

    const handleConfirm = async () => {
        try {
            await updatePhoneForDriver(address);
            setOpenPopup(false);
            toast.success("Phone Number changed successfully");
            closeAddressPage();
        } catch (error) {
            toast.error(`Error while trying to change the number, ${error.message}`);
        }
    };

    const handleCancel = () => {
        setOpenPopup(false);
    };
    return <>
        <form
            className="address-update-container"
        >
            <div className="row profile-header">
                <span>{t ("Phone")}</span>
                <span className="address-description">{t ("Verify phone number to use")}</span>
            </div>
            <div className="row mt-4">
                <div className="col-12 address-group">
                    <label className="ml-4 address-sub-header">{t ("Phone")}<span className="text-danger">*</span>
                    </label>
                </div>
                <div className="col-12 address-group position-relative">
                    <input className="address-field" type= "text" value={address} placeholder="Home Address" onInput={(event) =>  setAddress(event.target.value)}/>
                </div>
            </div>
            <div className="row mt-4 button">
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary update-btn" disabled={!address.length} onClick={(e) => {
                        e.preventDefault(); setOpenPopup(!openPopup)}}>
                        {t ("Update")}
                    </button>
                </div>
                <div className="col-12 text-center">
                    <button
                        type="button"
                        className="btn btn-primary cancel-btn" onClick={closeAddressPage}>
                        {t ("Cancel")}
                    </button>
                </div>
            </div>
            <ConfirmDialog
                open={openPopup}
                title={t ("Confirm Action")}
                message={t ("Do you want to commit changes?")}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </form>
    </>
}
