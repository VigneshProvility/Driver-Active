import {FaArrowLeft, FaArrowRight, FaCalendarAlt} from "react-icons/fa";
import DatePicker from "react-datepicker";
import React, {forwardRef} from "react";

export default function DatePickr(props) {

    const goToPreviousDay = () => {
        props.setSelectedDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() - 1);
            return newDate;
        });
    };

    const goToNextDay = () => {
        props.setSelectedDate((prev) => {
            const tomorrow = new Date(prev);
            tomorrow.setDate(prev.getDate() + 1);
            if (tomorrow > new Date()) return prev;
            return tomorrow;
        });
    };

    function canShowFrBckBtns(forward, backward) {
        if (backward) {
            return <button className="date-arrow" onClick={goToPreviousDay}>
                <FaArrowLeft />
            </button>
        }
        if (forward) {
           return <button className="date-arrow" onClick={goToNextDay}>
                <FaArrowRight />
            </button>
        }
        return false;
    }

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "6px 10px",
                cursor: "pointer",
                background: "#fff",
                width: "200px"
            }}
            onClick={onClick}
            ref={ref}
        >
            <FaCalendarAlt style={{ marginRight: "8px", color: "#555" }} />
            <span>{value || "Select a date"}</span>
        </div>
    ));

    return <div className="date-picker">
        {canShowFrBckBtns(false, props.canShowBtn.backward)}
        <DatePicker
            selected={props.selectedDate}
            onChange={(date) => props.setSelectedDate(date)}
            placeholderText="Select a date"
            dateFormat="MMM dd yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
        />
        {canShowFrBckBtns(props.canShowBtn.forward, false)}
    </div>
}
