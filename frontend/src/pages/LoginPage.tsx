import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Card from "@/components/common/Card";
import LoadingCard from "@/components/common/LoadingCard";
import backgroundImage from "@/assets/image/backgroundimage.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login({ email, password });

    if (result.success) {
      toast.success("Login successful!", {
        description: "Welcome back to Smart Voting System",
      });
      navigate("/dashboard");
    } else {
      setError(result.message || "Login failed");
      toast.error("Login failed", {
        description: result.message || "Please check your credentials",
      });
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingCard overlay />}
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Gradient overlay for better card visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-indigo-900/40"></div>

        {/* Content */}
        <Card className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
