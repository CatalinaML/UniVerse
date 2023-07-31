import React, { useCallback, useState } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";

import { initialValues, validationSchema } from "./RegisterForm.Form";
import "./RegisterForm.scss";

import { ENV } from "../../../../utils/constants";
import { image } from "../../../../assets";
import { User } from "../../../../api";

const userController = new User();

export function RegisterForm(props) {
  const { openLogin } = props;

  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);
        setError("");
        await userController.register(formValue);
        openLogin();
      } catch (error) {
        console.error(error);
      }
    },
  });

  //procesar imagen
  const onDrop = useCallback((acceptedFiles) => {
    //actualiza el campo de file cuando se arrastra o carga una imagen
    const file = acceptedFiles[0];
    formik.setFieldValue("avatar", URL.createObjectURL(file));
    formik.setFieldValue("fileAvatar", file);
  });

  const { getInputProps, getRootProps } = useDropzone({
    //funcion para el dropzone
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  });

  const getAvatar = () => {
    //función que permite ver el avatar cuando se arrastra la imagen o se carga
    if (formik.values.fileAvatar) {
      //si ya hay una imagen en la base de datos
      return formik.values.avatar;
    } else if (formik.values.avatar) {
      //si se acaba de cambiar la imagen
      return `${ENV.BASE_PATH}/${formik.values.avatar}`;
    }
    //si no tiene imagen
    return image.noAvatar;
  };
  //-------------------------------------------------------

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <div className="register-form__avatar" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image avatar size="small" src={getAvatar()} />
      </div>

      <Form.Input
        name="username"
        placeholder="Nombre de usuario"
        onChange={formik.handleChange}
        value={formik.values.username}
        error={formik.errors.username}
      />

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
        error={formik.errors.email}
      />
      
      <Form.Input
        name="repeatPassword"
        type="password"
        placeholder="Repetir contraseña"
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />

      <Form.Button
        basic
        color="black"
        type="submit"
        fluid
        loading={formik.isSubmitting}
      >
        Registrarse
      </Form.Button>

      <p className="register-form__error">{error}</p>
    </Form>
  );
}
