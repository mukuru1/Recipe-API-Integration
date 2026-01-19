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
    const result = await login({ username, password }).unwrap();
    dispatch(setCredentials({ user: result.user, token: result.accessToken }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <Link to="/" className="block text-center text-orange-500 text-3xl font-bold mb-6">
          RecipeHub
        </Link>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Password"
          />
          <button
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg
                       hover:bg-orange-600 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
