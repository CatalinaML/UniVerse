import React, { useEffect, useState } from "react";
import { Button, Icon, Image, Label, LabelDetail } from "semantic-ui-react";
import { image } from "../../../../assets";

import { ProfileForm } from "../FormProfile";
import { Modal } from "../../../shared";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { User } from "../../../../api";

import "./Profile.scss";

const userController = new User();

export function Profile(props) {
  const { onReload, reload } = props;
  const { accessToken } = useAuth();

  const [user, setUser] = useState(null);

  //MODAL
  const [showModal, setShowModal] = useState(false);

  //ABRIR/CERRAR MODAL
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        setUser(null);
        const response = await userController.getMe(accessToken);
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  return (
    <div className="profile">
      <div className="profile-box">
        <div className="profile-box__image">
          {user?.avatar ? (
            <Image
              avatar
              size="small"
              src={`${ENV.BASE_PATH}/${user.avatar}`}
            />
          ) : (
            <Image avatar size="small" src={image.noAvatar} />
          )}
        </div>

        <div className="profile-box__content">
          <h1>{user?.username}</h1>

          <div className="followers">
            <Label size="medium">
              Seguidos
              <LabelDetail>{user?.follow.length || 0}</LabelDetail>
            </Label>
            <Label size="medium">
              Seguidores
              <LabelDetail>{user?.followers.length || 0}</LabelDetail>
            </Label>
          </div>

          <div className="box-buttons">
            <div className="profile-box__buttons">
              <Button basic color="black" onClick={onOpenCloseModal}>
                <Icon name="edit" />
                Editar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        close={onOpenCloseModal}
        title="Editar perfil"
        size="small"
      >
        <ProfileForm
          profile={user}
          close={onOpenCloseModal}
          onReload={onReload}
        />
      </Modal>
    </div>
  );
}
