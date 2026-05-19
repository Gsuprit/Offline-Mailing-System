return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "white",
      padding: "40px",
      fontFamily: "Arial"
    }}
  >
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        backgroundColor: "#1e293b",
        padding: "30px",
        borderRadius: "10px"
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        User Registration
      </h1>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px"
        }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px"
        }}
      />

      <button
        onClick={registerUser}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Register
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h2>Registered Users</h2>

      {
        users.map((user, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#334155",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "5px"
            }}
          >
            <p>{user.username}</p>
          </div>
        ))
      }

    </div>
  </div>
);