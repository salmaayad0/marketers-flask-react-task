import React, { FC, ReactNode } from 'react';
import { FORM_STYLE }from "../styles/style"


interface FormProps {
    children: ReactNode,
    onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void,
}

const Form: FC<FormProps> = ({ children, onSubmit }) => {
    return (
        <form className={FORM_STYLE} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;