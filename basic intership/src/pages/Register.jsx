import { useState } from "react";
import axios from "axios";
import "../css/Register.css";

function Register() {

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");

  const [q1, setQ1] = useState("");
  const [a1, setA1] = useState("");

  const [q2, setQ2] = useState("");
  const [a2, setA2] = useState("");

  const [passwordChangeDate,
    setPasswordChangeDate] = useState("");

  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {

    let newErrors = {};

    if (!userId.trim()) {
      newErrors.userId = "Required";
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

      const birthDate = new Date(dob);

      if (birthDate >= today) {

        newErrors.dob =
          "DOB must be before today";
      }
    }

    if (!password) {

      newErrors.password = "Required";

    } else if (
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

    if (!passwordChangeDate) {

      newErrors.passwordChangeDate =
        "Required";

    } else {

      const pwdDate =
        new Date(passwordChangeDate);

      const birthDate = new Date(dob);

      if (pwdDate <= birthDate) {

        newErrors.passwordChangeDate =
          "Must be after DOB";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors)
      .length === 0;
  };

  const registerUser = async () => {

    if (!validate()) {
      return;
    }

    try {

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
          a2,
          passwordChangeDate
        }
      );

      setMessage(
        "User Registered Successfully"
      );

      setUserId("");
      setUsername("");
      setDob("");
      setPassword("");
      setQ1("");
      setA1("");
      setQ2("");
      setA2("");
      setPasswordChangeDate("");

      setErrors({});

    } catch (error) {

      setMessage("Registration Failed");
    }
  };

  return (

    <div className="register-container">

      <div className="register-box">

        <h1>User Registration</h1>

        <p className="success-message">
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

          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <span className="error">
            {errors.username}
          </span>

        </div>

        <div className="row">

          <label>DOB</label>

          <input
            type="date"
            value={dob}
            onChange={(e) =>
              setDob(e.target.value)
            }
          />

          <span className="error">
            {errors.dob}
          </span>

        </div>

        <div className="row">

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <span className="error">
            {errors.password}
          </span>

        </div>

        <div className="row">

          <label>Question 1</label>

          <select
            value={q1}
            onChange={(e) =>
              setQ1(e.target.value)
            }
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
            onChange={(e) =>
              setA1(e.target.value)
            }
          />

          <span className="error">
            {errors.a1}
          </span>

        </div>

        <div className="row">

          <label>Question 2</label>

          <select
            value={q2}
            onChange={(e) =>
              setQ2(e.target.value)
            }
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
            onChange={(e) =>
              setA2(e.target.value)
            }
          />

          <span className="error">
            {errors.a2}
          </span>

        </div>

        <div className="row">

          <label>Password Change Date</label>

          <input
            type="date"
            value={passwordChangeDate}
            onChange={(e) =>
              setPasswordChangeDate(
                e.target.value
              )
            }
          />

          <span className="error">
            {errors.passwordChangeDate}
          </span>

        </div>

        <button onClick={registerUser}>
          SAVE
        </button>

      </div>

    </div>
  );
}

export default Register;