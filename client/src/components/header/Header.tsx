import React from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";

function Header() {
  const loggedInUser = useAppSelector(userSelector);

  return (
    <div>
      <div>LOGO</div>
      <div className="user_container">
         <h3>hello {loggedInUser?.first_name}</h3>
          <h3>Ready to play?</h3>
      </div>
      <div className="user_settings">
           <p>notifications</p>
           <p>settings</p>
           <p>LOG OUT</p>
      </div>
    </div>
  );
}

export default Header;
