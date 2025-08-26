import moment from "moment";

export const convertDateFormat = (date, foramt) => {
    if (!date) return moment().format(foramt);
    return moment(date).format(foramt);
}
