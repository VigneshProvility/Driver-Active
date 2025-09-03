import moment from "moment";

/**
 * @param {Object} date
 * @param {String} format
 * @returns {string} formatedDate
 */
export const convertDateFormat = (date, format) => {
    return moment(date).format(format);
}

export const MUI_STAR_PRECISION_INFO = {
    DECIMAL: 0.1, // show the star rating in decimal points eg 3.1 , 4.2
    HALF: 0.5, // show the star rating by half a star eg 1.5, 2.5
    FULL: 1, // show rating in a full star eg 1
}
