import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/ChangePassword.css";

function ChangePassword() {

  const navigate = useNavigate();

  // Refs
  const emailRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const saveBtnRef = useRef(null);

  // States
  const [userId, setUserId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  // Cursor starts here
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Validation
  const validate = () => {

    let newErrors = {};

    if (!userId.trim()) {
      newErrors.userId = "Required";
    }

    if (!oldPassword.trim()) {
      newErrors.oldPassword = "Required";
    }

    if (!newPassword.trim()) {

      newErrors.newPassword = "Required";

    } else if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,12}$/.test(newPassword)
    ) {

      newErrors.newPassword =
        "8-12 chars, 1 capital, 1 special";

    }

    if (!confirmPassword.trim()) {

      newErrors.confirmPassword = "Required";

    } else if (confirmPassword !== newPassword) {

      newErrors.confirmPassword =
        "Passwords do not match";

    }

    setErrors(newErrors);

    if (newErrors.userId) {
      emailRef.current.focus();
      return false;
    }

    if (newErrors.oldPassword) {
      oldPasswordRef.current.focus();
      return false;
    }

    if (newErrors.newPassword) {
      newPasswordRef.current.focus();
      return false;
    }

    if (newErrors.confirmPassword) {
      confirmPasswordRef.current.focus();
      return false;
    }

    return true;
  };
  const changePassword = async (e) => {

  e.preventDefault();

  if (!validate()) return;

  try {

    const response = await axios.get(
      "http://localhost:8080/api/users"
    );

    const users = response.data;

    const validUser = users.find(
      (user) =>
        user.userId === userId &&
        user.password === oldPassword
    );

    if (!validUser) {

      setErrors({
        oldPassword: "Invalid Old Password"
      });

      setMessage("");

      oldPasswordRef.current.focus();

      return;

    }

    validUser.password = newPassword;

    await axios.put(
      `http://localhost:8080/api/user/${userId}`,
      validUser
    );

    setMessage("Password Changed Successfully");

setShowPopup(true);

setUserId("");
setOldPassword("");
setNewPassword("");
setConfirmPassword("");

setErrors({});

setTimeout(() => {
  navigate("/");
}, 2000);
    setTimeout(() => {

      emailRef.current.focus();

    }, 100);

  } catch (error) {

    console.log(error);

    setMessage("Backend Connection Failed");

  }

};
return (

  <div className="change-container">

    <div className="change-box">

      <form onSubmit={changePassword}>

        <h1>Change Password</h1>

        <p
          className={
            message === "Password Changed Successfully"
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
                userId: ""
              }));
              setMessage("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                oldPasswordRef.current.focus();
              }
            }}
          />

          <span className="error">
            {errors.userId}
          </span>

        </div>

        <div className="row">

          <label>Old Password</label>

          <div className="password-wrapper">

            <input
              ref={oldPasswordRef}
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  oldPassword: ""
                }));
                setMessage("");
              }}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  newPasswordRef.current.focus();
                }
              }}
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowOldPassword(!showOldPassword)
              }
            >
              {showOldPassword ? "🙈" : "👀"}
            </span>

          </div>

          <span className="error">
            {errors.oldPassword}
          </span>

        </div>

        <div className="row">

          <label>New Password</label>

          <div className="password-wrapper">

            <input
              ref={newPasswordRef}
              type={showNewPassword ? "text" : "password"}
              placeholder="8-12 chars, 1 capital, 1 special"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  newPassword: ""
                }));
                setMessage("");
              }}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  confirmPasswordRef.current.focus();
                }
              }}
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowNewPassword(!showNewPassword)
              }
            >
              {showNewPassword ? "🙈" : "👀"}
            </span>

          </div>

          <span className="error">
            {errors.newPassword}
          </span>

        </div>

        <div className="row">

          <label>Confirm Password</label>

          <div className="password-wrapper">

            <input
              ref={confirmPasswordRef}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: ""
                }));
                setMessage("");
              }}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  saveBtnRef.current.focus();
                }
              }}
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? "🙈" : "👀"}
            </span>

          </div>

          <span className="error">
            {errors.confirmPassword}
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
            ref={saveBtnRef}
            type="submit"
            className="save-btn"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                changePassword(e);
              }
            }}
          >
            SAVE
          </button>

        </div>

        {showPopup && (

  <div className="popup-overlay">

    <div className="popup-box">

      <h2>🔒 Password Changed</h2>

      <p>Your password has been updated successfully.</p>

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

export default ChangePassword;