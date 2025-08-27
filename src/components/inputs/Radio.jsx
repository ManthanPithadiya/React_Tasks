import React from "react";
import { useField } from "formik";

/** Radio group item — pass unique `value` and same `name` for grouping */
export default function Radio({ label, ...props }) {
  const [field] = useField({ ...props, type: "radio" });
  return (
    <label className="row" style={{ gap: 6 }}>
      <input type="radio" {...field} {...props} />
      <span>{label}</span>
    </label>
  );
}
