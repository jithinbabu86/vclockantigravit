import React from 'react';

const CuckooClockIcon = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        {/* Roof */}
        <path d="M22 9L12 2L2 9" />
        {/* House Body */}
        <path d="M6 9v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9" />
        {/* Cuckoo Door */}
        <path d="M10 5h4v4h-4z" />
        <path d="M12 5v4" />
        {/* Clock Face */}
        <circle cx="12" cy="15" r="3" />
        <path d="M12 15l1-1" />
        <path d="M12 15v2" />
        {/* Weights/Pendulum hints */}
        <path d="M10 22v2" />
        <path d="M14 22v2" />
    </svg>
);

export default CuckooClockIcon;
