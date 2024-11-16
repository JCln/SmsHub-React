import React, { useRef, useState } from 'react'

export const Input = () => {
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    console.log("ref", inputRef?.current?.value);
    return (
        <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
        >
        </input>
    )
}
