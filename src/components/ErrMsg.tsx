import React, { FC } from 'react'
import { ERR_STYLE } from "../styles/style";

interface errProps {
    errMsg: string | null
}

const ErrMsg : FC<errProps> = ({errMsg}) => {
  return (
    <p className={errMsg ? ERR_STYLE : "hidden"} aria-live="assertive">
      {errMsg}
    </p>
  );
}

export default ErrMsg