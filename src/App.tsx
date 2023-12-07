import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Login from "./components/Login";
import Register from "./components/Register";
import Order from "./components/Order";

const App = () => {
  const [progress, setprogress] = useState<number>(0);
  const [localStorage, setLocalStorage] = useState<string>(" ");

  const setProgress = (progress: number) => {
    setprogress(progress);
  };
  const getStorage = (storage: string) => {
    setLocalStorage(storage);
  };
  useEffect(() => {}, [localStorage]);
  return (
    <>
      <Router>
        {localStorage && <Navbar getStorage={getStorage} />}
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route
            path="/news"
            element={
              <ProtectedRoutes>
                <News
                  setProgress={setProgress}
                  key="entertainment"
                  pageSize={9}
                  category=""
                />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes>
                <Order />
              </ProtectedRoutes>
            }
          />
          <Route path="/" element={<Login getStorage={getStorage} />} />
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
