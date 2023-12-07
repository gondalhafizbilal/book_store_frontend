import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoadingBar from "react-top-loading-bar";
import Book from "./pages/Book";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Order from "./pages/Order";

const App = () => {
  return (
    <>
      <Router>
        <LoadingBar height={3} color="#f11946" />
        <Routes>
          <Route
            path="/books"
            element={
              <ProtectedRoutes>
                <Navbar />
                <Book />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes>
                <Navbar />
                <Order />
              </ProtectedRoutes>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export function ProtectedRoutes(props: any) {
  if (localStorage.getItem("userData")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default App;
