import React, {useState} from "react";
import ConfirmDialog from "../../popup";
import {toast} from "react-toastify";
import {updateAddressForDriver} from "../../../services/profile";
import {useTranslation} from "react-i18next";

export default function AddressChange(props) {
    const [address, setAddress] = React.useState(props.address);
    const [openPopup, setOpenPopup] = useState(false);
    const {t} = useTranslation();

    function closeAddressPage() {
        props.setCanShowNewTabs((prev) => ({
            ...prev,
            canShowAddressChangeTab: !prev["canShowAddressChangeTab"],
        }))
    }

    const handleConfirm = async () => {
        try {
            await updateAddressForDriver(address);
            setOpenPopup(false);
            toast.success("Address changed successfully");
            closeAddressPage();
        } catch (error) {
            toast.error(`Error while trying to change the address, ${error.message}`);
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
                <span>{t('address')}</span>
                <span className="address-description">{t ('Keep your address up-to-date')}</span>
            </div>
            <div className="row mt-4">
                <div className="col-12 address-group">
                    <label className="ml-4 address-sub-header"> {t ('Home Address')}<span className="text-danger">*</span>
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
                        {t ('Update')}
                    </button>
                </div>
                <div className="col-12 text-center">
                    <button
                        type="button"
                        className="btn btn-primary cancel-btn" onClick={closeAddressPage}>
                        {t ('Cancel')}
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
