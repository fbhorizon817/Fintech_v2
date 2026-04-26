const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const key  = () => localStorage.getItem("fbh_admin_key") || "";

const h = () => ({ "Content-Type": "application/json", "x-admin-key": key() });

const handle = async (res) => {
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed");
  return data;
};

const qs = (p) => new URLSearchParams(p).toString();

export const getContacts         = (p = {}) => fetch(`${BASE}/admin/contacts?${qs(p)}`, { headers: h() }).then(handle);
export const updateContactStatus = (id, status) => fetch(`${BASE}/admin/contacts/${id}/status`, { method: "PATCH", headers: h(), body: JSON.stringify({ status }) }).then(handle);

export const getConsultations         = (p = {}) => fetch(`${BASE}/admin/consultations?${qs(p)}`, { headers: h() }).then(handle);
export const updateConsultationStatus = (id, status) => fetch(`${BASE}/admin/consultations/${id}/status`, { method: "PATCH", headers: h(), body: JSON.stringify({ status }) }).then(handle);

export const getBlogPosts   = (p = {}) => fetch(`${BASE}/admin/blog?${qs(p)}`, { headers: h() }).then(handle);
export const createBlogPost = (body)   => fetch(`${BASE}/admin/blog`, { method: "POST", headers: h(), body: JSON.stringify(body) }).then(handle);
export const updateBlogPost = (id, b)  => fetch(`${BASE}/admin/blog/${id}`, { method: "PUT",  headers: h(), body: JSON.stringify(b) }).then(handle);
export const deleteBlogPost = (id)     => fetch(`${BASE}/admin/blog/${id}`, { method: "DELETE", headers: h() }).then(handle);

export const getSubscribers = () => fetch(`${BASE}/admin/subscribers`, { headers: h() }).then(handle);
