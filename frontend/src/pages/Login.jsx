import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {

  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] =
  useState(false);

  const validate = () => {

    let newErrors = {};

    if (!userId.trim()) {

      newErrors.userId = "Required";
    }

    if (!password.trim()) {

      newErrors.password = "Required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors)
      .length === 0;
  };

  const loginUser = async () => {

    if (!validate()) {
      return;
    }

    try {

      const response =
        await axios.get(
          "http://localhost:8080/api/users"
        );

      const users = response.data;

      const validUser = users.find(
        (user) =>
          user.userId === userId &&
          user.password === password
      );

      if (validUser) {

       localStorage.setItem(
       "isLoggedIn",
       "true"
      ); 
      
       localStorage.setItem(
      "loggedInUser",
       validUser.userId
       );
       
      setMessage(
        "Login Successful"
      );

      setTimeout(() => {
    navigate("/dashboard");
  }, 1000);
      

    } else {

        setMessage(
          "Invalid User ID or Password"
        );
      }

    } catch (error) {

      setMessage(
        "Backend Connection Failed"
      );
    }
  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1>LOGIN</h1>

        <p
  className={
    message === "Login Successful"
      ? "success-message"
      : "error-message"
  }
>
  {message}
</p>

        <div className="row">

          <label>Mail ID</label>

          <input
            type="text"
            placeholder="Ex: example@gmail.com"
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
          />

          <span className="error">
            {errors.userId}
          </span>

        </div>

        <div className="row">

          <label>Password</label>

          <div className="password-wrapper">

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="8-12 chars, 1 capital, 1 special"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <span
    className="eye-icon"
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
  >
    {showPassword ? "🙈" : "👁️"}
  </span>

</div>

          <span className="error">
            {errors.password}
          </span>

        </div>

        <button onClick={loginUser}>
          LOGIN
        </button>

        <div className="links">

          <Link to="/change-password">
            Change Password
          </Link>

          <Link to="/forgot-password">
            Forgot Password
          </Link>

        </div>

        <div className="register-link">

          <Link to="/register">
            New User? Register Here
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;