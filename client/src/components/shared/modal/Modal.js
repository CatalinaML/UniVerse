import React from "react";
import { Modal as BasicModal } from "semantic-ui-react";

export function Modal(props) {
  const { show, close, title, size, children } = props;
  return (
    <BasicModal closeIcon open={show} onClose={close} size={size}>
      {title && <BasicModal.Header>{title}</BasicModal.Header>}
      <BasicModal.Content>{children}</BasicModal.Content>
    </BasicModal>
  );
}

BasicModal.defaultProps = {
  size: "tiny",
};
