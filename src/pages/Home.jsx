import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import CustomForm from "../components/Form/CustomForm";
import Pagination from "../components/Pagination/Pagination";
import ImageDragDrop from "../components/DragDrop/ImageDragDrop";

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
    <div className="stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>Registration Form</h2>
        <button className="btn" onClick={clearAll}>
          Clear Items
        </button>
      </div>

      <CustomForm onAdd={handleAdd} />

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

      <ImageDragDrop />
    </div>
  );
}
