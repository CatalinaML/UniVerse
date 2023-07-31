import React, { useCallback, useState } from "react";
import { Form, Image, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { ENV } from "../../../../utils";
import { image } from "../../../../assets";
import { initialValues, validationSchema } from "./ProfileForm.Form";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";

const userController = new User();

export function ProfileForm(props) {
  const { profile, onReload, close } = props;
  const { accessToken } = useAuth();

  const [errorUsername, setError] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(profile),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userController.updateUser(accessToken, formValue, profile._id);

        onReload();
        close();
      } catch (error) {
        if (error.msg === "Username inhabilitado") {
          setError("El nombre de usuario o email ya están en uso");
        } else {
          console.error(error);
        }
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

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="register-form__avatar" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image avatar size="small" src={getAvatar()} />
      </div>

      {errorUsername && (
        <Message negative>
          <p>{errorUsername}</p>
        </Message>
      )}

      <Form.Input
        name="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        error={formik.errors.username}
      />

      <Form.Input
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email ? true : false}
      />

      <Form.Button
        basic
        color="black"
        type="submit"
        fluid
        loading={formik.isSubmitting}
      >
        Editar
      </Form.Button>
    </Form>
  );
}
