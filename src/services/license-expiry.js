import {getDriverLicense} from "./profile";
import moment from "moment";

const NOTIFICATION_DAY_LIMIT = 10;
const WARNING = 'warning';
const EXPIRY = 'text-danger';

function licenseExpiryDaysCount(expiryDate) {
    const currentDate = moment();
    const endDate = moment(expiryDate);
    return endDate.diff(currentDate, "days");
}

function getDriverExpiryDaysCount() {
    const [driverExpiry, driverLicenseExpiry, taxiBadgeExpiry] = getDriverLicense();
    const driverExpiryDaysCount = licenseExpiryDaysCount(driverExpiry.endTime);
    const driverLicenseExpiryDaysCount = licenseExpiryDaysCount(driverLicenseExpiry.endTime);
    const driverBadgeExpiryDaysCount = licenseExpiryDaysCount(taxiBadgeExpiry.endTime);
    return {
        driverExpiryDaysCount,
        driverLicenseExpiryDaysCount,
        driverBadgeExpiryDaysCount,
    }

}

/**
 * @param {number} days
 * @returns {boolean}
 */
function canShowNotificationMessage(days) {
    return days < NOTIFICATION_DAY_LIMIT;
}

function getNotificationInfo(message, type) {
    return {
        message,
        type
    }
}

function prepareNotificationMessage(message, daysCount) {
    const DAYS = 'days';
    if (!canShowNotificationMessage(daysCount)) return;
    if (daysCount > 0) {
        const formattedMsg = `${message} Expires in ${daysCount} ${DAYS}`;
        return getNotificationInfo(formattedMsg, WARNING)
    }
    const formattedMsg = `${message} Expired`;
    return getNotificationInfo(formattedMsg, EXPIRY);
}

export const driverExpiryList = () => {
    const driverExpiryDaysCount = getDriverExpiryDaysCount();
    const licenseExpiryMsg = prepareNotificationMessage('Licence', driverExpiryDaysCount.driverExpiryDaysCount);
    const driverLicenseExpiryMsg = prepareNotificationMessage('Driver Licence', driverExpiryDaysCount.driverLicenseExpiryDaysCount);
    const taxiBadgeLicenseExpiryMsg = prepareNotificationMessage('Taxi Badge', driverExpiryDaysCount.driverBadgeExpiryDaysCount);
    return [licenseExpiryMsg, driverLicenseExpiryMsg, taxiBadgeLicenseExpiryMsg];
}

export const licenseExpiryCount = () => {
    return driverExpiryList().reduce((acc, curr) => {
        return curr?.type === EXPIRY ? acc + 1 : acc;
    }, 0);
}
