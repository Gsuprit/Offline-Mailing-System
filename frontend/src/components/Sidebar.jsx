import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar({
  selectedMenu,
  setSelectedMenu,
  setSelectedMail
}) {

const [currentTime, setCurrentTime] =
  useState("");{
    useEffect(() => {

  const updateTime = () => {

    const now = new Date();

    setCurrentTime(
      now.toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        }
      )
    );

  };

  updateTime();

  const timer =
    setInterval(
      updateTime,
      1000
    );

  return () =>
    clearInterval(timer);

}, []);
  }

  const username =
localStorage.getItem(
  "loggedInUser"
);

const hour =
new Date().getHours();

let greeting = "";

if(hour < 12){
  greeting = "🌅 Good Morning";
}
else if(hour < 18){
  greeting = "🌞 Good Afternoon";
}
else{
  greeting = "🌙 Good Evening";
}

  const navigate = useNavigate();

  const handleMenuClick = (menu) => {

    setSelectedMenu(menu);
    setSelectedMail(null);
  };

  const handleLogout = () => {

  const confirmLogout =
    window.confirm(
      "Are you sure you want to logout?"
    );

  if (confirmLogout) {

    localStorage.clear();

    window.location.href = "/";

  }

};

  return (

    <div>

      <h2 className="welcome-text">

  {greeting}

  <br /><br />

  {username}

</h2>

      <p
        className={
          selectedMenu === "inbox"
            ? "active-menu"
            : ""
        }
        onClick={() =>
          handleMenuClick("inbox")
        }
      >
        📥 Inbox
      </p>

      <p
        className={
          selectedMenu === "sent"
            ? "active-menu"
            : ""
        }
        onClick={() =>
          handleMenuClick("sent")
        }
      >
        📤 Sent
      </p>

      <p
        className={
          selectedMenu === "compose"
            ? "active-menu"
            : ""
        }
        onClick={() =>
          handleMenuClick("compose")
        }
      >
        ✉ Compose Mail
      </p>

      <p
        className={
          selectedMenu === "calendar"
            ? "active-menu"
            : ""
        }
        onClick={() =>
          handleMenuClick("calendar")
        }
      >
        📅 Calendar
      </p>

        <p
  className={
    selectedMenu === "profile"
      ? "active-menu"
      : ""
  }
  onClick={() =>
    handleMenuClick("profile")
  }
>
  👤 Profile
</p>

      <p
        onClick={handleLogout}
      >
        ↪ Logout
      </p>
      <br></br>

      <br></br>
    <div
  style={{
    marginTop: "auto",
    paddingTop: "30px",
    textAlign: "left"
    
  }}
>

  <p
    style={{
      color: "#60a5fa",
      fontSize: "22px",
      fontWeight: "700",
      fontWeight: "bold",
      letterSpacing:"2px",
      
    }}
  >
    🕒 {currentTime}
  </p>

</div>

    </div>

    
  );
}

export default Sidebar;