import React from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import logo from "../../images/logo.png";
function Header() {
  const loggedInUser = useAppSelector(userSelector);

  return (
      <div className="header header_grid">
        <div className="header__right">
          <div className="header__right__logo">
            <img src={logo} alt="" />
          </div>
          <div className="header__left__user_container">
            <h3>Hello {loggedInUser?.first_name}! Ready to play?</h3>
          </div>
        </div>
        <div className="header__left">
          
          <div className="header__left__user_settings">
          <span className="material-symbols-outlined">notifications</span>
            <span className="material-symbols-outlined">settings</span>
            <span className="material-symbols-outlined">logout</span>
          </div>
        </div>
      </div>
  );
}

export default Header;
