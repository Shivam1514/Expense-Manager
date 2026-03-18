import React, { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader2 } from "lucide-react";

const LogoutModal = ({ setIsLogout }) => {
  const { logout, isLoggingOut } = useAuthStore();
  async function handleLogout() {
    await logout();
    setIsLogout(false);
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsLogout(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setIsLogout]);

  return (
    <div className="modal modal-open">
      <div
        className="modal-backdrop backdrop-blur-sm bg-black/40"
        onClick={() => setIsLogout(false)}
      />
      <div className="modal-box">
        <p>Do you want to Logout</p>
        <div className="modal-action">
          <button
            disabled={isLoggingOut}
            autoFocus
            className="btn btn-error "
            onClick={handleLogout}
          >
            {isLoggingOut ? <Loader2 className="animate-spin" /> : "Logout"}
          </button>
          <button className="btn btn-ghost" onClick={() => setIsLogout(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
