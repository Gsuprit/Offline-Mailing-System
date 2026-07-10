import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {

  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");

  const [q1, setQ1] = useState("");
  const [a1, setA1] = useState("");

  const [q2, setQ2] = useState("");
  const [a2, setA2] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const dobRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {

    const timer = setTimeout(() => {

      if (!userId.trim()) {

        emailRef.current?.focus();

      }

      else if (!username.trim()) {

        usernameRef.current?.focus();

      }

      else if (!dob) {

        dobRef.current?.focus();

      }

      else if (!password.trim()) {

        passwordRef.current?.focus();

      }

    }, 2000);

    return () => clearTimeout(timer);

  }, [userId, username, dob, password]);

  const validate = () => {

    let newErrors = {};

    if (!userId.trim()) {

      newErrors.userId = "Email is required";

    }

    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userId)
    ) {

      newErrors.userId = "Enter valid email";

    }

    if (!username.trim()) {

      newErrors.username = "Required";

    }

    else if (
      !/^[A-Za-z ]+$/.test(username)
    ) {

      newErrors.username = "Only alphabets allowed";

    }

    if (!dob) {

      newErrors.dob = "Required";

    }

    else {

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const birthDate = new Date(dob);

      if (birthDate >= today) {

        newErrors.dob = "DOB must be before today";

      }

    }

    if (!password) {

      newErrors.password = "Required";

    }

    else if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,12}$/
        .test(password)
    ) {

      newErrors.password =
        "8-12 chars, 1 capital, 1 special";

    }

    if (!q1) {

      newErrors.q1 = "Required";

    }

    if (!a1.trim()) {

      newErrors.a1 = "Required";

    }

    if (!q2) {

      newErrors.q2 = "Required";

    }

    if (!a2.trim()) {

      newErrors.a2 = "Required";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const registerUser = async (e) => {

    e.preventDefault();

    if (!validate()) {

      return;

    }

    setLoading(true);

    try {

      const response =
        await axios.get(
          "http://localhost:8080/api/users"
        );

      const emailExists =
        response.data.some(
          user =>
            user.userId.toLowerCase() ===
            userId.toLowerCase()
        );

      if (emailExists) {

        setErrors({

          userId: "Mail ID already exists"

        });

        setLoading(false);

        return;

      }

      await axios.post(
        "http://localhost:8080/api/register",
        {

          userId,

          username,

          dob,

          password,

          q1,

          a1,

          q2,

          a2

        }

      );

      setLoading(false);

      setMessage("User Registered Successfully");

      setShowPopup(true);

      setUserId("");

      setUsername("");

      setDob("");

      setPassword("");

      setQ1("");

      setA1("");
            setQ2("");

      setA2("");

      setErrors({});

      setTimeout(() => {

        navigate("/");

      }, 2000);

    }

    catch (error) {

      setLoading(false);
      setShowPopup(true);

setTimeout(() => {
  navigate("/");
}, 2000);
      setMessage("Registration Failed");

    }

  };

  return (

    <div className="register-container">

      <div className="register-box">
        <form onSubmit={registerUser}>

        <h1>User Registration</h1>

        <p className="success-message">
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
                userId: ""
              }));

              setMessage("");

            }}
          />

          <span className="error">
            {errors.userId}
          </span>

        </div>

        <div className="row">

          <label>Username</label>

          <input
            ref={usernameRef}
            type="text"
            value={username}
            onChange={(e) => {

              setUsername(e.target.value);

              setErrors((prev) => ({
                ...prev,
                username: ""
              }));

              setMessage("");

            }}
          />

          <span className="error">
            {errors.username}
          </span>

        </div>

        <div className="row">

          <label>DOB</label>

          <input
            ref={dobRef}
            type="date"
            value={dob}
            onChange={(e) => {

              setDob(e.target.value);

              setErrors((prev) => ({
                ...prev,
                dob: ""
              }));

              setMessage("");

            }}
          />

          <span className="error">
            {errors.dob}
          </span>

        </div>

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

                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: ""
                }));

                setMessage("");

              }}

              onCopy={(e) =>
                e.preventDefault()
              }

              onPaste={(e) =>
                e.preventDefault()
              }

              onCut={(e) =>
                e.preventDefault()
              }

            />

            <span

              className="eye-icon"

              onClick={() =>
                setShowPassword(!showPassword)
              }

            >

              {showPassword ? "🙈" : "👀"}

            </span>

          </div>

          <span className="error">
            {errors.password}
          </span>

        </div>

        <div className="row">

          <label>Question 1</label>

          <select

            value={q1}

            onChange={(e) => {

              setQ1(e.target.value);

              setErrors((prev) => ({
                ...prev,
                q1: ""
              }));

              setMessage("");

            }}

          >

            <option value="">
              Select
            </option>

            <option>
              What is your nickname?
            </option>

            <option>
              What is your first school?
            </option>

          </select>

          <span className="error">
            {errors.q1}
          </span>

        </div>
                <div className="row">

          <label>Answer 1</label>

          <input
            type="text"
            value={a1}
            onChange={(e) => {

              setA1(e.target.value);

              setErrors((prev) => ({
                ...prev,
                a1: ""
              }));

              setMessage("");

            }}
          />

          <span className="error">
            {errors.a1}
          </span>

        </div>

        <div className="row">

          <label>Question 2</label>

          <select
            value={q2}
            onChange={(e) => {

              setQ2(e.target.value);

              setErrors((prev) => ({
                ...prev,
                q2: ""
              }));

              setMessage("");

            }}
          >

            <option value="">
              Select
            </option>

            <option>
              What is your birthplace?
            </option>

            <option>
              What is your pet name?
            </option>

          </select>

          <span className="error">
            {errors.q2}
          </span>

        </div>

        <div className="row">

          <label>Answer 2</label>

          <input
            type="text"
            value={a2}
            onChange={(e) => {

              setA2(e.target.value);

              setErrors((prev) => ({
                ...prev,
                a2: ""
              }));

              setMessage("");

            }}
          />

          <span className="error">
            {errors.a2}
          </span>

        </div>

               <div className="button-group">

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/")}
          >
            BACK
          </button>

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "SAVE"}
          </button>

        </div>

        {showPopup && (
          <div className="popup-overlay">

            <div className="popup-box">

              <h2>Registration Successful</h2>

              <p>User registered successfully.</p>

              <p className="redirect-text">
                Redirecting to Login...
              </p>

            </div>

          </div>
        )}

      </form>

    </div>

  </div>

);
}

export default Register;