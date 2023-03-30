import React, { useState } from "react";
import Logo from "../images/Logo.png"

function LoginForm({ onLogin, fetchUsersData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [postLogin] = usePostLoginMutation()

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user)).then(fetchUsersData)
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    // const loginObj = {username, password}
    // postLogin(loginObj)
  }

  return (
      <div className="ui segment">
        <form onSubmit={handleSubmit} className="ui form">
        <img src={Logo} />
        <div className="ui large header">Log In</div>
        <div className="ui center aligned basic segment">
          <div className="ui form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

          </div>

        </div>

          <button variant="fill" color="primary" type="submit" className="ui primary fluid button">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
  );
}

export default LoginForm;