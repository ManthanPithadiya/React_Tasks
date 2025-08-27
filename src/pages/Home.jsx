import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import CustomForm from "../components/Form/CustomForm";
import Pagination from "../components/Pagination/Pagination";
import ImageDragDrop from "../components/DragDrop/ImageDragDrop";

export default function Home() {
  const [items, setItems] = useLocalStorage("items", []); // [{id, name, email, role, ...}]

  const handleAdd = (person) => {
    setItems(prev => [person, ...prev]);
  };

  const clearAll = () => {
    if (window.confirm("Clear all saved items?")) setItems([]);
  };

  return (
    <div className="stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>All Features</h2>
        <button className="btn" onClick={clearAll}>Clear Items</button>
      </div>

      {/* 1) Form — adds items */}
      <CustomForm onAdd={handleAdd} />

      {/* 2) Table + Pagination of form items */}
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

      {/* 3) Drag & Drop images */}
      <ImageDragDrop />
    </div>
  );
}

