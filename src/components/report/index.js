import React from "react";
import { FaChevronRight } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const REPORT_LIST = [
    {
        title: 'trip sheet',
        link: '/trip-sheet-report',

    },
    {
        title: 'vehicle owner sheet',
        link: '/vehicle-owner-sheet-report',
    },
];

function Report() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    function getMenuList() {
        const emptyCount = 8 - REPORT_LIST.length;
        const emptyList = [...Array(emptyCount)].map(() => ({ title: '' }));
        return [...REPORT_LIST, ...emptyList];
    }

    return (
        <>
            <div className="report-header">{t ("Report")}</div>
            <div className="list">
                <ul>
                    {getMenuList().map((item, index) => (
                        <li key={index} className={`title ${item.title.length ? 'title-pointer': ''}`} onClick={() => navigate(item.link)}>
                            <span>{t (item.title)}</span>
                            {item.title.length > 0 && (
                                <span className="arrow-right"><FaChevronRight /></span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Report;
