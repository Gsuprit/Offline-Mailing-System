import { useState, useRef, useEffect } from "react";
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

  const [showPopup, setShowPopup] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const loginBtnRef = useRef(null);

  // First cursor only
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

 const validate = () => {

  let newErrors = {};

  if (!userId.trim()) {

    newErrors.userId = "Required";

  }
  else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userId)) {

    newErrors.userId = "Enter a valid mail ID";

  }

  if (!password.trim()) {

    newErrors.password = "Required";

  }

  setErrors(newErrors);

  if (newErrors.userId) {

    emailRef.current.focus();

    return false;

  }

  if (newErrors.password) {

    passwordRef.current.focus();

    return false;

  }

  return true;

};

  const loginUser = async () => {

    if (!validate()) return;

    try {

      const response =
        await axios.get(
          "http://localhost:8080/api/users"
        );

      const users = response.data;

      const existingUser =
        users.find(
          (user) =>
            user.userId === userId
        );

      if (!existingUser) {

        setErrors({
  userId: "Mail ID doesn't exist",
  password: ""
});

setMessage("");

emailRef.current.focus();

return;

      }

      if (
        existingUser.password !==
        password
      ) {

        setErrors({
  userId: "",
  password: "Wrong password"
});

setMessage("");

passwordRef.current.focus();

return;

      }

     setErrors({});

setMessage("Login Successful");

setShowPopup(true);

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

}, 2000);
    }

    catch (error) {

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
            message ===
            "Login Successful"
              ? "success-message"
              : "error-message"
          }
        >
          {message}
        </p>

        {/* Mail ID */}

        <div className="row">

          <label>Mail ID</label>

         <input
  ref={emailRef}
  type="text"
  placeholder="Ex: example@gmail.com"
  value={userId}
  onChange={(e) => {

    let value = e.target.value;

    // Allow only letters, numbers, @ and .
    value = value.replace(/[^a-zA-Z0-9@.]/g, "");

    setUserId(value);

    setErrors((prev) => ({
      ...prev,
      userId: "",
      password: ""
    }));

    setMessage("");

  }}
  onKeyDown={(e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      passwordRef.current.focus();

    }

  }}
/>

          <span className="error">
            {errors.userId}
          </span>

        </div>

        {/* Password */}

        <div className="row">

          <label>Password</label>

          <div className="password-wrapper">

            <input
              ref={passwordRef}
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="8-12 chars, 1 capital, 1 special"
              value={password}
              onChange={(e) => {

                setPassword(
                  e.target.value
                );

                setErrors(prev => ({
                  ...prev,
                  userId: "",
                  password: ""
                }));

                setMessage("");

              }}
              onCopy={(e)=>e.preventDefault()}
              onPaste={(e)=>e.preventDefault()}
              onCut={(e)=>e.preventDefault()}
              onKeyDown={(e)=>{

                if(e.key==="Enter"){

                  e.preventDefault();

                  loginBtnRef.current.focus();

                }

              }}
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword
                ? "🙈"
                : "👀"}
            </span>

          </div>

          <span className="error">
            {errors.password}
          </span>

        </div>

        {/* Login */}

        <button
          ref={loginBtnRef}
          onClick={loginUser}
          onKeyDown={(e)=>{

            if(e.key==="Enter"){

              e.preventDefault();

              loginUser();

            }

          }}
        >
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

          {/* Login Success Popup */}

{showPopup && (

  <div className="popup-overlay">

    <div className="popup-box">

      <h2>Login Successful</h2>

      <p>Welcome Back!</p>

      <p className="redirect-text">
        Redirecting to Dashboard...
      </p>

    </div>

  </div>

)}
      </div>

    </div>

  );

}

export default Login;