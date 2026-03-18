import { Eye, EyeClosed, Loader, Loader2, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Helmet } from "react-helmet";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const { login, isLoggingIn } = useAuthStore();

  const handleEmailError = () => {
    if (!formData.email.trim()) {
      setEmailErr("Email is Required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailErr("Invalid Email Format");
    }
  };

  const handlePasswordError = () => {
    if (!formData.password.trim()) {
      setPasswordErr("Password Is Required");
    } else if (formData.password.trim().length < 6) {
      setPasswordErr("Password must be at least 6 characters");
    }
  };

  const validateForm = () => {
    let emailError = "";
    let passwordError = "";

    if (!formData.email.trim()) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      emailError = "Invalid email format";
    }

    if (!formData.password.trim()) {
      passwordError = "Password is required";
    } else if (formData.password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }

    setEmailErr(emailError);
    setPasswordErr(passwordError);

    return !emailError && !passwordError;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors");
      return;
    }
    login(formData);
  }

  return (
    <>
      <Helmet>
        <title>Login | Expense Manager</title>
        <meta
          name="description"
          content="Login to your Expense Manager account to track, manage, and analyze your personal expenses securely."
        />
        <meta
          name="keywords"
          content="login, expense manager login, personal finance app, expense tracker login, budget manager"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Login | Expense Manager" />
        <meta
          property="og:description"
          content="Login to your Expense Manager account to track, manage, and analyze your personal expenses securely."
        />
        <meta
          property="og:image"
          content="https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png"
        />
        <meta property="og:url" content="https://expensemanager-f4ck.onrender.com/login" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login | Expense Manager" />
        <meta
          name="twitter:description"
          content="Login to your Expense Manager account to track, manage, and analyze your personal expenses securely."
        />
        <meta
          name="twitter:image"
          content="https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Expense Manager",
            operatingSystem: "Web",
            applicationCategory: "FinanceApplication",
            url: "https://expensemanager-f4ck.onrender.com/login",
            description:
              "Login to your Expense Manager account to track, manage, and analyze your personal expenses securely.",
            image: "https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png",
          })}
        </script>
      </Helmet>

      {/* Your existing login form JSX goes here */}
      <div className="min-h-[calc(100vh-60px)] flex justify-center items-center bg-base-200">
        <div className="card w-full max-w-md bg-base-100 sbhadow-2xl">
          <form onSubmit={handleSubmit} className="card-body gap-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <div className="form-control">
              <label
                htmlFor=""
                className="input input-bordered flex w-full items-center"
              >
                <Mail />
                <input
                  type="text"
                  value={formData.email}
                  aria-label="Email"
                  onBlur={handleEmailError}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setEmailErr("");
                  }}
                  placeholder="Email"
                />
              </label>

              {emailErr && (
                <p className="text-error text-sm mt-1">{emailErr}</p>
              )}
            </div>
            <div className="form-control">
              <label
                htmlFor=""
                className="input input-bordered flex w-full items-center"
              >
                <Lock />
                <input
                  type={showPassword ? "text" : "password"}
                  aria-label="Password"
                  onBlur={handlePasswordError}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setPasswordErr("");
                  }}
                  placeholder="Password"
                />
                <button
                  type="button"
                  aria-label="Toggle Password Visibility"
                  onClick={(e) => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeClosed className="w-5 h-5 opacity-70 cursor-pointer" />
                  ) : (
                    <Eye className="w-5 h-5 opacity-70 cursor-pointer" />
                  )}
                </button>
              </label>
              {passwordErr && (
                <p className="text-error text-sm mt-1">{passwordErr}</p>
              )}
            </div>

            <button
              aria-label="Login"
              className="btn btn-primary w-full mt-4"
              disabled={
                isLoggingIn ||
                !formData.email.trim() ||
                !formData.password.trim() ||
                passwordErr ||
                emailErr
              }
            >
              {isLoggingIn ? <Loader2 className="animate-spin" /> : "Log In"}
            </button>

            <p className="text-center text-sm">
              New User?
              <Link to="/signup" className="link link-primary ml-1">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
