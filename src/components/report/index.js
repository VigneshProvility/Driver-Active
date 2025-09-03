import React from "react";
import { FaChevronRight } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const REPORT_LIST = [
    {
        title: 'Trip Sheet',
        link: '/trip-sheet-report',

    },
    {
        title: 'Vehicle Owner Sheet',
        link: '/vehicle-owner-sheet-report',
    },
];

function Report() {
    const navigate = useNavigate();
    function getMenuList() {
        const emptyCount = 8 - REPORT_LIST.length;
        const emptyList = [...Array(emptyCount)].map(() => ({ title: '' }));
        return [...REPORT_LIST, ...emptyList];
    }

    return (
        <>
            <div className="report-header">Report</div>
            <div className="list">
                <ul>
                    {getMenuList().map((item, index) => (
                        <li key={index} className={`title ${item.title.length ? 'title-pointer': ''}`} onClick={() => navigate(item.link)}>
                            <span>{item.title}</span>
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
