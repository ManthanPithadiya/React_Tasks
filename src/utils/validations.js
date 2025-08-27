import * as Yup from "yup";

export const personSchema = Yup.object({
  name: Yup.string().trim().min(2, "Too short").max(40, "Too long").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().oneOf(["user", "admin"], "Choose a role").required("Role is required"),
  agree: Yup.boolean().oneOf([true], "You must agree"),
  about: Yup.string().max(200, "Max 200 characters"),
});
