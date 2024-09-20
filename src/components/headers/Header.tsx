import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "@assets/tv.png";
import { appContext } from "@context/index";
import * as routePaths from "@constants/routePaths.contant";
import "@styles/components/headers.css";
import AvatarMenu from "../menus/AvatarMenu";

interface Props {
  dark?: boolean;
}

const Header: React.FC<Props> = ({ dark }) => {
  const context = appContext();

  const headerHandler = () => {
    const scrollY = window.scrollY;
    const header = document.getElementById("header");
    if (header) {
      if (scrollY > 64) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerHandler);

    return () => {
      window.removeEventListener("scroll", headerHandler);
    };
  }, []);

  return (
    <header id="header" className={`header ${dark && "dark"}`}>
      <NavLink to={routePaths.HOME_PAGE}>
        <img src={logo} alt="logo" /> <p>Moviebox</p>
      </NavLink>

      {!context.user && (
        <NavLink to={routePaths.AUTH_SIGNIN_PAGE}>Signin</NavLink>
      )}

      {context.user && <AvatarMenu />}
    </header>
  );
};

export default Header;
