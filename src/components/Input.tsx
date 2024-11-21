import React, { useRef, useState } from 'react'

type Props = {
    placeholder: string;
    name: string;
    icon: string;
    label: string
    // type: string
}

export const Input = ({ placeholder, icon, name, label }: Props) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    console.log("ref", inputRef?.current?.value);
    return (
        <div className='input-group mb-3'>
            <span className="input-group-text" id={name}>{icon}</span>
            <input type='text' ref={inputRef} className="form-control" placeholder={placeholder} aria-label={label} aria-describedby="basic-addon1" onChange={(e) => setValue(e.target.value)}>
            </input>
        </div>
    )
}