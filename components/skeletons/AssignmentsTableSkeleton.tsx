import React from 'react';

const AssignmentsTableSkeleton = () => {
    return (
        <tbody>
            {[...Array(5)].map((_, index) => (
                <tr key={index}>
                    <td width={'200px'}>
                        <div className="skeleton-content">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    </td>
                    <td width={'200px'}>
                        <div className="skeleton-content">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    </td>
                    <td>
                        <div className="skeleton-text"></div>
                    </td>
                    <td>
                        <div className="skeleton-text" style={{ width: '200px' }}></div>
                    </td>
                    <td>
                        <div className="rbt-button-group justify-content-end">
                            <div className="skeleton-button"></div>
                            <div className="skeleton-button"></div>
                            <div className="skeleton-button"></div>
                        </div>
                    </td>
                </tr>
            ))}
            <style jsx>{`
                .skeleton-content {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .skeleton-title {
                    height: 20px;
                    background: #f0f0f0;
                    border-radius: 4px;
                    width: 75%;
                    animation: pulse 1.5s infinite;
                }
                .skeleton-text {
                    height: 16px;
                    background: #f0f0f0;
                    border-radius: 4px;
                    width: 100%;
                    animation: pulse 1.5s infinite;
                }
                .skeleton-button {
                    width: 32px;
                    height: 32px;
                    background: #f0f0f0;
                    border-radius: 50%;
                    animation: pulse 1.5s infinite;
                }
                .rbt-button-group {
                    display: flex;
                    gap: 8px;
                }
                @keyframes pulse {
                    0% {
                        opacity: .6;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: .6;
                    }
                }
            `}</style>
        </tbody>
    );
};

export default AssignmentsTableSkeleton;
