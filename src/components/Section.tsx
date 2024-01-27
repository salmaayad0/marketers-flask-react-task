import React, { FC, ReactNode } from 'react';
import { SEC_STYLE } from "../styles/style"


interface SectionProps {
    children: ReactNode,
}

const Section: FC<SectionProps> = ({ children }) => {
    return (
        <section className={SEC_STYLE}>
            {children}
        </section>
    );
};

export default Section;