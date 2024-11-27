import React, { useRef, useState } from 'react'
import { Input } from './Input';

type Props = {
    placeholder: string;
    name: string;
    icon?: string;
    label: string;
    type: string;
    className?: string;
}

export const Inputs = ({ placeholder, icon, name, label, type }: Props) => {
    const [value, setValue] = useState('');
    return (
        <div className='input-group mb-3'>
            <span
                className="input-group-text"
                id={name}>
                {icon}
            </span>
            <Input
                name={name}
                icon={icon}
                placeholder={placeholder}
                label={label}
                aria-label={label}
                type={type}
                aria-describedby="basic-addon1"
                className="form-control"
            >

            </Input>
            <input
            >
            </input>
        </div>
    )
}