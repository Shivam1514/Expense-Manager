import React from "react";
const HomeSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 space-y-8 pt-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="skeleton h-8 w-64 mx-auto"></div>
        <div className="skeleton h-4 w-48 mx-auto"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card bg-base-200 p-5 text-center shadow-sm space-y-2">
          <div className="skeleton h-4 w-24 mx-auto"></div>
          <div className="skeleton h-8 w-32 mx-auto"></div>
        </div>

        <div className="card bg-base-200 p-5 text-center shadow-sm space-y-2">
          <div className="skeleton h-4 w-24 mx-auto"></div>
          <div className="skeleton h-8 w-32 mx-auto"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <div className="skeleton h-10 w-full sm:w-40"></div>
        <div className="skeleton h-10 w-full sm:w-40"></div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 p-4 shadow-sm">
          <div className="skeleton h-48 w-full"></div>
        </div>
        <div className="card bg-base-200 p-4 shadow-sm">
          <div className="skeleton h-48 w-full"></div>
        </div>
      </div>

      {/* Budget Tracker */}
      <div className="card bg-base-200 p-4 shadow-sm">
        <div className="skeleton h-6 w-40 mb-3"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>

      {/* Today Expense */}
      <div className="card bg-base-200 p-4 shadow-sm space-y-3">
        <div className="skeleton h-6 w-40"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-2/3"></div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
