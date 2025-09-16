import i18n from "i18next";

export const LANGUAGE_INFO_LIST = [
    {'label': 'English', 'value': 'en', flagUrl: 'images/flags/canada-flag.svg'},
    {'label': 'English', 'value': 'en', flagUrl: 'images/flags/uk-flag.png'},
    {'label': 'English', 'value': 'en', flagUrl: 'images/flags/usa-flag.svg'},
    {'label': 'Finnish', 'value': 'fi', flagUrl: 'images/flags/finnish-flag.svg'},
    {'label': 'Swedish', 'value': 'sv', flagUrl: 'images/flags/swedish-flag.svg'}
];

export const getTranslatedValue = (message) => {
    const translatedMsg = i18n.t(message);
    return translatedMsg;
};
