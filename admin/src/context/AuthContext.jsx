import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const verifyKey = async (key) => {
  try {
    const res = await fetch(`${API}/admin/contacts?limit=1`, {
      headers: { "Content-Type": "application/json", "x-admin-key": key },
    });
    return res.ok;
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [authed, setAuthed]   = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("fbh_admin_key");
    if (saved) {
      verifyKey(saved)
        .then((ok) => { setAuthed(ok); if (!ok) localStorage.removeItem("fbh_admin_key"); })
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  const login = async (key) => {
    const ok = await verifyKey(key);
    if (ok) { localStorage.setItem("fbh_admin_key", key); setAuthed(true); }
    return ok;
  };

  const logout = () => { localStorage.removeItem("fbh_admin_key"); setAuthed(false); };

  return (
    <AuthContext.Provider value={{ authed, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
