import { useEffect, useState } from "react";
import { getSubscribers } from "../services/api";
import { Users, RefreshCw, Search, Download } from "lucide-react";
import { useToast } from "../components/Toast";

const Subscribers = () => {
  const toast = useToast();
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");

  const load = () => {
    setLoading(true);
    getSubscribers()
      .then(r => setData(r.data))
      .catch(() => toast("Data load nahi hua", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = data.filter(s => !search || s.email.toLowerCase().includes(search.toLowerCase()));

  const exportCSV = () => {
    const csv = ["Email,Date", ...filtered.map(s => `${s.email},${new Date(s.createdAt).toLocaleDateString("en-PK")}`)].join("\n");
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })), download: "subscribers.csv" });
    a.click();
    toast("CSV download ho rahi hai ✓");
  };

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Subscribers</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>Newsletter subscribers — Total: <strong style={{ color: "var(--text)" }}>{data.length}</strong></p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={load} disabled={loading}><RefreshCw size={14} className={loading ? "spin" : ""} /></button>
          <button className="btn btn-ghost" onClick={exportCSV} disabled={filtered.length === 0}><Download size={14} /> CSV Export</button>
        </div>
      </div>

      <div style={{ marginBottom: 20, maxWidth: 360 }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
          <input className="input" placeholder="Email se search..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          {loading
            ? <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}><RefreshCw size={18} className="spin" style={{ margin: "0 auto" }} /></div>
            : filtered.length === 0
              ? <div className="empty-state"><Users size={32} /><p>Koi subscriber nahi mila</p></div>
              : <table>
                <thead><tr><th>#</th><th>Email</th><th>Status</th><th>Subscribe Date</th></tr></thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s._id}>
                      <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{i + 1}</td>
                      <td style={{ fontWeight: 500, fontFamily: "var(--font-mono)", fontSize: 13 }}>{s.email}</td>
                      <td><span className={`badge badge-${s.active ? "published" : "draft"}`}>{s.active ? "Active" : "Inactive"}</span></td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{new Date(s.createdAt).toLocaleDateString("en-PK", { dateStyle: "medium" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      </div>
    </div>
  );
};

export default Subscribers;
