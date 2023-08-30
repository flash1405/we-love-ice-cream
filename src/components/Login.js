import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions";
import userAData from "../data/userA.json";
import userBData from "../data/userB.json";
import userCData from "../data/userC.json";

const Login = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const authenticatedUser = authenticateUser(username, password);

    if (authenticatedUser) {
      dispatch(login(authenticatedUser));
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const authenticateUser = (username, password) => {
    if (username === userAData.username && password === userAData.password) {
      return userAData;
    } else if (
      username === userBData.username &&
      password === userBData.password
    ) {
      return userBData;
    } else if (
      username === userCData.username &&
      password === userCData.password
    ) {
      return userCData;
    }
    return null;
  };

  if (currentUser) {
    return <div>Welcome, {currentUser.username}! You are logged in.</div>;
  }

  return (
    <div className="container">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <div className="login-input">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
