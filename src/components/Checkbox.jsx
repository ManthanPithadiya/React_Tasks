import React from "react";
import { useField } from "formik";

export default function Checkbox({ label, ...props }) {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="row">
      <input type="checkbox" id={props.id || props.name} {...field} {...props} />
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? <div className="err">{meta.error}</div> : null}
    </div>
  );
}
