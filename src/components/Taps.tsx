import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { NAV_STYLE } from '../styles/style'


const Taps: FC = () => {
  return (
      <nav className={NAV_STYLE}>
          <Link
              to={"/"}
              className="w-1/2 absolute top-1 left-12 font-bold"
          >
              Log In
          </Link>
          <Link
              to={"/signup"}
              className="w-1/2 absolute top-1 left-52 font-bold"
          >
              Sign Up
          </Link>
      </nav>
  )
}

export default Taps