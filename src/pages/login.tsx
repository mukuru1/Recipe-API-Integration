import { useState } from "react";
import { useLoginMutation } from "@/features/auth/authApi";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import type { User } from "@/types/auth";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  // Registration fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !firstName || !lastName || !email) {
      showToast("Please fill in all fields", "error");
      return;
    }

    const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");

    if (localUsers.find((u: any) => u.username === username)) {
      showToast("Username already exists", "error");
      return;
    }

    const newUser: User = {
      id: Date.now(),
      username,
      firstName,
      lastName,
      email,
      image: "https://robohash.org/" + username,
    };

    // Store with password for simple local verification
    const userToStore = { ...newUser, password };

    localStorage.setItem("localUsers", JSON.stringify([...localUsers, userToStore]));
    showToast("Registration successful! Please login.", "success");
    setIsLogin(true);
    // Optional: Clear registration fields
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Try API Login
    try {
      // Only verify via API if using default credentials or if we want to try generic API match
      // But API might fail for local users. 
      // Strategy: Try API first. If it fails, check local storage.
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ user: res, token: res.accessToken }));
      showToast("Logged in successfully (API)", "success");
      navigate("/dashboard");
      return;
    } catch (apiError) {
      // API Login failed. Check Local Storage.
      console.log("API Login failed, checking local storage...");
    }

    // 2. Check Local Storage
    const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const foundUser = localUsers.find(
      (u: any) => u.username === username && u.password === password
    );

    if (foundUser) {
      // Remove password before storing in state
      const { password: _, ...userWithoutPass } = foundUser;
      dispatch(setCredentials({
        user: userWithoutPass,
        token: "local-token-" + Date.now()
      }));
      showToast("Logged in successfully (Local)", "success");
      navigate("/dashboard");
    } else {
      showToast("Login failed. Check credentials.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="bg-primary/50 backdrop-blur-lg border border-secondary p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-secondary mb-2 tracking-tight">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-secondary/80">
            {isLogin ? "Enter your details to access your recipes" : "Start your culinary journey today"}
          </p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full bg-secondary border border-secondary rounded-lg p-3 text-primary placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-secondary transition"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="w-full bg-secondary border border-secondary rounded-lg p-3 text-primary placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-secondary transition"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                className="col-span-2 w-full bg-secondary border border-secondary rounded-lg p-3 text-primary placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-secondary transition"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <input
            className="w-full bg-secondary border border-secondary rounded-lg p-3 text-primary placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-secondary transition"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="w-full bg-secondary border border-secondary rounded-lg p-3 text-primary placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-secondary transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={isLoading}
            className="w-full bg-secondary text-primary py-3 rounded-xl font-bold text-lg hover:bg-white/90 transition shadow-lg mt-6"
          >
            {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setUsername("");
              setPassword("");
            }}
            className="text-secondary/80 hover:text-secondary font-medium text-sm transition underline decoration-transparent hover:decoration-secondary underline-offset-4"
          >
            {isLogin
              ? "Don't have an account? Register now"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
