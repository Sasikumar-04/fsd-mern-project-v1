
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";

function App() {
  const userLoggedIn = !!localStorage.getItem("userData");

  return (
    <div className="App">
      <Router>
        <div className="app-shell">
          <div className="app-main">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {userLoggedIn ? (
                <>
                  <Route path="/adminhome" element={<AdminHome />} />
                  <Route path="/userhome" element={<UserHome />} />
                  <Route
                    path="/userhome/userappointments/:doctorId"
                    element={<UserAppointments />}
                  />
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>
          <footer className="app-footer">
            <div className="footer-inner">
              <span className="footer-brand">CareSync Portal</span>
              <span>© 2023 All rights reserved.</span>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
}

export default App;
