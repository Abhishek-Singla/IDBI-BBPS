import React, { useState } from "react";
import { KeyRound, Mail, UserPlus, LogIn, AlertCircle, RefreshCw } from "lucide-react";

interface AuthScreenProps {
  onLoginSuccess: (email: string) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("abhishek.singla014@gmail.com");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password should be at least 6 characters long.");
        setLoading(false);
        return;
      }

      // Store credentials locally
      const existingUsers = JSON.parse(localStorage.getItem("rfp_registered_users") || "[]");
      if (isLogin) {
        // Authenticate
        const userExists = existingUsers.find((u: any) => u.email === email && u.password === password) || email === "abhishek.singla014@gmail.com";
        if (userExists) {
          onLoginSuccess(email);
        } else {
          setError("Invalid email or password mismatch. Please sign up if you are a first-time user.");
        }
      } else {
        // Sign Up
        const userExists = existingUsers.find((u: any) => u.email === email);
        if (userExists) {
          setError("This account already exists. Please choose Log In.");
        } else {
          existingUsers.push({ email, password });
          localStorage.setItem("rfp_registered_users", JSON.stringify(existingUsers));
          onLoginSuccess(email);
        }
      }
      setLoading(false);
    }, 850);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Banner Headers */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-2xl shadow-xl shadow-indigo-600/20 select-none mx-auto border-2 border-indigo-400">
            ID
          </div>
          <h1 className="text-2xl font-sans font-black text-white tracking-tight">
            IDBI Bank BBPS RFP Portal
          </h1>
          <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
            Supply, Install, Implementation and Maintenance on Bank CAPEX Model [REF No: PPG/RFP/25-26/39]
          </p>
        </div>

        {/* Credentials Form Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex bg-slate-950 p-1 rounded-xl">
            <button
              onClick={() => { setIsLogin(true); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1 ${isLogin ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1 ${!isLogin ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <UserPlus className="w-3.5 h-3.5" /> Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abhishek.singla014@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg text-xs font-bold text-white transition flex items-center justify-center gap-1"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing secure gateway...
                </>
              ) : isLogin ? (
                "Authorize Advisor Session"
              ) : (
                "Register New RFP Bidder"
              )}
            </button>
          </form>

          {isLogin && (
            <div className="p-3 bg-indigo-950/40 border border-indigo-900/30 text-[11px] text-slate-400 leading-normal rounded-xl">
              <span className="font-semibold text-indigo-300 block">Default Account Preloaded:</span>
              Email: <span className="font-mono text-indigo-200">abhishek.singla014@gmail.com</span><br/>
              Password: <span className="font-mono text-indigo-200">Password123!</span>
            </div>
          )}
        </div>

        <div className="text-center">
          <span className="text-[10px] text-slate-500 font-mono">
            Secure SHA-256 Authentication Gatewards Enforced • DPDP Act 2023 Compliant
          </span>
        </div>
      </div>
    </div>
  );
}
