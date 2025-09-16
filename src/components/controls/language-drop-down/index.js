import React, {useEffect, useState} from "react";
import Select, { components } from "react-select";
import {useTranslation} from "react-i18next";
import {getLanguageFromLocalStorage, setLanguageToStorage} from "../../../services/local-storage";
import {LANGUAGE_INFO_LIST} from "../../../services/language-selection";

// Custom option (used in dropdown list)
const customOption = (props) => (
    <components.Option {...props}>
        <div className="dropdown-option">
            <img src={props.data.flagUrl} alt={props.data.label} />
            {!props.selectProps.collapse ? null : <span>{props.data.label}</span>}
        </div>
    </components.Option>
);

// Custom selected value (shows in the box)
const customSingleValue = (props) => (
    <components.SingleValue {...props}>
        <div className="dropdown-single-value">
            <img src={props.data.flagUrl} alt={props.data.label} />
            {!props.selectProps.collapse ? null : <span>{props.data.label}</span>}
        </div>
    </components.SingleValue>
);

const customDropdownIndicator = (props) => {
    const { collapse } = props.selectProps;
    if (!collapse) return null; // hide arrow when collapsed
    return <components.DropdownIndicator {...props} />;
};


export default function LanguageSelection(props) {

    const [selectedLang, setSelectedLang] = useState(LANGUAGE_INFO_LIST[0]);

    function handleSelectLang(lang) {
        setSelectedLang(lang); // UI purpose
        i18n.changeLanguage(lang.value); // used to change the language to the app
        setLanguageToStorage(lang.value); // reuse purpose
    }

    const {i18n } = useTranslation();

    useEffect(() => {
        const currentLang = getLanguageFromLocalStorage();
        const langInfo = LANGUAGE_INFO_LIST.find(l => l.value === currentLang);
        langInfo && handleSelectLang(langInfo);
    }, []);

    return <Select
        value={selectedLang}
        options={LANGUAGE_INFO_LIST}
        components={{ Option: customOption, SingleValue: customSingleValue, DropdownIndicator: customDropdownIndicator }}
        classNamePrefix="my-select"
        onChange={handleSelectLang}
        collapse={props.isCollapsed}
    />
}
