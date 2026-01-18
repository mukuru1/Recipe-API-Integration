import { useState } from "react";
import { useLoginMutation } from "@/features/auth/authApi";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("emilys"); 
  const [password, setPassword] = useState("emilyspass");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login({ username, password }).unwrap();
      dispatch(
        setCredentials({
          user: result, 
          token: result.accessToken,
        })
      );
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials. Try username: emilys / pass: emilyspass");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <Link to="/" className="text-orange-500 text-3xl font-bold mb-4 block">RecipeHub</Link>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to manage your recipes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-md disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Don't have an account? <span className="text-orange-500 font-semibold cursor-pointer">Sign up</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
