import React, { useContext, useState } from "react";
import { UserContext } from "../utils/contexts";
import { Link } from 'react-router-dom';
import LightBGButton from './LightBGButton';
import { removeToken } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { user, setUser } = useContext(UserContext);

  return (
    <div className="absolute z-10 top-2 xs:top-4 w-full">
      <div className="container px-3 sm:px-10 font-poppins flex items-center justify-between md:justify-start">

        <Link to="/">
          <h3 className="font-bold xs:text-xl text-purple-600">Movieto</h3>
        </Link>

        <div className="text-purple-600 text-sm xs:text-base">
          { user.isLogged ?
          <React.Fragment>
            <LightBGButton text='Watchlist' goto='/watchlist' />
            <LightBGButton text='Account' goto="/account" />
          </React.Fragment>
          :
          <React.Fragment>
            <LightBGButton text='Login' goto="/login" />
            <LightBGButton text='Signup' goto="/signup"/>
          </React.Fragment>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
