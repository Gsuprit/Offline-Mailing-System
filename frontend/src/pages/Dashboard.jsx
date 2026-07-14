import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import MailList from "../components/MailList";
import MailContent from "../components/MailContent";
import Calendar from "../components/Calendar";
import Profile from "../components/Profile";

import "../css/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  if (localStorage.getItem("isLoggedIn") !== "true") {
    return <Navigate to="/" replace />;
  }

  const username = localStorage.getItem("loggedInUser");

  const [currentTime, setCurrentTime] = useState("");

  const [selectedMenu, setSelectedMenu] = useState("inbox");
  const [selectedMail, setSelectedMail] = useState(null);
  const [replyMail, setReplyMail] = useState(null);
  const [stats, setStats] = useState(null);

  // Logout Popup
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const logout = () => {

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isLoggedIn");

    navigate("/");

  };

  useEffect(() => {

    const updateClock = () => {

      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );

    };

    updateClock();

    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);

  }, []);

  useEffect(() => {

    loadStats();

    const interval = setInterval(loadStats, 5000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {

      logout();

    };

    window.addEventListener("popstate", handleBack);

    return () =>
      window.removeEventListener("popstate", handleBack);

  }, []);
    const loadStats = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8080/api/dashboard/stats/${username}`
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {

    greeting = "🌅 Good Morning";

  } else if (hour < 18) {

    greeting = "🌞 Good Afternoon";

  } else {

    greeting = "🌙 Good Evening";

  }

  return (

    <div className="dashboard-container">

      <div className="sidebar">

        <Sidebar
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedMail={setSelectedMail}
          onLogout={() => setShowLogoutPopup(true)}
        />

      </div>

      <div className="main-section">

        <div className="dashboard-header">

          <div className="header-left">

            <h1 className="dashboard-greeting">
              {greeting}
            </h1>

            <h3 className="dashboard-username">
              {username}
            </h3>

          </div>

          <div className="header-right">

            <div className="dashboard-time">

              🕒 {currentTime}

            </div>

          </div>

        </div>

        {stats && (

          <div className="stats-container">

            <div className="stat-card">

              <h3>📥 Inbox</h3>

              <h2>{stats.inboxCount}</h2>

            </div>

            <div className="stat-card">

              <h3>📤 Sent</h3>

              <h2>{stats.sentCount}</h2>

            </div>

            <div className="stat-card">

              <h3>🔴 Unread</h3>

              <h2>{stats.unreadCount}</h2>

            </div>

            <div className="stat-card">

              <h3>📅 Events</h3>

              <h2>{stats.eventCount}</h2>

            </div>

          </div>

        )}

        {selectedMenu === "calendar" ? (

          <div className="calendar-container">

            <Calendar />

          </div>

        ) : selectedMenu === "profile" ? (

          <div className="calendar-container">

            <Profile />

          </div>

        ) : (

          <div className="mail-layout">

            <div className="mail-list">

              <MailList
                selectedMenu={selectedMenu}
                setSelectedMail={setSelectedMail}
                replyMail={replyMail}
                setReplyMail={setReplyMail}
              />

            </div>

            {selectedMenu !== "compose" && (

              <div className="mail-content">

                <MailContent
                  selectedMail={selectedMail}
                  setSelectedMenu={setSelectedMenu}
                  setReplyMail={setReplyMail}
                />

              </div>

            )}

          </div>

        )}
                {/* Logout Popup */}

        {showLogoutPopup && (

          <div className="popup-overlay">

            <div className="popup-box">

              <h2>Logout</h2>

              <p>
                Are you sure you want to logout?
              </p>

              <p className="redirect-text">
                You will be redirected to Login.
              </p>

              <div className="popup-buttons">

                <button
                  className="cancel-popup-btn"
                  onClick={() =>
                    setShowLogoutPopup(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="logout-popup-btn"
                  onClick={logout}
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Dashboard;