import { useEffect } from "react";
import React, { Suspense } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import AuthSkeleton from "./components/skeletons/AuthSkeletons";

const Home = React.lazy(() => import("./pages/Home"));
const Expenses = React.lazy(() => import("./pages/Expenses"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const AddExpense = React.lazy(() => import("./pages/AddExpense"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));

// import Expenses from "./pages/Expenses";
// import Home from "./pages/Home";
// import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import AddExpense from "./pages/AddExpense";
// import NotFound from "./pages/NotFound";
function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) return <AuthSkeleton />;

  return (
    <>
      <Toaster />
      <Suspense fallback={<AuthSkeleton />}>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <LandingPage />} />
          <Route
            path="/expenses"
            element={authUser ? <Expenses /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/addexpense"
            element={authUser ? <AddExpense /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
