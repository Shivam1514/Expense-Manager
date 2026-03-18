import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import ExpensesSkeleton from "../components/skeletons/ExpensesSkeletons";
import EditExpenseModal from "../components/modals/EditExpenseModal";
import ExpenseList from "../components/ExpenseList";
import { exportToCSV } from "../lib/exportToCSV";
import { useAuthStore } from "../store/useAuthStore";
import { Download } from "lucide-react";
import { Helmet } from "react-helmet";

const Expenses = () => {
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const { authUser } = useAuthStore();
  const [searchCategory, setCategory] = useState("");

  const { getExpenses, expenses, gettingExpenses, deleteExpense } =
    useExpenseStore();

  useEffect(() => {
    getExpenses();
  }, []);
  console.log(expenses);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setDeletingId(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => removeEventListener("keydown", handleKey);
  }, []);

  // const filteredExpenses = expenses.filter((expense) => {
  //   const searchtext = search.trim().toLowerCase();
  //   const titleText = expense?.title?.trim().toLowerCase();
  //   const matchesSearch = searchtext ? titleText.includes(searchtext) : true;

  //   const matchesCategory = searchCategory
  //     ? expense.category === searchCategory
  //     : true;

  //   return matchesSearch && matchesCategory;
  // });

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchtext = search.trim().toLowerCase();
      const titleText = expense?.title?.trim().toLowerCase();
      const matchesSearch = searchtext ? titleText.includes(searchtext) : true;
      const matchesCategory = searchCategory
        ? expense.category === searchCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, searchCategory]);

  // 1️⃣ Sort all expenses by latest date first
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // 2️⃣ Group sorted expenses by month-year
  // const groupedExpenses = sortedExpenses.reduce((groups, expense) => {
  //   const date = new Date(expense.date);
  //   const monthYear = date.toLocaleString("default", {
  //     month: "long",
  //     year: "numeric",
  //   });
  //   if (!groups[monthYear]) groups[monthYear] = [];
  //   groups[monthYear].push(expense);

  //   return groups;
  // }, {});

  const groupedExpenses = useMemo(
    () =>
      sortedExpenses.reduce((groups, expense) => {
        const date = new Date(expense.date);
        const monthYear = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        if (!groups[monthYear]) groups[monthYear] = [];
        groups[monthYear].push(expense);

        return groups;
      }, {}),
    [sortedExpenses]
  );

  // 3️⃣ Helpers
  const getMonthlyTotal = (expenses) =>
    expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  //  const getMonthlyTotal =useMemo(()=>(expenses) =>
  //   expenses.reduce((sum, exp) => sum + Number(exp.amount), 0),[expenses])

  // const totalExpense = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0)
  const totalExpense = useMemo(
    () => filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0),
    [filteredExpenses]
  );

  const numberOfMonths = Object.keys(groupedExpenses).length;
  const averageExpense =
    numberOfMonths > 0 ? Math.round(totalExpense / numberOfMonths) : 0;

  // 4️⃣ Handlers
  const handleDelete = useCallback(
    async (expenseId) => {
      setIsDeleting(true);

      await deleteExpense(expenseId);
      setDeletingId(null);
      setIsDeleting(false);
    },
    [deleteExpense]
  );

  // async function handleDelete(expenseId) {
  //   setIsDeleting(true);

  //   await deleteExpense(expenseId);
  //   setDeletingId(null);
  //   setIsDeleting(false);
  // }
  const handleEditExpense = useCallback(async (expenseId) => {
    setEditingId(expenseId);
  }, []);

  // async function handleEditExpense(expenseId) {
  //   setEditingId(expenseId);
  // }

  if (gettingExpenses) return <ExpensesSkeleton />;

  return (
    <>
      <Helmet>
        <title>View & Analyze Expenses | Expense Manager</title>
        <meta
          name="description"
          content="View, filter, and analyze all your personal expenses in Expense Manager. Track spending trends, export data as CSV, and manage your budget efficiently."
        />
        <meta
          name="keywords"
          content="view expenses, expense tracker, expense manager, personal finance, spending tracker, budget tracker, financial analysis, CSV export"
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="View & Analyze Expenses | Expense Manager"
        />
        <meta
          property="og:description"
          content="View, filter, and analyze all your personal expenses in Expense Manager. Track spending trends, export data as CSV, and manage your budget efficiently."
        />
        <meta
          property="og:image"
          content="https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png"
        />
        <meta
          property="og:url"
          content="https://expensemanager-f4ck.onrender.com/expenses"
        />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="View & Analyze Expenses | Expense Manager"
        />
        <meta
          name="twitter:description"
          content="View, filter, and analyze all your personal expenses in Expense Manager. Track spending trends, export data as CSV, and manage your budget efficiently."
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
            url: "https://yourwebsite.com/expenses",
            description:
              "View, filter, and analyze all your personal expenses in Expense Manager. Track spending trends, export data as CSV, and manage your budget efficiently.",
            image:
              "https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png",
          })}
        </script>
      </Helmet>

      <div className="max-w-2xl mx-auto space-y-3">
        {/* OVERALL TOTAL */}
        <div>
          <div className={`card bg-base-200 p-4 text-center gap-4 `}>
            <div className="flex flex-row  items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Total Expenses</p>
                <p className="text-2xl font-bold text-primary">
                  ₹{totalExpense.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">Average Expense</p>
                <p className="text-2xl font-bold text-primary">
                  ₹{averageExpense.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                exportToCSV(
                  filteredExpenses,
                  `${authUser?.name || "user"}_expenses`
                )
              }
              disabled={filteredExpenses.length === 0}
              className="tooltip tooltip-up btn btn-outline btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-tip="Download filtered expenses"
            >
              <Download size={20} />
              Export CSV
            </button>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search Expense"
                className="input input-bordered w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="select select-bordered w-full"
                value={searchCategory}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {filteredExpenses.length === 0 && (
            <p className="text-center text-gray-500 mt-4 ">No expenses found</p>
          )}

          {/* 5️⃣ Render grouped expenses */}
          {Object.entries(groupedExpenses).map(
            ([monthYear, monthExpenses], index) => {
              const monthlyTotal = getMonthlyTotal(monthExpenses);

              return (
                <div
                  key={`month-${monthYear}-${index}`}
                  className="collapse collapse-arrow bg-base-100 border border-base-300"
                >
                  <input
                    type="checkbox"
                    name="expense-accordion"
                    defaultChecked={index === 0}
                  />

                  {/* Month Header */}
                  <div className="collapse-title flex justify-between items-center text-lg font-semibold">
                    <span>{monthYear}</span>
                    <span className="badge badge-primary badge-lg">
                      Total: ₹{monthlyTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {/* Expense List */}
                  <div className="collapse-content">
                    <ul className="space-y-3">
                      {monthExpenses.map((expense) => (
                        <ExpenseList
                          key={expense._id}
                          expense={expense}
                          deletingId={deletingId}
                          isDeleting={isDeleting}
                          setIsDeleting={setIsDeleting}
                          setDeletingId={setDeletingId}
                          handleDelete={handleDelete}
                          handleEditExpense={handleEditExpense}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Edit Modal */}
        {editingId && (
          <EditExpenseModal
            expenseId={editingId}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}
      </div>
    </>
  );
};

export default Expenses;
