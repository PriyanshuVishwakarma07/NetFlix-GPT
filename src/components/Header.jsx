import React from 'react'
import { NETFLEX_LOGO } from '../utils/constents'
const Header = () => {
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10">
      <img
        className="w-44"
        src={NETFLEX_LOGO}
        alt="logo"
      />
    </div>
  );
};
export default Header;