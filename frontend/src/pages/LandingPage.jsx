import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Expense Manager | Track Expenses Easily</title>
        <meta
          name="description"
          content="Expense Manager helps you track daily expenses, analyze monthly spending, and manage your money effortlessly."
        />
        <meta
          name="keywords"
          content="expense manager, expense tracker, personal finance app"
        />
        <link
          rel="canonical"
          href="https://expensemanager-f4ck.onrender.com/"
        />
      </Helmet>

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <section className="max-w-xl text-center space-y-4">
          <h1 className="text-4xl font-bold">Simple Expense Tracking</h1>

          <p className="text-gray-600">
            Track daily expenses, visualize spending, and manage your budget
            with ease.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
