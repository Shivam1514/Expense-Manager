import React from "react";
import { Link } from "react-router-dom";
import { useExpenseStore } from "../store/useExpenseStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import HomeSkeleton from "../components/skeletons/HomeSkeletons";
import MonthlyExpenseChart from "../components/charts/MonthlyExpenseChart";
import CategoryExpensePie from "../components/charts/CategoryExpenseChart";
import BudgetTracker from "../components/BudgetTracker";
import TodayExpense from "../components/TodayExpense";
import { Helmet } from "react-helmet"; // ✅ Import Helmet

const Home = () => {
  const { getExpenses, expenses, gettingExpenses } = useExpenseStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!authUser) return;
    getExpenses();
  }, []);

  if (gettingExpenses) return <HomeSkeleton />;

  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );
  const numberOfMonths = new Set(
    expenses.map(
      (e) => new Date(e.date).getMonth() + "-" + new Date(e.date).getFullYear()
    )
  ).size;
  const averageExpense = numberOfMonths
    ? Math.round(totalExpense / numberOfMonths)
    : 0;

  return (
    <>
      <Helmet>
        <title>Expense Manager & Tracker | Personal Finance App</title>
        <meta
          name="description"
          content="Track, analyze, and manage your personal expenses with Expense Manager. Plan budgets, view charts, and export data as CSV."
        />
        <meta
          name="keywords"
          content="expense tracker, expense manager, budget manager, personal finance, money management, financial tracker, CSV export"
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Expense Manager & Tracker | Personal Finance App"
        />
        <meta
          property="og:description"
          content="Track, analyze, and manage your personal expenses with Expense Manager. Plan budgets, view charts, and export data as CSV."
        />
        <meta
          property="og:image"
          content="https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png"
        />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Expense Manager & Tracker | Personal Finance App"
        />
        <meta
          name="twitter:description"
          content="Track, analyze, and manage your personal expenses with Expense Manager. Plan budgets, view charts, and export data as CSV."
        />
        <meta
          name="twitter:image"
          content="https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png"
        />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Expense Manager",
            operatingSystem: "Web",
            applicationCategory: "FinanceApplication",
            url: "https://expensemanager-f4ck.onrender.com/",
            description:
              "Track and analyze your personal expenses with a simple online expense manager. Export data as CSV for deeper analysis.",
            image:
              "https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png",
          })}
        </script>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 space-y-8 pt-8">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome,{" "}
            <span className="text-primary">
              {authUser?.name?.toUpperCase()}
            </span>
          </h1>
          <p className="text-sm text-gray-500">
            Here's a quick overview of your spending
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card bg-base-200 p-5 text-center shadow-sm">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Total Expenses
            </p>
            <p className="text-3xl font-bold text-primary mt-1">
              ₹{totalExpense.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="card bg-base-200 p-5 text-center shadow-sm">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Average Expense
            </p>
            <p className="text-3xl font-bold text-primary mt-1">
              ₹{averageExpense.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/addexpense" className="btn btn-primary w-full sm:w-auto">
            Add Expense
          </Link>
          <Link to="/expenses" className="btn btn-outline w-full sm:w-auto">
            View Expenses
          </Link>
        </div>

        {/* Charts */}
        {expenses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-200 p-4 shadow-sm">
              <MonthlyExpenseChart expenses={expenses} />
            </div>
            <div className="card bg-base-200 p-4 shadow-sm">
              <CategoryExpensePie expenses={expenses} />
            </div>
          </div>
        )}

        {/* Budget Tracker */}
        <div className="pt-2 mb-2">
          <BudgetTracker />
        </div>

        <div className="pt-2 mb-2">
          <TodayExpense />
        </div>
      </div>
    </>
  );
};

export default Home;
