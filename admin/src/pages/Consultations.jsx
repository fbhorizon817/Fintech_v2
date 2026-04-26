import { useEffect, useState } from "react";
import { getConsultations, updateConsultationStatus } from "../services/api";
import { CalendarCheck, RefreshCw, Eye, X, Search } from "lucide-react";
import { useToast } from "../components/Toast";

const STATUSES = ["pending", "confirmed", "cancelled"];

const DetailModal = ({ item, onClose, onStatus }) => (
  <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
    <div className="modal fade-in">
      <div className="modal-header">
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{item.name}</h3>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{item.inquiryType === "training" ? "🎓 Training" : "📋 Consultation"}</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={15} /></button>
      </div>
      <div className="modal-body">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[["Email", item.email], ["Phone", item.phone || "—"], ["Company", item.company || "—"], ["Service", item.service || "—"],
            ["Preferred Date", item.preferredDate ? new Date(item.preferredDate).toLocaleDateString("en-PK") : "—"],
            ["Date", new Date(item.createdAt).toLocaleDateString("en-PK")]
          ].map(([k, v]) => (
            <div key={k} style={{ background: "var(--surface2)", padding: "10px 14px", borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: 13 }}>{v}</div>
            </div>
          ))}
        </div>
        {item.message && (
          <div style={{ background: "var(--surface2)", padding: 14, borderRadius: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginBottom: 6 }}>MESSAGE</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{item.message}</p>
          </div>
        )}
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, marginBottom: 8 }}>STATUS UPDATE</div>
          <div style={{ display: "flex", gap: 8 }}>
            {STATUSES.map(s => (
              <button key={s} onClick={() => onStatus(item._id, s)}
                className={`btn btn-sm ${item.status === s ? "btn-primary" : "btn-ghost"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href={`mailto:${item.email}`} className="btn btn-primary btn-sm">Reply karein</a>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
);

const Consultations = () => {
  const toast = useToast();
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [statusF, setStatusF]   = useState("");
  const [typeF, setTypeF]       = useState("");
  const [search, setSearch]     = useState("");

  const load = () => {
    setLoading(true);
    getConsultations({ limit: 200, ...(statusF && { status: statusF }), ...(typeF && { type: typeF }) })
      .then(r => setData(r.data))
      .catch(() => toast("Data load nahi hua", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(load, [statusF, typeF]);

  const handleStatus = async (id, status) => {
    try {
      await updateConsultationStatus(id, status);
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
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Consultations</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>Consultation & training bookings</p>
        </div>
        <button className="btn btn-ghost" onClick={load} disabled={loading}>
          <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
          <input className="input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
        </div>
        <select className="input" style={{ width: "auto", minWidth: 140 }} value={typeF} onChange={e => setTypeF(e.target.value)}>
          <option value="">All Types</option>
          <option value="consultation">Consultation</option>
          <option value="training">Training</option>
        </select>
        <select className="input" style={{ width: "auto", minWidth: 140 }} value={statusF} onChange={e => setStatusF(e.target.value)}>
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          {loading
            ? <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}><RefreshCw size={18} className="spin" style={{ margin: "0 auto" }} /></div>
            : filtered.length === 0
              ? <div className="empty-state"><CalendarCheck size={32} /><p>Koi booking nahi mili</p></div>
              : <table>
                <thead><tr><th>Naam</th><th>Email</th><th>Type</th><th>Service</th><th>Status</th><th>Date</th><th></th></tr></thead>
                <tbody>
                  {filtered.map(item => (
                    <tr key={item._id}>
                      <td style={{ fontWeight: 600 }}>{item.name}</td>
                      <td style={{ color: "var(--text-muted)" }}>{item.email}</td>
                      <td style={{ fontSize: 12 }}>{item.inquiryType === "training" ? "🎓 Training" : "📋 Consultation"}</td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.service || "—"}</td>
                      <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{new Date(item.createdAt).toLocaleDateString("en-PK")}</td>
                      <td><button className="btn btn-ghost btn-sm" onClick={() => setSelected(item)}><Eye size={13} /> View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      </div>

      {selected && <DetailModal item={selected} onClose={() => setSelected(null)} onStatus={handleStatus} />}
    </div>
  );
};

export default Consultations;
