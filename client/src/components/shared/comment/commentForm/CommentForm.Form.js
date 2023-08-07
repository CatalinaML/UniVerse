import * as Yup from "yup";

export function initialValues() {
  return {
    comment: "",
  };
}

export function validationSchema() {
  return Yup.object({
    comment: Yup.string().required("Escribe un comentartio"),
  });
}
