import React, { FormEvent } from 'react'

type Props = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: string;
}

export const Button = ({ onClick, children }: Props) => {
    return (
        <>
            <button className='' onClick={onClick}>{children}</button>
        </>
    )
}
