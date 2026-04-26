import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Lock, Eye, EyeOff, Loader } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const [key, setKey]       = useState("");
  const [show, setShow]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true); setError("");
    const ok = await login(key.trim());
    if (!ok) setError("Admin key galat hai. Dobara try karein.");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 20 }}>
      <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 400, position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, margin: "0 auto 16px", background: "linear-gradient(135deg,#1e3a5f,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Lock size={24} color="white" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Admin Panel</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Fintech Balance Horizon</p>
        </div>

        <div className="card" style={{ boxShadow: "var(--shadow)" }}>
          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>Admin Secret Key</label>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <input type={show ? "text" : "password"} value={key} onChange={(e) => setKey(e.target.value)}
                placeholder="Secret key enter karein..." className="input" style={{ paddingRight: 42 }} autoFocus />
              <button type="button" onClick={() => setShow(!show)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "var(--radius)", padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#f87171" }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width: "100%", justifyContent: "center", padding: "11px 20px", fontSize: 14 }}>
              {loading ? <><Loader size={15} className="spin" /> Verify ho raha hai...</> : "Login"}
            </button>
          </form>
          <p style={{ marginTop: 16, fontSize: 12, color: "var(--text-dim)", textAlign: "center" }}>
            Key backend <code style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>.env</code> mein <code style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>ADMIN_SECRET_KEY</code> hai
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
