import React, { useState } from "react";
import { Button, Confirm, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { Modal } from "../../../shared";
import { FormPost } from "../../post";
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";

import "./MyItemPost.scss";

const postController = new Post();

export function MyItemPost(props) {
  const { post, onReload } = props;
  const { accessToken } = useAuth();

  //MODAL
  const [showModal, setShowModal] = useState(false);
  //CONFIRM
  const [showConfirm, setShowConfirm] = useState(false);

  //ABRIR/CERRAR MODAL
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  //ABRIR/CERRAR CONFIRM
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await postController.deletePost(accessToken, post._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-item">
      <div className="post-item__imagen">
        <Image size="small" src={`${ENV.BASE_PATH}/${post.miniature}`} />

        <div className="post-item__image-title">
          <h2 className="post-item__info-title">{post.title}</h2>
        </div>
      </div>

      <div className="post-item__buttons">
        <Button basic as={Link} icon to={`/post/${post._id}`} target="_blank">
          <Icon name="eye" />
        </Button>

        <Button basic icon color="black" onClick={onOpenCloseModal}>
          <Icon name="pencil" />
        </Button>

        <Button icon basic color="orange" onClick={onOpenCloseConfirm}>
          <Icon name="trash" />
        </Button>
      </div>

      <Modal
        show={showModal}
        close={onOpenCloseModal}
        title="Editar Post"
        size="large"
      >
        <FormPost post={post} onClose={onOpenCloseModal} onReload={onReload} />
      </Modal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Está seguro que desea eliminar el post "${post.title}"?`}
        size="mini"
      />
    </div>
  );
}
