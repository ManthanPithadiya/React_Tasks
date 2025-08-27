import React from "react";
import CustomForm from "../components/Form/CustomForm";
import useLocalStorage from "../hooks/useLocalStorage";

export default function FormPage() {
  const [items, setItems] = useLocalStorage("items", []);
  return (
    <div className="stack">
      <h2>Form Only</h2>
      <CustomForm onAdd={(p) => setItems([p, ...items])} />
      <pre className="card" style={{ overflowX: "auto" }}>
        <strong>Preview Saved Items (localStorage):</strong>
        {"\n"}{JSON.stringify(items, null, 2)}
      </pre>
    </div>
  );
}

