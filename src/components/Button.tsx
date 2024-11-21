import React, { FormEvent } from 'react'

type Props = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: string;
}

export const Button = ({ onClick, children }: Props) => {
    return (
        <>
            <button type='button' className='btn btn-green-500' onClick={onClick}>{children}</button>
        </>
    )
}
