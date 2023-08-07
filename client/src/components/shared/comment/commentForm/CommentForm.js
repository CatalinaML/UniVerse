import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { Comment } from "../../../../api";
import { useAuth } from "../../../../hooks";

import { initialValues, validationSchema } from "./CommentForm.Form";

const commentController = new Comment();

export function CommentForm(props) {
  const { idPost, onReload } = props;

  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //llamada al controller
        await commentController.createComment(accessToken, idPost, formValue);

        onReload();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.TextArea
        name="comment"
        onChange={formik.handleChange}
        value={formik.values.comment}
        error={formik.errors.comment}
      />
      <Form.Button type="submit" loading={formik.isSubmitting}>
        <Icon name="edit" />
        Comentar
      </Form.Button>
    </Form>
  );
}
