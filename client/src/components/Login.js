import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Login({ onLogin, fetchUsersData }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="ui center aligned grid">
      <div className="row"></div>
      <div className="row"></div>
      <div className="row"></div>
      <div className="row"></div>
      <div className="row"></div>
      <div className="row"></div>
      <div className="row"></div>
      <div className="row"></div>
      <div className="row"></div>
        <div className="ui center aligned grid">

        {showLogin ? (
          <div className="column" id="column">
            <LoginForm onLogin={onLogin} fetchUsersData={fetchUsersData} />
            
            <div className="ui segment">
              Don't have an account? &nbsp;
              <button color="secondary" onClick={() => setShowLogin(false)} className="ui button">
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="column">
            <SignUpForm onLogin={onLogin} />
            <div className="ui segment">
              Already have an account? &nbsp;
              <button color="secondary" onClick={() => setShowLogin(true)} className="ui button">
                Log In
              </button>
            </div>
          </div>
        )}  
        </div>
    </div>
  );
}

export default Login;