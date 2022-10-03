import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    console.log("I did");
    authCtx.logout();
    history.push("/");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          <li>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
