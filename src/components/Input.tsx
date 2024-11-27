import React, { useRef, useState } from 'react'

export const Input = ({ title, icon, ...rest }: any) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    console.log("ref", inputRef?.current?.value);
    return (
        <div className='input-group mb-3'>
            <span
                className="input-group-text"
                id={title}>
                {icon}
            </span>
            <input
                ref={inputRef}
                {...rest}
                onChange={(e) => setValue(e.target.value)}
            >
            </input>
        </div>
    )
}