import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  function RequireAuth({ children }) {
    const user = localStorage.getItem("user_tokens");
    return user ? children : <Navigate to="/" />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <div
              style={{
                textAlign: "center",
                fontSize: "30px",
                marginTop: "100px",
              }}
            >
              Path not resolved. 404
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
