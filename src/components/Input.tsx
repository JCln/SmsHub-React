import React, { useRef, useState } from 'react'

export const Input = ({ title, icon, ...rest }: any) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    console.log("ref", inputRef?.current?.value);
    return (
        <input
            ref={inputRef}
            {...rest}
            onChange={(e) => setValue(e.target.value)}
        >
        </input>
    )
}