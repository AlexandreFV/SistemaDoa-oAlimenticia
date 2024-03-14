import React from 'react';

const Input = ({ name, className, type }) => {
    return (
        <input
            name={name}
            className={className}
            type={type}
        />
    );
}

export default Input;
