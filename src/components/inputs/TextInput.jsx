import React from "react";
import { useField } from "formik";

export default function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div>
      {label && <label className="label" htmlFor={props.id || props.name}>{label}</label>}
      <input className="input" {...field} {...props} />
      {meta.touched && meta.error ? <div className="err">{meta.error}</div> : null}
    </div>
  );
}
