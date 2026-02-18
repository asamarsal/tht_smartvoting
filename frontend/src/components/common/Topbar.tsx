import { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Button from "@/components/common/Button";
import { Menu, Bell, X } from "lucide-react";
import LoadingCard from "@/components/common/LoadingCard";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuRef = useClickOutside(
    () => setMobileMenuOpen(false),
    [buttonRef as React.RefObject<HTMLElement>],
  );

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    await logout();
    setIsLoggingOut(false);
    navigate("/login");
  };

  return (
    <>
      {isLoggingOut && <LoadingCard overlay />}
      <nav className="bg-white shadow-sm">
        <div className="w-full px-0 relative">
          <div className="grid grid-cols-3 items-center h-16 max-w-full">
            {/* Left: Logo/Title */}
            <div className="flex justify-start pl-4">
              <Link to="/dashboard">
                <h1 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition cursor-pointer">
                  Smart Voting
                </h1>
              </Link>
            </div>

            {/* Center: Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center justify-center gap-8">
              <Link
                to="/create-polling"
                className={`font-medium transition ${
                  location.pathname === "/create-polling"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Create Polling
              </Link>
              <Link
                to="/vote-polling"
                className={`font-medium transition ${
                  location.pathname === "/vote-polling"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Vote Polling
              </Link>
            </div>

            {/* Right: User Info + Logout on Desktop */}
            <div className="hidden md:flex items-center justify-end gap-4 pr-4">
              <span className="text-sm text-gray-600">Hello, {user?.name}</span>
              <Button onClick={handleLogout} variant="danger" size="sm">
                Logout
              </Button>
            </div>

            {/* Mobile: Empty for grid structure */}
            <div className="md:hidden"></div>
          </div>

          {/* Mobile: Notification - absolute positioned next to hamburger */}
          <button
            className="md:hidden absolute top-4 right-12 p-2 hover:bg-gray-100 rounded-lg transition z-10"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Mobile: Hamburger - absolute positioned to flush right */}
          <button
            ref={buttonRef}
            className="md:hidden absolute top-4 right-0 p-2 hover:bg-gray-100 rounded-lg transition z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div
              ref={menuRef}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-3 space-y-3">
                {/* User Info */}
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                {/* Navigation Links */}
                <Link
                  to="/create-polling"
                  className={`block py-2 font-medium ${
                    location.pathname === "/create-polling"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Polling
                </Link>
                <Link
                  to="/vote-polling"
                  className={`block py-2 font-medium ${
                    location.pathname === "/vote-polling"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vote Polling
                </Link>

                {/* Logout Button */}
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  variant="danger"
                  size="sm"
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
