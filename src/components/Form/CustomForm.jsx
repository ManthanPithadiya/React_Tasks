import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import TextInput from "../inputs/TextInput";
import Checkbox from "../Checkbox";
import Radio from "../inputs/Radio";
import Textarea from "../inputs/Textarea";
import * as Yup from "yup";
import useLocalStorage from "../../hooks/useLocalStorage";

// ✅ Fixed validation schema with proper email regex
export const personSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Invalid email format"
    ),
  role: Yup.string().required("Role is required"),
  agree: Yup.boolean().oneOf([true], "You must agree to continue"),
  about: Yup.string(),
});

/**
 * Props:
 *  - onAdd(item): called with clean payload when form submits
 */
export default function CustomForm({ onAdd }) {
  // Persist draft so user doesn't lose data on refresh
  const [draft, setDraft] = useLocalStorage("form.draft", {
    name: "",
    email: "",
    role: "user",
    agree: false,
    about: "",
  });

  useEffect(() => {
    // optional: clear draft when an item is added by parent
    // handled via prop if needed
  }, []);

  return (
    <div className="card">
      <Formik
        initialValues={draft}
        validationSchema={personSchema}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          const payload = { id: Date.now(), ...values };
          onAdd?.(payload);
          resetForm();
          setDraft({
            name: "",
            email: "",
            role: "user",
            agree: false,
            about: "",
          });
        }}
      >
        {({ values, isSubmitting, resetForm }) => (
          <Form className="stack">
            <TextInput name="name" label="Full name" placeholder="Jane Doe" />
            <TextInput
              name="email"
              type="email"
              label="Email"
              placeholder="jane@example.com"
            />

            <div>
              <div className="label">Role</div>
              <div className="row">
                <Radio name="role" value="user" label="User" />
                <Radio name="role" value="admin" label="Admin" />
              </div>
            </div>

            <Textarea
              name="about"
              label="About"
              placeholder="Short bio (optional)"
            />
            <Checkbox name="agree" label="I agree to the terms" />

            <div className="row">
              <button
                type="submit"
                className="btn primary"
                disabled={isSubmitting}
              >
                Add
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => {
                  resetForm();
                  setDraft({
                    name: "",
                    email: "",
                    role: "user",
                    agree: false,
                    about: "",
                  });
                }}
              >
                Clear Draft
              </button>
            </div>

            {/* Auto-save draft */}
            <AutoSaver values={values} onSave={(v) => setDraft(v)} />
          </Form>
        )}
      </Formik>
    </div>
  );
}

// Save form values to localStorage whenever they change (debounced)
function AutoSaver({ values, onSave }) {
  React.useEffect(() => {
    const id = setTimeout(() => onSave(values), 250);
    return () => clearTimeout(id);
  }, [values, onSave]);
  return null;
}
