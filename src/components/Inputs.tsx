import React, { useRef, useState } from 'react'
import { Input } from './Input';
import { InputDirectionTypes, InputTypes } from '../constants/ActionTypes';

type Props = {
    placeholder: string;
    name: string;
    icon?: string;
    label: string;
    type: InputTypes;
    direction: InputDirectionTypes;
    className?: string;
}

export const Inputs = ({ placeholder, icon, name, label, type, direction }: Props) => {
    return (
        <Input
            name={name}
            icon={icon}
            placeholder={placeholder}
            label={label}
            aria-label={label}
            type={type}
            dir={direction}
            aria-describedby="basic-addon1"
            className="inputs"
        >
        </Input>
    )
}