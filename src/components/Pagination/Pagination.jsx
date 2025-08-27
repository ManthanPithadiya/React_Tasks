import React, { useMemo } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

/**
 * Props:
 *  - items: any[]
 *  - pageSize: number (default 5)
 *  - renderRow(item): JSX row body (tds)
 */
export default function Pagination({ items = [], pageSize = 5, renderRow }) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const [currentPage, setCurrentPage] = useLocalStorage("pagination.currentPage", 1);

  const page = Math.min(currentPage, totalPages);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const go = (p) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  const middle = useMemo(() => {
    // 3 middle buttons centered around current page
    const span = [page - 1, page, page + 1].filter(p => p >= 1 && p <= totalPages);
    return Array.from(new Set(span));
  }, [page, totalPages]);

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>People ({items.length})</h3>

      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th></tr>
          </thead>
          <tbody>
            {pageItems.map(it => (
              <tr key={it.id}>
                <td>{it.name}</td>
                <td>{it.email}</td>
                <td>{it.role}</td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr><td colSpan={3} style={{ color:"#666" }}>No data on this page.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pager" style={{ marginTop: 12 }}>
        <button className="pill" onClick={() => go(page - 1)} disabled={page === 1}>Prev</button>

        {/* First */}
        <button className={`pill ${page === 1 ? "active" : ""}`} onClick={() => go(1)}>1</button>

        {/* Left ellipsis */}
        {page > 3 && <span className="pill ellipsis">…</span>}

        {/* Middle 3 around current */}
        {middle.filter(p => p !== 1 && p !== totalPages).map(p => (
          <button key={p} className={`pill ${page === p ? "active" : ""}`} onClick={() => go(p)}>{p}</button>
        ))}

        {/* Right ellipsis */}
        {page < totalPages - 2 && <span className="pill ellipsis">…</span>}

        {/* Last */}
        {totalPages > 1 && (
          <button className={`pill ${page === totalPages ? "active" : ""}`} onClick={() => go(totalPages)}>
            {totalPages}
          </button>
        )}

        <button className="pill" onClick={() => go(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}

