import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import MailList from "../components/MailList";
import MailContent from "../components/MailContent";
import Calendar from "../components/Calendar";
import Profile from "../components/Profile";

import "../css/Dashboard.css";

function Dashboard() {

  if (
    localStorage.getItem(
      "isLoggedIn"
    ) !== "true"
  ) {

    return <Navigate to="/" replace />;
  }

  const [selectedMenu, setSelectedMenu] =
    useState("");

  const [selectedMail, setSelectedMail] =
    useState(null);

    const [replyMail, setReplyMail] =
  useState(null);

  const [stats, setStats] =
    useState(null);

 useEffect(() => {

  loadStats();

  const interval =
    setInterval(
      loadStats,
      5000
    );

  return () =>
    clearInterval(interval);

}, []);

useEffect(() => {

  window.history.pushState(
    null,
    "",
    window.location.href
  );

  const handleBack = () => {

    localStorage.clear();

    window.location.replace("/");
  };

  window.addEventListener(
    "popstate",
    handleBack
  );

  return () => {

    window.removeEventListener(
      "popstate",
      handleBack
    );

  };

}, []);

  const loadStats = async () => {

    try {

      const userId =
        localStorage.getItem(
          "loggedInUser"
        );

      const response =
        await axios.get(
          `http://localhost:8080/api/dashboard/stats/${userId}`
        );

      setStats(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="dashboard-container">

      <div className="sidebar">

        <Sidebar
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedMail={setSelectedMail}
        />

      </div>

      <div className="main-section">

        {stats && (

          <div className="stats-container">

            <div className="stat-card">

              <h3>📥 Inbox</h3>

              <h2>
                {stats.inboxCount}
              </h2>

            </div>

            <div className="stat-card">

              <h3>📤 Sent</h3>

              <h2>
                {stats.sentCount}
              </h2>

            </div>

            <div className="stat-card">

              <h3>🔴 Unread</h3>

              <h2>
                {stats.unreadCount}
              </h2>

            </div>

            <div className="stat-card">

              <h3>📅 Events</h3>

              <h2>
                {stats.eventCount}
              </h2>

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

            {selectedMenu !== "" && (

              <div className="mail-list">

                <MailList
                  selectedMenu={selectedMenu}
                  setSelectedMail={setSelectedMail}
                  replyMail={replyMail}
                  setReplyMail={setReplyMail}
                />

              </div>

            )}

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

      </div>

    </div>

  );
}

export default Dashboard;