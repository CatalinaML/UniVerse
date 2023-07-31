import React, { useState } from "react";
import { Button } from "semantic-ui-react";

import { ListPost, Modal, FormPost } from "../../../components";

import "./HomeBlogger.scss";

export function HomeBlogger() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  //funcion para abrir/cerrar modal
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  //funcion para recargar pagina automaticamente
  const onReload = () => setReload((prevState) => !prevState);

  return (
    <div className="home-page">
      <div className="home-page__header">
        <Button basic color="black" onClick={onOpenCloseModal}>
          Crear Post
        </Button>
      </div>

      <ListPost reload={reload} />

      <Modal
        show={showModal}
        close={onOpenCloseModal}
        title={"Crear nuevo post"}
        size="large"
      >
        <FormPost onClose={onOpenCloseModal} onReload={onReload} />
      </Modal>
    </div>
  );
}
