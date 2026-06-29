import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import ForgetPassword from "./pages/ForgetPassword";

function App() {

  return (

    <HashRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        <Route
          path="/forgot-password"
          element={<ForgetPassword />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>

    </HashRouter>
  );
}

export default App;