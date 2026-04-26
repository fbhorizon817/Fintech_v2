import { useEffect, useState } from "react";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../services/api";
import { BookOpen, Plus, RefreshCw, Pencil, Trash2, X, Search } from "lucide-react";
import { useToast } from "../components/Toast";

const EMPTY = { title: "", excerpt: "", content: "", tag: "", author: "FBH Team", published: true };

const BlogForm = ({ post, onSave, onClose }) => {
  const toast = useToast();
  const [form, setForm]     = useState(post ? { ...post } : { ...EMPTY });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.title.trim()) return toast("Title zaroori hai", "error");
    setSaving(true);
    try {
      post?._id ? await updateBlogPost(post._id, form) : await createBlogPost(form);
      toast(`Post ${post?._id ? "update" : "create"} ho gayi ✓`);
      onSave();
    } catch (e) { toast(e.message || "Error", "error"); }
    finally { setSaving(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal fade-in" style={{ maxWidth: 680 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{post ? "Post Edit Karein" : "Nayi Post Banayein"}</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={15} /></button>
        </div>
        <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>TITLE *</label>
            <input className="input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Post title..." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>TAG</label>
              <input className="input" value={form.tag} onChange={e => set("tag", e.target.value)} placeholder="e.g. Odoo, ERP Strategy" />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>AUTHOR</label>
              <input className="input" value={form.author} onChange={e => set("author", e.target.value)} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>EXCERPT</label>
            <textarea className="input" rows={2} value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Short description..." style={{ resize: "vertical" }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CONTENT</label>
            <textarea className="input" rows={8} value={form.content} onChange={e => set("content", e.target.value)} placeholder="Post content..." style={{ resize: "vertical", fontFamily: "var(--font-mono)", fontSize: 13 }} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={form.published} onChange={e => set("published", e.target.checked)} style={{ width: 16, height: 16, accentColor: "var(--primary)" }} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Published (website pe visible)</span>
          </label>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <><RefreshCw size={13} className="spin" /> Saving...</> : post ? "Update Karein" : "Publish Karein"}
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const toast = useToast();
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch]     = useState("");

  const load = () => {
    setLoading(true);
    getBlogPosts({ limit: 100 })
      .then(r => setData(r.data))
      .catch(() => toast("Data load nahi hua", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlogPost(id);
      setData(d => d.filter(x => x._id !== id));
      setDeleting(null);
      toast("Post delete ho gayi ✓");
    } catch { toast("Delete fail ho gaya", "error"); }
  };

  const filtered = data.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.tag || "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Blog Posts</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>Posts manage karein</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={load} disabled={loading}><RefreshCw size={14} className={loading ? "spin" : ""} /></button>
          <button className="btn btn-primary" onClick={() => setEditing(false)}><Plus size={15} /> Nayi Post</button>
        </div>
      </div>

      <div style={{ marginBottom: 20, maxWidth: 360 }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
          <input className="input" placeholder="Title ya tag se search..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          {loading
            ? <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}><RefreshCw size={18} className="spin" style={{ margin: "0 auto" }} /></div>
            : filtered.length === 0
              ? <div className="empty-state"><BookOpen size={32} /><p>Koi post nahi mili</p></div>
              : <table>
                <thead><tr><th>Title</th><th>Tag</th><th>Author</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p._id}>
                      <td style={{ fontWeight: 600, maxWidth: 260 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                        {p.excerpt && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.excerpt}</div>}
                      </td>
                      <td>{p.tag ? <span className="badge" style={{ background: "rgba(37,99,235,0.12)", color: "#60a5fa" }}>{p.tag}</span> : "—"}</td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.author}</td>
                      <td><span className={`badge badge-${p.published ? "published" : "draft"}`}>{p.published ? "Published" : "Draft"}</span></td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{new Date(p.createdAt).toLocaleDateString("en-PK")}</td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => setEditing(p)}><Pencil size={12} /> Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => setDeleting(p)}><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      </div>

      {editing !== null && <BlogForm post={editing || null} onSave={() => { setEditing(null); load(); }} onClose={() => setEditing(null)} />}

      {deleting && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDeleting(null)}>
          <div className="modal fade-in" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Post Delete Karein?</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setDeleting(null)}><X size={15} /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                "<strong style={{ color: "var(--text)" }}>{deleting.title}</strong>" permanently delete ho jayegi.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={() => handleDelete(deleting._id)}><Trash2 size={13} /> Delete</button>
              <button className="btn btn-ghost" onClick={() => setDeleting(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
