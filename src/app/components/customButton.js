import React from 'react';
import Link from 'next/link';

const CustomButton = ({ href, className, buttonText, textStyle }) => {
    return (
        <Link href={href}>
            <button className={className}>
                <span style={textStyle}>{buttonText}</span>
            </button>
        </Link>
    );
}

export default CustomButton;