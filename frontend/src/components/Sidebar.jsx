import { useNavigate } from "react-router-dom";

function Sidebar({
  selectedMenu,
  setSelectedMenu,
  setSelectedMail,
  onLogout
}) {

  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setSelectedMail(null);
  };

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {

      localStorage.clear();

      navigate("/");

    }

  };

  return (

    <div className="sidebar-container">

      <div className="sidebar-menu">

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

      </div>

      <div className="sidebar-bottom">

        <p onClick={onLogout}>
          ↪ Logout
        </p>

      </div>

    </div>

  );

}

export default Sidebar;