import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/ForgetPassword.css";

function ForgetPassword() {

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const answer1Ref = useRef(null);
  const answer2Ref = useRef(null);

  const [userId, setUserId] = useState("");
  const [q1, setQ1] = useState("");
  const [a1, setA1] = useState("");
  const [q2, setQ2] = useState("");
  const [a2, setA2] = useState("");

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {

    const timer = setTimeout(() => {

      if (!userId.trim()) {

        emailRef.current?.focus();

      } else if (!a1.trim()) {

        answer1Ref.current?.focus();

      } else if (!a2.trim()) {

        answer2Ref.current?.focus();

      }

    }, 2000);

    return () => clearTimeout(timer);

  }, [userId, a1, a2]);

  const validate = () => {

    let newErrors = {};

    if (!userId.trim())
      newErrors.userId = "Required";

    if (!q1)
      newErrors.q1 = "Required";

    if (!a1.trim())
      newErrors.a1 = "Required";

    if (!q2)
      newErrors.q2 = "Required";

    if (!a2.trim())
      newErrors.a2 = "Required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const recoverPassword = async (e) => {

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
          user.q1 === q1 &&
          user.a1.toLowerCase() === a1.toLowerCase() &&
          user.q2 === q2 &&
          user.a2.toLowerCase() === a2.toLowerCase()
      );

      if (validUser) {

        setMessage("Your Password is: " + validUser.password);

      } else {

        setMessage("Invalid Details");

      }

    } catch {

      setMessage("Backend Connection Failed");

    }

  };

  return (

    <div className="forget-container">

      <div className="forget-box">

        <form onSubmit={recoverPassword}>

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

            <span className="error">{errors.userId}</span>

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

              <option value="">Select</option>
              <option>What is your nickname?</option>
              <option>What is your first school?</option>

            </select>

            <span className="error">{errors.q1}</span>

          </div>

          <div className="row">

            <label>Answer 1</label>

            <input
              ref={answer1Ref}
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

            <span className="error">{errors.a1}</span>

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

              <option value="">Select</option>
              <option>What is your birthplace?</option>
              <option>What is your pet name?</option>

            </select>

            <span className="error">{errors.q2}</span>

          </div>

          <div className="row">

            <label>Answer 2</label>

            <input
              ref={answer2Ref}
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

            <span className="error">{errors.a2}</span>

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
              className="submit-btn"
            >
              SUBMIT
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default ForgetPassword;