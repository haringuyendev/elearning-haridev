import React from "react";

const QuizAttemptsSkeleton = () => {
  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        
        {/* Title Skeleton */}
        <div className="section-title d-flex justify-content-between align-items-center mb-4">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-button" />
        </div>

        {/* Tab Skeleton */}
        <div className="advance-tab-button mb--30">
          <ul className="tab-button-style-2 d-flex justify-content-start">
            <li><div className="skeleton skeleton-tab" /></li>
            <li><div className="skeleton skeleton-tab" /></li>
          </ul>
        </div>

        {/* Content Skeleton */}
        <div className="skeleton skeleton-content mb-2" />
        <div className="skeleton skeleton-content mb-2" />
        <div className="skeleton skeleton-content mb-2" />
        <div className="skeleton skeleton-content mb-2" />

      </div>

      {/* ✨ Internal CSS ngay trong component */}
      <style jsx>{`
        .skeleton {
          background: linear-gradient(90deg, #eee, #ddd, #eee);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 6px;
        }
        .skeleton-title {
          width: 30%;
          height: 24px;
        }
        .skeleton-button {
          width: 80px;
          height: 24px;
        }
        .skeleton-tab {
          width: 100px;
          height: 30px;
          margin-right: 10px;
        }
        .skeleton-content {
          width: 100%;
          height: 20px;
          margin-bottom: 12px;
        }
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizAttemptsSkeleton;
