import React from 'react';

const QuestionSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Question Type Skeleton */}
            <div className="mb-5">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>

            {/* Question Content Skeleton */}
            <div className="mb-5">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-32 bg-gray-200 rounded w-full"></div>
            </div>

            {/* Category & Subcategory Skeleton */}
            <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            </div>

            {/* Answer Options Skeleton */}
            <div className="mb-5">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="space-y-2">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="h-10 bg-gray-200 rounded w-full"></div>
                    ))}
                </div>
            </div>

            {/* Feedback Skeleton */}
            <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-20 bg-gray-200 rounded w-full"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-20 bg-gray-200 rounded w-full"></div>
                </div>
            </div>

            {/* URLs Skeleton */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default QuestionSkeleton;
