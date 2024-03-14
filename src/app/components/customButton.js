import React from 'react';
import Link from 'next/link';

const CustomButton = ({ href, className, buttonText }) => {
    return (
        <Link href={href}>
            <button className={className} >{buttonText}</button>
        </Link>
    );
}

export default CustomButton;