import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./components/Toast";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Consultations from "./pages/Consultations";
import Blog from "./pages/Blog";
import Subscribers from "./pages/Subscribers";
import { Menu, Loader } from "lucide-react";

const SIDEBAR_W = 240;

const Layout = () => {
  const { authed, checking } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (checking) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, color: "var(--text-muted)" }}>
      <Loader size={20} className="spin" /> Loading...
    </div>
  );

  if (!authed) return <Login />;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content" style={{ flex: 1, marginLeft: SIDEBAR_W, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Topbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(13,17,23,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border2)", padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => setSidebarOpen(true)} className="menu-btn"
            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "none" }}>
            <Menu size={20} />
          </button>
          <span style={{ fontSize: 14, color: "var(--text-muted)" }}>Fintech Balance Horizon</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#1e3a5f,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>A</div>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Admin</span>
          </div>
        </header>

        {/* Page */}
        <main style={{ flex: 1, padding: "28px 24px", maxWidth: 1200, width: "100%" }}>
          <Routes>
            <Route path="/"              element={<Dashboard />} />
            <Route path="/contacts"      element={<Contacts />} />
            <Route path="/consultations" element={<Consultations />} />
            <Route path="/blog"          element={<Blog />} />
            <Route path="/subscribers"   element={<Subscribers />} />
            <Route path="*"              element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <ToastProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ToastProvider>
  </AuthProvider>
);

export default App;
