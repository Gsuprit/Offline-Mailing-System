import { useState } from "react";
import axios from "axios";
import "../css/ForgetPassword.css";

function ForgetPassword() {

  const [userId, setUserId] = useState("");

  const [q1, setQ1] = useState("");
  const [a1, setA1] = useState("");

  const [q2, setQ2] = useState("");
  const [a2, setA2] = useState("");

  const [message, setMessage] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const validate = () => {

    let newErrors = {};

    if (!userId.trim()) {

      newErrors.userId = "Required";
    }

    if (!q1.trim()) {

      newErrors.q1 = "Required";
    }

    if (!a1.trim()) {

      newErrors.a1 = "Required";
    }

    if (!q2.trim()) {

      newErrors.q2 = "Required";
    }

    if (!a2.trim()) {

      newErrors.a2 = "Required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors)
      .length === 0;
  };

  const recoverPassword = async () => {

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
          user.q1 === q1 &&
          user.a1.toLowerCase() ===
            a1.toLowerCase() &&
          user.q2 === q2 &&
          user.a2.toLowerCase() ===
            a2.toLowerCase()
      );

      if (validUser) {

        setMessage(
          "Your Password is: " +
          validUser.password
        );

      } else {

        setMessage(
          "Invalid Details"
        );
      }

    } catch (error) {

      setMessage(
        "Backend Connection Failed"
      );
    }
  };

  return (

    <div className="forget-container">

      <div className="forget-box">

        <h1>Forgot Password</h1>

        <p
  className={
    message.startsWith("Your Password is:")
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

        <button onClick={recoverPassword}>
          SUBMIT
        </button>

      </div>

    </div>
  );
}

export default ForgetPassword;