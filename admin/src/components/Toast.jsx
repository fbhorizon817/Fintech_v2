import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

const ToastCtx = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const remove = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.type === "success"
              ? <CheckCircle size={16} color="var(--accent)" />
              : <XCircle size={16} color="var(--danger)" />}
            <span style={{ flex: 1 }}>{t.message}</span>
            <button onClick={() => remove(t.id)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0 }}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};

export const useToast = () => useContext(ToastCtx);
