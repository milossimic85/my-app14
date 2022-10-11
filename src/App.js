import { Switch, Route, Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import Watch from "./components/Watch/Watch";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./components/store/auth-context";
import Search from "./Search/Search";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Location from "./components/Location/Location";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentLocation from "./components/current-location/CurrentLocation";
import { OPEN_WEATHER_API, weatherKey } from "./components/api";

function App() {
  const authCtx = useContext(AuthContext);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(null);

  const onSearchChangeHandler = (searchData) => {
    const [lat, lon] = searchData.value.split("");
    const currentWeatherFetch = fetch(
      `${OPEN_WEATHER_API}?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`
    );

    Promise.all([currentWeatherFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
    });
  };
  const addSucessHandler = (data) => {
    if (data) {
      toast.success(data);
      setValue(data);
      setShow(true);
    }
  };

  const addHandler = (data) => {
    if (data) {
      toast.error(data);
      setValue(data);
      setShow(true);
    }
  };
  return (
    <Layout>
      <Watch />
      {show && (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      <Location />
      //
      <CurrentLocation />
      <Search onSearchChange={onSearchChangeHandler} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage onAddDataSuccess={addSucessHandler} onAdd={addHandler} />
          </Route>
        )}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
