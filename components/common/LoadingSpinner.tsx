import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="rbt-card variation-01 rbt-hover" style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="rbt-progress-style">
                <div className="rbt-progress-icon">
                    Loading...
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
