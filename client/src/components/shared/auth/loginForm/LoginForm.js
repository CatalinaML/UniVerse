import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";

import { initialValues, validationSchema } from "./LoginForm.Form";

import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";

const userController = new User();

export function LoginForm() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await userController.login(formValue);
        //GUARDAR TOKENS EN LOCALSOTRAGE
        userController.setAccessToken(response.access);
        userController.setRefreshToken(response.refresh);
        //authContext
        login(response.access);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electrónico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button
        basic
        color="black"
        type="submit"
        fluid
        loading={formik.isSubmitting}
      >
        Iniciar sesión
      </Form.Button>
    </Form>
  );
}
