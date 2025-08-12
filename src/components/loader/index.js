import React from "react";

const Loader = ({ size = 40, color = "#3498db" }) => {
    return (
        <div className="loader" style={{ width: size, height: size, borderTopColor: color }}></div>
    );
};

export default Loader;
