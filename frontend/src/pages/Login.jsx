import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { useRef, useEffect } from "react";


function Login() {

  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] =
  useState(false);

  const emailRef = useRef(null);
const passwordRef = useRef(null);

useEffect(() => {
  const timer = setTimeout(() => {
    if (!userId.trim()) {
      emailRef.current?.focus();
    } else if (!password.trim()) {
      passwordRef.current?.focus();
    }
  }, 2000);

  return () => clearTimeout(timer);
}, [userId, password]);

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

    const response = await axios.get(
      "http://localhost:8080/api/users"
    );

    const users = response.data;

    // Check whether Mail ID exists
    const existingUser = users.find(
      (user) => user.userId === userId
    );

    if (!existingUser) {

      setErrors({
        userId: "Mail ID doesn't exist",
        password: ""
      });

      setMessage("");
      return;
    }

    // Check password
    if (existingUser.password !== password) {

      setErrors({
        userId: "",
        password: "Wrong password"
      });

      setMessage("");
      return;
    }

    // Login Successful
    setErrors({});
    setMessage("Login Successful");

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "loggedInUser",
      existingUser.userId
    );

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  } catch (error) {

    console.error(error);

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
  ref={emailRef}
  type="text"
  placeholder="Ex: example@gmail.com"
  value={userId}
  onChange={(e) => {
    setUserId(e.target.value);

    setErrors((prev) => ({
      ...prev,
      userId: "",
      password: "",   
    }));

    setMessage("");
  }}
/>

          <span className="error">
            {errors.userId}
          </span>

        </div>

        <div className="row">

          <label>Password</label>

          <div className="password-wrapper">

 <input
  ref={passwordRef}
  type={showPassword ? "text" : "password"}
  placeholder="8-12 chars, 1 capital, 1 special"
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);

    setErrors((prev) => ({
      ...prev,
      userId: "",      
      password: "",
    }));

    setMessage("");
  }}
  onCopy={(e) => e.preventDefault()}
  onPaste={(e) => e.preventDefault()}
  onCut={(e) => e.preventDefault()}
/>

  <span
    className="eye-icon"
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
  >
    {showPassword ? "🙈" : "👀"}
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
            Change Password?
          </Link>

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

        </div>

        <div className="register-link">

          <Link to="/register">
            Create Account?
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;