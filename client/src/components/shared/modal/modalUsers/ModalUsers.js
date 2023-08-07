import React from "react";
import { Modal } from "semantic-ui-react";

export function ModalUsers(props) {
  const { show, close, title, size, children } = props;
  return (
    <Modal closeIcon open={show} onClose={close} size={size}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content scrolling>{children}</Modal.Content>
    </Modal>
  );
}
