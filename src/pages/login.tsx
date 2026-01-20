import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useLoginMutation } from "@/features/auth/authApi";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ user: res, token: res.accessToken }));
      showToast("Logged in successfully", "success");
      navigate("/dashboard");
    } catch (err) {
      showToast("Login failed. Check credentials.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
          Welcome Back
        </h2>

        <input
          className="w-full border p-3 rounded mb-4 text-slate-800 placeholder:text-slate-400"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-6 text-slate-800 placeholder:text-slate-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
