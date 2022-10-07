import { useContext, useRef, useState } from "react";
import { findAllInRenderedTree } from "react-dom/test-utils";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errored, setErrored] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    history.push("/");
    event.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTeXLBZykOoY7GpMCePUGvmw4A0zZq-NQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTeXLBZykOoY7GpMCePUGvmw4A0zZq-NQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "aplication/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expiritionTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expiritionTime.toISOString());
        props.onAddSuccess("Authentication success!");
      })
      .catch((error) => {
        props.onAddData(`${error.message}. Try again!`);
      });

    inputEmailRef.current.value = "";
    inputPasswordRef.current.value = "";
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" ref={inputEmailRef} id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            ref={inputPasswordRef}
            id="password"
            required
          />
        </div>
        {passwordIsValid && (
          <div>
            <p>Something</p>
          </div>
        )}
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
