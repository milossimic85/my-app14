import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveStorageToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpiritionDate = localStorage.getItem("expiritionTime");

  const remainingTime = calculatingRemainingTime(storedExpiritionDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiritionTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const calculatingRemainingTime = (expiritionTime) => {
  const currentTime = new Date().getTime();
  const adjExpiritionTime = new Date(expiritionTime).getTime();

  const remainigDuration = adjExpiritionTime - currentTime;
  return remainigDuration;
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStorageToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken();
    localStorage.removeItem("token");
    localStorage.removeItem("expiritionTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expiritionTime) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expiritionTime", expiritionTime);
    setToken(token);

    const remainingTime = calculatingRemainingTime(expiritionTime);

    const logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      const logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
