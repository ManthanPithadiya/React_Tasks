import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import CustomForm from "../components/Form/CustomForm";
import Pagination from "../components/Pagination/Pagination";
import ImageDragDrop from "../components/DragDrop/ImageDragDrop";
import "../Home.css"; // Import the CSS file

export default function Home() {
  const [items, setItems] = useLocalStorage("items", []);

  const handleAdd = (person) => {
    setItems((prev) => [person, ...prev]);
  };

  const clearAll = () => {
    if (window.confirm("Clear all saved items?")) {
      setItems([]); // ✅ clears state + localStorage
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <div className="header-content">
            <h2 className="app-title">Registration Form</h2>
            <p className="app-subtitle">Manage your registrations efficiently</p>
          </div>
          <button className="clear-btn" onClick={clearAll}>
            <span className="btn-icon">🗑️</span>
            Clear All
          </button>
        </header>

        <div className="main-content">
          <div className="form-section card">
            <div className="section-header">
              
              <div className="header-decoration"></div>
            </div>
            <CustomForm onAdd={handleAdd} />
          </div>

          <div className="table-section card">
            <div className="section-header">
              <h3>Registered Users</h3>
              <div className="header-decoration"></div>
            </div>
            <Pagination
              items={items}
              pageSize={5}
              renderRow={(it) => (
                <>
                  <td>{it.name}</td>
                  <td>{it.email}</td>
                  <td>{it.role}</td>
                </>
              )}
            />
          </div>

          <div className="drag-drop-section card">
            <div className="section-header">
              <h3>Image Upload</h3>
              <div className="header-decoration"></div>
            </div>
            <ImageDragDrop />
          </div>
        </div>

        <footer className="app-footer">
          <p>© 2023 Registration System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}