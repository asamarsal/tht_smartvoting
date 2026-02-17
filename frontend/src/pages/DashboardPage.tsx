import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">
              Smart Voting System
            </h1>
            <Button onClick={handleLogout} variant="danger" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name}! 🎉
            </h2>
            <p className="text-gray-600">You're successfully logged in</p>
          </div>

          {/* User Info Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Account
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-gray-600 w-24">Name:</span>
                <span className="font-medium text-gray-900">{user?.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-24">Email:</span>
                <span className="font-medium text-gray-900">{user?.email}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-24">User ID:</span>
                <span className="font-medium text-gray-900">{user?.id}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold text-gray-900 mb-1">Create Poll</h4>
              <p className="text-sm text-gray-600">Start a new voting poll</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🗳️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Vote</h4>
              <p className="text-sm text-gray-600">Participate in polls</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold text-gray-900 mb-1">Results</h4>
              <p className="text-sm text-gray-600">View poll analytics</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
