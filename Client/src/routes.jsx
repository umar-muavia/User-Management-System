import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateUser from "./pages/CreateUser.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import EditAddUser from "./pages/EditAddUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Register />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={<ProtectedRoute element={Dashboard} />}
      />
      <Route
        path="create-user"
        element={<ProtectedRoute element={CreateUser} />}
      />
      <Route
        path="edit-user/:id"
        element={<ProtectedRoute element={EditAddUser} />}
      />
    </Route>
  )
);

export default router;
