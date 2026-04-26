import { useEffect, useState } from "react";
import { getContacts, updateContactStatus } from "../services/api";
import { Mail, RefreshCw, Eye, X, Search } from "lucide-react";
import { useToast } from "../components/Toast";

const SERVICE = { implementation: "Implementation", customization: "Customization", training: "Training", consulting: "Consulting", support: "Support" };
const STATUSES = ["new", "read", "replied"];

const DetailModal = ({ c, onClose, onStatus }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal fade-in">
      <div className="modal-header">
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{c.name}</h3>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{c.email}</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={15} /></button>
      </div>
      <div className="modal-body">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[["Company", c.company || "—"], ["Phone", c.phone || "—"], ["Service", SERVICE[c.service] || "—"], ["Date", new Date(c.createdAt).toLocaleDateString("en-PK")]].map(([k, v]) => (
            <div key={k} style={{ background: "var(--surface2)", padding: "10px 14px", borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: 13 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "var(--surface2)", padding: 14, borderRadius: 8, marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginBottom: 6 }}>MESSAGE</div>
          <p style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{c.message}</p>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, marginBottom: 8 }}>STATUS CHANGE KAREIN</div>
          <div style={{ display: "flex", gap: 8 }}>
            {STATUSES.map(s => (
              <button key={s} onClick={() => onStatus(c._id, s)}
                className={`btn btn-sm ${c.status === s ? "btn-primary" : "btn-ghost"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href={`mailto:${c.email}`} className="btn btn-primary btn-sm"><Mail size={13} /> Reply</a>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
);

const Contacts = () => {
  const toast = useToast();
  const [data, setData]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);
  const [statusFilter, setStatus] = useState("");
  const [search, setSearch]       = useState("");

  const load = () => {
    setLoading(true);
    getContacts({ limit: 200, ...(statusFilter && { status: statusFilter }) })
      .then(r => setData(r.data))
      .catch(() => toast("Data load nahi hua", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(load, [statusFilter]);

  const handleStatus = async (id, status) => {
    try {
      await updateContactStatus(id, status);
      setData(d => d.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(s => ({ ...s, status }));
      toast("Status update ho gaya ✓");
    } catch { toast("Update fail ho gaya", "error"); }
  };

  const filtered = data.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Contacts</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>Contact form submissions</p>
        </div>
        <button className="btn btn-ghost" onClick={load} disabled={loading}>
          <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
          <input className="input" placeholder="Naam ya email se search..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
        </div>
        <select className="input" style={{ width: "auto", minWidth: 140 }} value={statusFilter} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          {loading
            ? <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}><RefreshCw size={18} className="spin" style={{ margin: "0 auto" }} /></div>
            : filtered.length === 0
              ? <div className="empty-state"><Mail size={32} /><p>Koi contact nahi mila</p></div>
              : <table>
                <thead><tr><th>Naam</th><th>Email</th><th>Service</th><th>Status</th><th>Date</th><th></th></tr></thead>
                <tbody>
                  {filtered.map(c => (
                    <tr key={c._id}>
                      <td style={{ fontWeight: 600 }}>{c.name}</td>
                      <td style={{ color: "var(--text-muted)" }}>{c.email}</td>
                      <td>{SERVICE[c.service] || "—"}</td>
                      <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                      <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{new Date(c.createdAt).toLocaleDateString("en-PK")}</td>
                      <td><button className="btn btn-ghost btn-sm" onClick={() => setSelected(c)}><Eye size={13} /> View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      </div>

      {selected && <DetailModal c={selected} onClose={() => setSelected(null)} onStatus={handleStatus} />}
    </div>
  );
};

export default Contacts;
