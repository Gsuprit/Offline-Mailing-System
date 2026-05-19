import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");

  const [q1, setQ1] = useState("");
  const [a1, setA1] = useState("");

  const [q2, setQ2] = useState("");
  const [a2, setA2] = useState("");

  const [passwordChangeDate, setPasswordChangeDate] =
    useState("");

  const [message, setMessage] = useState("");

  const validatePassword = (password) => {

    const regex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,12}$/;

    return regex.test(password);
  };

  const registerUser = async () => {

    if (
      userId.trim() === "" ||
      username.trim() === "" ||
      dob.trim() === "" ||
      password.trim() === "" ||
      q1.trim() === "" ||
      a1.trim() === "" ||
      q2.trim() === "" ||
      a2.trim() === "" ||
      passwordChangeDate.trim() === ""
    ) {

      setMessage("All fields are required");

      return;
    }

    if (!validatePassword(password)) {

      setMessage(
        "Password must contain capital letter and special character"
      );

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

      setMessage("User Registered Successfully");

      setUserId("");
      setUsername("");
      setDob("");
      setPassword("");
      setQ1("");
      setA1("");
      setQ2("");
      setA2("");
      setPasswordChangeDate("");

    } catch (error) {

      setMessage("Backend Connection Failed");
    }
  };

  return (

    <div className="container">

      <div className="form-box">

        <h1>User Registration</h1>

        {
          message &&
          <p className="message">{message}</p>
        }

        <label>User ID</label>

        <input
          type="text"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
        />

        <label>Username</label>

        <input
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <label>DOB</label>

        <input
          type="date"
          value={dob}
          onChange={(e) =>
            setDob(e.target.value)
          }
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <p className="note">
          Password must contain:
          <br />
          8-12 characters
          <br />
          1 capital letter
          <br />
          1 special character
        </p>

        <label>Question 1</label>

        <select
          value={q1}
          onChange={(e) =>
            setQ1(e.target.value)
          }
        >

          <option value="">
            Select Question
          </option>

          <option value="What is your nickname?">
            What is your nickname?
          </option>

          <option value="What is your first school name?">
            What is your first school name?
          </option>

        </select>

        <label>Answer 1</label>

        <input
          type="text"
          value={a1}
          onChange={(e) =>
            setA1(e.target.value)
          }
        />

        <label>Question 2</label>

        <select
          value={q2}
          onChange={(e) =>
            setQ2(e.target.value)
          }
        >

          <option value="">
            Select Question
          </option>

          <option value="What is your place of birth?">
            What is your place of birth?
          </option>

          <option value="What is your mother's surname?">
            What is your mother's surname?
          </option>

        </select>

        <label>Answer 2</label>

        <input
          type="text"
          value={a2}
          onChange={(e) =>
            setA2(e.target.value)
          }
        />

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

        <button onClick={registerUser}>
          SAVE
        </button>

      </div>

    </div>
  );
}

export default App;