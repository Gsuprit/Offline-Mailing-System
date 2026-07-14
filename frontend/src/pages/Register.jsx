import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {

  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

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

  // =========================
  // REFS
  // =========================

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const dobRef = useRef(null);
  const passwordRef = useRef(null);

  const q1Ref = useRef(null);
  const a1Ref = useRef(null);
  const q2Ref = useRef(null);
  const a2Ref = useRef(null);

  const saveBtnRef = useRef(null);

  // =========================
  // FIRST CURSOR
  // =========================

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // =========================
  // VALIDATION
  // =========================

  const validate = () => {

    let newErrors = {};

    if (!userId.trim()) {

      newErrors.userId = "Email is required";

    } else if (
      !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userId)
    ) {

      newErrors.userId = "Enter valid email";

    }

    if (!username.trim()) {

      newErrors.username = "Required";

    } else if (
      !/^[A-Za-z ]+$/.test(username)
    ) {

      newErrors.username =
        "Only alphabets allowed";

    }

    if (!dob) {

      newErrors.dob = "Required";

    } else {

      const today = new Date();

      today.setHours(0,0,0,0);

      const birthDate =
        new Date(dob);

      if (birthDate >= today) {

        newErrors.dob =
          "DOB must be before today";

      }

    }

    if (!password) {

      newErrors.password = "Required";

    } else if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,12}$/.test(password)
    ) {

      newErrors.password =
        "8-12 chars, 1 capital, 1 special";

    }

    if (!q1)
      newErrors.q1 = "Required";

    if (!a1.trim())
      newErrors.a1 = "Required";

    if (!q2)
      newErrors.q2 = "Required";

    if (!a2.trim())
      newErrors.a2 = "Required";

    setErrors(newErrors);
    if (newErrors.userId) {
  emailRef.current.focus();
  return false;
}

if (newErrors.username) {
  usernameRef.current.focus();
  return false;
}

if (newErrors.dob) {
  dobRef.current.focus();
  return false;
}

if (newErrors.password) {
  passwordRef.current.focus();
  return false;
}

if (newErrors.q1) {
  q1Ref.current.focus();
  return false;
}

if (newErrors.a1) {
  a1Ref.current.focus();
  return false;
}

if (newErrors.q2) {
  q2Ref.current.focus();
  return false;
}

if (newErrors.a2) {
  a2Ref.current.focus();
  return false;
}

return true;


  };

  // =========================
  // REGISTER
  // =========================

  const registerUser = async (e) => {

    e.preventDefault();

    if (!validate()) return;

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

      emailRef.current.focus();;

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {

      emailRef.current.focus();

      setLoading(false);

      setShowPopup(true);

      setMessage("Registration Failed");

      setTimeout(() => {
        navigate("/");
      }, 2000);

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

value = value.replace(/[^a-zA-Z0-9@.]/g, "");

const atCount = (value.match(/@/g) || []).length;

if (atCount > 1) return;

setUserId(value);
                setErrors(prev => ({
                  ...prev,
                  userId: ""
                }));

              }}
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  usernameRef.current.focus();

                }

              }}
            />

            <span className="error">
              {errors.userId}
            </span>

          </div>

          {/* Username */}

          <div className="row">

            <label>Username</label>

            <input
              ref={usernameRef}
              type="text"
              value={username}
              onChange={(e) => {

                let value = e.target.value.replace(/[^A-Za-z ]/g, "");

setUsername(value);

                setErrors(prev => ({
                  ...prev,
                  username: ""
                }));

              }}
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  dobRef.current.focus();

                }

              }}
            />

            <span className="error">
              {errors.username}
            </span>

          </div>

          {/* DOB */}

          <div className="row">

            <label>DOB</label>

            <input
              ref={dobRef}
              type="date"
              value={dob}
              onChange={(e) => {

                setDob(e.target.value);

                setErrors(prev => ({
                  ...prev,
                  dob: ""
                }));

              }}
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  passwordRef.current.focus();

                }

              }}
            />

            <span className="error">
              {errors.dob}
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

                  setPassword(e.target.value);

                  setErrors(prev => ({
                    ...prev,
                    password: ""
                  }));

                }}
                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    e.preventDefault();

                    q1Ref.current.focus();

                  }

                }}
                onCopy={(e)=>e.preventDefault()}
                onPaste={(e)=>e.preventDefault()}
                onCut={(e)=>e.preventDefault()}
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

          {/* Question 1 */}

          <div className="row">

            <label>Question 1</label>

            <select
              ref={q1Ref}
              value={q1}
              onChange={(e) => {

                setQ1(e.target.value);

                setErrors(prev => ({
                  ...prev,
                  q1: ""
                }));

              }}
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  a1Ref.current.focus();

                }

              }}
            >

              <option value="">Select</option>

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
                    {/* Answer 1 */}

          <div className="row">

            <label>Answer 1</label>

            <input
              ref={a1Ref}
              type="text"
              value={a1}
              onChange={(e) => {

                let value = e.target.value.replace(/[^A-Za-z ]/g, "");

setA1(value);

                setErrors(prev => ({
                  ...prev,
                  a1: ""
                }));

              }}
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  q2Ref.current.focus();

                }

              }}
            />

            <span className="error">
              {errors.a1}
            </span>

          </div>

          {/* Question 2 */}

          <div className="row">

            <label>Question 2</label>

            <select
              ref={q2Ref}
              value={q2}
              onChange={(e) => {

                setQ2(e.target.value);

                setErrors(prev => ({
                  ...prev,
                  q2: ""
                }));

              }}
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  a2Ref.current.focus();

                }

              }}
            >

              <option value="">Select</option>

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

          {/* Answer 2 */}

          <div className="row">

            <label>Answer 2</label>

            <input
              ref={a2Ref}
              type="text"
              value={a2}
              onChange={(e) => {

                let value = e.target.value.replace(/[^A-Za-z ]/g, "");

setA2(value);

                setErrors(prev => ({
                  ...prev,
                  a2: ""
                }));

              }}
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  saveBtnRef.current.focus();

                }

              }}
            />

            <span className="error">
              {errors.a2}
            </span>

          </div>

          {/* Buttons */}

          <div className="button-group">

            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/")}
            >
              BACK
            </button>

            <button
              ref={saveBtnRef}
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "SAVE"}
            </button>

          </div>

          {/* Success Popup */}

         {showPopup && (

  <div className="popup-overlay">

    <div className="popup-box">

      <h2>
        {message === "User Registered Successfully"
          ? "✅ Registration Successful"
          : "❌ Registration Failed"}
      </h2>

      <p>
        {message === "User Registered Successfully"
          ? "Your account has been created successfully."
          : "Unable to register your account."}
      </p>

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
