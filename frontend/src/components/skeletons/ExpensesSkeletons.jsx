import React from "react";

const ExpensesSkeleton = () => {
  const monthsCount = 5; // number of month accordion skeletons
  const expensesPerMonth = 5; // number of expense skeletons per month

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-3 animate-pulse">
      {/* Totals Card Skeleton */}
      <div className="card bg-base-200 p-4 flex justify-between gap-4">
        <div className="space-y-2 w-1/2">
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
          <div className="h-6 bg-base-300 rounded w-1/2"></div>
        </div>
        <div className="space-y-2 w-1/2">
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
          <div className="h-6 bg-base-300 rounded w-1/2"></div>
        </div>
      </div>

      {/* Monthly Expense Accordion Skeletons */}
      {Array.from({ length: monthsCount }).map((_, idx) => (
        <div
          key={idx}
          className="collapse collapse-arrow bg-base-100 border border-base-300"
        >
          {/* Collapse header skeleton */}
          <div className="collapse-title flex justify-between items-center text-lg font-semibold">
            <div className="h-5 bg-base-300 rounded w-1/3"></div>
            <div className="h-5 bg-base-300 rounded w-1/4"></div>
          </div>

          {/* Collapse content skeleton */}
          <div className="collapse-content space-y-3 mt-2">
            {Array.from({ length: expensesPerMonth }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row justify-between p-4 bg-base-200 rounded-xl"
              >
                {/* Left: info skeleton */}
                <div className="flex flex-col gap-2 w-full md:w-3/4">
                  <div className="h-4 bg-base-300 rounded w-2/3"></div>
                  <div className="h-3 bg-base-300 rounded w-1/2"></div>
                  <div className="h-3 bg-base-300 rounded w-1/4"></div>
                </div>

                {/* Right: amount skeleton */}
                <div className="mt-2 md:mt-0 h-6 bg-base-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpensesSkeleton;
