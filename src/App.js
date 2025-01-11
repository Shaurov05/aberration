import LoginPage from "./components/LoginPage";
import DealerInformation from "./components/DealerInformation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style/base.css";
import UserManagement from "./components/UserManagement";
import UserForm from "./components/UserForm";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./route";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/users/:operation/:userId?" element={<UserForm />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="/dealership/:dealerId/:tabName"
            element={<DealerInformation />}
          />
          <Route path="/user-management" element={<UserManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
