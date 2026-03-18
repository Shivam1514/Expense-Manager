import React from "react";

const AuthSkeleton = () => {
  return (
    <>
      {/* Navbar Skeleton */}
      <div className="w-full bg-base-200 border-b border-base-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="skeleton h-8 w-32"></div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="skeleton h-8 w-20 hidden sm:block"></div>
            <div className="skeleton h-10 w-10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Page Skeleton */}
      <div className="max-w-3xl mx-auto px-4 space-y-8 pt-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="skeleton h-8 w-64 mx-auto"></div>
          <div className="skeleton h-4 w-48 mx-auto"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="card bg-base-200 p-5 text-center shadow-sm space-y-2"
            >
              <div className="skeleton h-4 w-24 mx-auto"></div>
              <div className="skeleton h-8 w-32 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <div className="skeleton h-10 w-full sm:w-40"></div>
          <div className="skeleton h-10 w-full sm:w-40"></div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="card bg-base-200 p-4 shadow-sm">
              <div className="skeleton h-48 w-full"></div>
            </div>
          ))}
        </div>

        {/* Budget Tracker */}
        <div className="card bg-base-200 p-4 shadow-sm space-y-3">
          <div className="skeleton h-6 w-40"></div>
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
    </>
  );
};

export default AuthSkeleton;
