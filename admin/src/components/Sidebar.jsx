import { NavLink } from "react-router-dom";
import { LayoutDashboard, Mail, CalendarCheck, BookOpen, Users, LogOut, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/",              icon: LayoutDashboard, label: "Dashboard"     },
  { to: "/contacts",      icon: Mail,            label: "Contacts"      },
  { to: "/consultations", icon: CalendarCheck,   label: "Consultations" },
  { to: "/blog",          icon: BookOpen,        label: "Blog Posts"    },
  { to: "/subscribers",   icon: Users,           label: "Subscribers"   },
];

const Sidebar = ({ open, onClose }) => {
  const { logout } = useAuth();

  return (
    <>
      {open && (
        <div onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 49 }} />
      )}
      <aside
        className={`sidebar${open ? " open" : ""}`}
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
          background: "var(--surface)", borderRight: "1px solid var(--border2)",
          display: "flex", flexDirection: "column", zIndex: 50,
          transition: "transform 0.25s ease",
        }}>

        {/* Logo */}
        <div style={{ padding: "20px", borderBottom: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--primary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>FBH</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Admin Panel</div>
          </div>
          <button onClick={onClose} className="mobile-close-btn"
            style={{ background: "none", border: "none", color: "var(--text-muted)", display: "none", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={onClose}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: "var(--radius)", marginBottom: 2,
                fontSize: 14, fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--text)" : "var(--text-muted)",
                background: isActive ? "var(--surface2)" : "transparent",
                transition: "all 0.15s",
              })}>
              {({ isActive }) => (
                <>
                  <Icon size={16} color={isActive ? "var(--primary)" : undefined} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px 10px", borderTop: "1px solid var(--border2)" }}>
          <button onClick={logout} className="btn btn-ghost"
            style={{ width: "100%", justifyContent: "flex-start" }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
