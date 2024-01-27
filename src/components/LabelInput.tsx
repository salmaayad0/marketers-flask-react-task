import React, { FC } from 'react'
import { LABEL_STYLE, INPUT_SRYLE } from '../styles/style'

interface labelInputProps {
    text: 'Email' | 'Password' | 'Confirmed Password' | 'User Name'
    type: 'email' | 'password' | 'text',
    id: string,
    name: 'email' | 'password' | 'username',
    value: any,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFocus?: () => void,
    onBlur?: () => void

}


const LabelInput: FC<labelInputProps> = ({ type, id, name, value, onChange, onBlur, onFocus }) => {

    return (
        <>
            <label
                htmlFor={id}
                className={LABEL_STYLE}
            >
                {name}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                className={INPUT_SRYLE}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                //   ref={emailRef}
                autoComplete="off"
                required
            />
        </>
    )
}

export default LabelInput