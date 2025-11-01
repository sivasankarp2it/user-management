import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Todos from "./pages/Todos";
import ProtectedRoute from "./components/ProtectedRoutes";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";

export default function App() {
  const user = useSelector((s: any) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              {user.role === "admin" && (
                <Button color="inherit" component={Link} to="/todos">
                  Manage Tasks
                </Button>
              )}
              {user.role === "manager" && (
                <Button color="inherit" component={Link} to="/profile">
                  Profile
                </Button>
              )}
              <Button color="inherit" onClick={doLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/todos" element={<Todos />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}