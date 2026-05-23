import { useState } from "react";
import axios from "axios";
import "../css/ChangePassword.css";

function ChangePassword() {

  const [userId, setUserId] = useState("");
  const [oldPassword,
    setOldPassword] = useState("");

  const [newPassword,
    setNewPassword] = useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [message, setMessage] =
    useState("");

  const validate = () => {

    let newErrors = {};

    if (!userId.trim()) {

      newErrors.userId = "Required";
    }

    if (!oldPassword.trim()) {

      newErrors.oldPassword =
        "Required";
    }

    if (!newPassword.trim()) {

      newErrors.newPassword =
        "Required";

    } else if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,12}$/
        .test(newPassword)
    ) {

      newErrors.newPassword =
        "8-12 chars, 1 capital, 1 special";
    }

    if (!confirmPassword.trim()) {

      newErrors.confirmPassword =
        "Required";

    } else if (
      confirmPassword !== newPassword
    ) {

      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors)
      .length === 0;
  };

  const changePassword = async () => {

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
          user.password === oldPassword
      );

      if (!validUser) {

        setMessage(
          "Invalid User ID or Old Password"
        );

        return;
      }

      validUser.password =
        newPassword;

      await axios.post(
        "http://localhost:8080/api/register",
        validUser
      );

      setMessage(
        "Password Changed Successfully"
      );

      setUserId("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setErrors({});

    } catch (error) {

      setMessage(
        "Backend Connection Failed"
      );
    }
  };

  return (

    <div className="change-container">

      <div className="change-box">

        <h1>Change Password</h1>

        <p className="message">
          {message}
        </p>

        <div className="row">

          <label>User ID</label>

          <input
            type="text"
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

          <label>Old Password</label>

          <input
            type="password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
          />

          <span className="error">
            {errors.oldPassword}
          </span>

        </div>

        <div className="row">

          <label>New Password</label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <span className="error">
            {errors.newPassword}
          </span>

        </div>

        <div className="row">

          <label>Confirm Password</label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <span className="error">
            {errors.confirmPassword}
          </span>

        </div>

        <button onClick={changePassword}>
          SAVE
        </button>

      </div>

    </div>
  );
}

export default ChangePassword;