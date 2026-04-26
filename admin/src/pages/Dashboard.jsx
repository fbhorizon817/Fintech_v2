import { useEffect, useState } from "react";
import { getContacts, getConsultations, getBlogPosts, getSubscribers } from "../services/api";
import { Mail, CalendarCheck, BookOpen, Users, TrendingUp, AlertCircle, Loader } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="card fade-in" style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon size={22} color={color} />
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getContacts({ limit: 200 }), getConsultations({ limit: 200 }), getBlogPosts({ limit: 100 }), getSubscribers()])
      .then(([c, co, b, s]) => setData({ contacts: c.data, consultations: co.data, posts: b.data, subscribers: s.data }))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, gap: 10, color: "var(--text-muted)" }}>
      <Loader size={18} className="spin" /> Loading...
    </div>
  );

  const { contacts: c = [], consultations: co = [], posts: p = [], subscribers: s = [] } = data;
  const newContacts  = c.filter(x => x.status === "new").length;
  const pendingCons  = co.filter(x => x.status === "pending").length;
  const published    = p.filter(x => x.published).length;

  // Last 7 days chart
  const chart = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return {
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      count: c.filter(x => new Date(x.createdAt).toDateString() === d.toDateString()).length,
    };
  });

  const recent = [...c].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const serviceLabels = { implementation: "Implementation", customization: "Customization", training: "Training", consulting: "Consulting", support: "Support" };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Dashboard</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>Fintech Balance Horizon overview</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard icon={Mail}          label="Total Contacts"   value={c.length}   sub={`${newContacts} new`}     color="#2563eb" />
        <StatCard icon={CalendarCheck} label="Consultations"    value={co.length}  sub={`${pendingCons} pending`} color="#f59e0b" />
        <StatCard icon={BookOpen}      label="Blog Posts"       value={p.length}   sub={`${published} published`} color="#10b981" />
        <StatCard icon={Users}         label="Subscribers"      value={s.length}   sub="newsletter"               color="#8b5cf6" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>

        {/* Bar chart */}
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={16} color="var(--primary)" /> Contacts — Pichlé 7 Din
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chart} barSize={28}>
              <XAxis dataKey="label" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13 }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {chart.map((_, i) => <Cell key={i} fill={i === 6 ? "var(--primary)" : "var(--surface2)"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent contacts */}
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Mail size={16} color="var(--primary)" /> Recent Contacts
          </h3>
          {recent.length === 0
            ? <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Abhi koi contact nahi</p>
            : recent.map(r => (
              <div key={r._id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid var(--border2)" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                  {r.name?.[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{serviceLabels[r.service] || "General"}</div>
                </div>
                <span className={`badge badge-${r.status}`}>{r.status}</span>
              </div>
            ))
          }
        </div>

        {/* Pending actions */}
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertCircle size={16} color="var(--warn)" /> Pending Actions
          </h3>
          {[
            { label: "Unread contacts",         count: newContacts,                          color: "var(--primary)", icon: Mail          },
            { label: "Pending consultations",   count: pendingCons,                          color: "var(--warn)",    icon: CalendarCheck },
            { label: "Draft blog posts",        count: p.filter(x => !x.published).length,  color: "var(--text-muted)", icon: BookOpen   },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <item.icon size={15} color={item.color} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13 }}>{item.label}</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: item.count > 0 ? item.color : "var(--text-dim)" }}>{item.count}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
