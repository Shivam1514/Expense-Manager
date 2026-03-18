import React, { useEffect, useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet"; // ✅ Import at the top

const AddExpense = () => {
  const { addExpense, addingExpense, deleteExpense } = useExpenseStore();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    note: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const addedExpense = await addExpense(formData);
    if (addedExpense) {
      setFormData({
        title: "",
        amount: "",
        note: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });

      // toast((t) => (
      //   <span>
      //     Expense Saved
      //     <button
      //       onClick={() => {
      //         toast.dismiss(t.id);
      //         deleteExpense(addedExpense._id);
      //       }}
      //     >
      //       Undo
      //     </button>
      //   </span>
      // ));

      // toast(
      //   (t) => (
      //     <div
      //       className={`flex items-center justify-between gap-4

      //     ${t.visible ? "animate-enter" : "animate-leave"}`}
      //     >
      //       <div className="flex gap-4">
      //         <Check />
      //         <div>
      //           <p className="font-medium text-lg">Expense added</p>
      //           <p className="text-lg text-gray-500">
      //             {addedExpense.title} • ₹{addedExpense.amount}
      //           </p>
      //         </div>

      //         <button
      //           className="btn btn-sm btn-error rounded-lg"
      //           onClick={() => {
      //             deleteExpense(addedExpense._id);
      //             toast.dismiss(t.id);
      //           }}
      //         >
      //           Undo
      //         </button>
      //       </div>
      //     </div>
      //   ),
      //   { duration: 3000 }
      // );
      toast(
        (t) => (
          <div
            className={`flex items-center  gap-4 p-2 w-full max-w-sm
            ${t.visible ? "animate-enter" : "animate-leave"}`}
          >
            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20 text-success">
              <Check className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1 ">
              <p className="font-semibold">Expense added</p>
              <p className="text-sm">
                {addedExpense.title} • ₹{addedExpense.amount}
              </p>
            </div>

            {/* Action */}
            <button
            aria-label="undo saving expense"
              className="text-sm btn btn-error btn-sm "
              onClick={() => {
                deleteExpense(addedExpense._id);
                toast.dismiss(t.id);
              }}
            >
              Undo
            </button>
          </div>
        ),
        { duration: 3000 }
      );
    }
  }

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
    }));
  }, []);

  return (
    

// Inside your return(), just before the main div
<>
  <Helmet>
    <title>Add New Expense | Expense Manager</title>
    <meta
      name="description"
      content="Add a new personal expense in Expense Manager. Track your spending by entering details such as title, amount, category, note, and date."
    />
    <meta
      name="keywords"
      content="add expense, expense tracker, personal finance, expense manager, budget tracker, money management"
    />

    {/* Open Graph */}
    <meta property="og:title" content="Add New Expense | Expense Manager" />
    <meta
      property="og:description"
      content="Add a new personal expense in Expense Manager. Track your spending by entering details such as title, amount, category, note, and date."
    />
    <meta property="og:image" content="https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png" />
    <meta property="og:url" content="https://expensemanager-f4ck.onrender.com/addexpense" />
    <meta property="og:type" content="website" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Add New Expense | Expense Manager" />
    <meta
      name="twitter:description"
      content="Add a new personal expense in Expense Manager. Track your spending by entering details such as title, amount, category, note, and date."
    />
    <meta name="twitter:image" content="https://expensemanager-f4ck.onrender.com/Logo_expense_manager.png" />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Expense Manager",
        operatingSystem: "Web",
        applicationCategory: "FinanceApplication",
        url: "https://expensemanager-f4ck.onrender.com/addexpense",
        description:
          "Add a new personal expense in Expense Manager. Track your spending by entering details such as title, amount, category, note, and date.",
        image: "https://expensemanager-f4ck.onrender.com//Logo_expense_manager.png",
      })}
    </script>
  </Helmet>

  {/* Your existing AddExpense form UI goes here */}

    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-linear-to-br from-base-100 to-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center text-primary">
            Add Expense
          </h2>
          <label htmlFor="title" className="sr-only" />

          <input
            type="text"
            aria-label="Title"
            placeholder="Title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <label htmlFor="amount" className="sr-only" />
          <input
            type="number"
            aria-label="Amount"
            placeholder="Amount"
            className="input input-bordered w-full"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <label htmlFor="note" className="sr-only" />
          <input
            type="text"
            aria-label="Note"
            placeholder="Note"
            className="input input-bordered w-full"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />

          <label htmlFor="category" className="sr-only" />
          <select
            className="select select-bordered w-full"
            aria-label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="date" className="sr-only" />
          <input
            type="date"
            aria-label="Date"
            className="input input-bordered w-full"
            placeholder="Enter"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <button
          aria-label="save expense"
            className="btn btn-primary w-full mt-2"
            disabled={addingExpense}
          >
            {addingExpense ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Add Expense"
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddExpense;
