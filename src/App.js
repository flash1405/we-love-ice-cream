import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/actions";
import Login from "./components/Login";
import IceCreamPreferences from "./components/IceCreamPreferences";

const App = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="App">
      <h1>Ice Cream Preferences App</h1>
      {currentUser ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <IceCreamPreferences />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
