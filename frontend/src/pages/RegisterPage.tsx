import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Card from "@/components/common/Card";
import LoadingCard from "@/components/common/LoadingCard";
import backgroundImage from "@/assets/image/backgroundimage.png";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await register({ name, email, password });

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message || "Registration failed");
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
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2">Join Smart Voting System</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Name Input */}
            <Input
              label="Full Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />

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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              helperText="At least 8 characters"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
