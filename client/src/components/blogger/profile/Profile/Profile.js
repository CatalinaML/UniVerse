import React, { useEffect, useState } from "react";
import { Button, Icon, Image, Label } from "semantic-ui-react";
import { image } from "../../../../assets";

import { ProfileForm } from "../FormProfile";
import { Modal, ModalUsers } from "../../../shared";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { User } from "../../../../api";
import { FollowerList } from "../../../shared/followersList/FollowerList";

import "./Profile.scss";

const userController = new User();

export function Profile(props) {
  const { onReload, reload } = props;
  const { accessToken } = useAuth();

  const [user, setUser] = useState(null);

  //MODAL
  const [showModal, setShowModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [type, setType] = useState(null);

  //ABRIR/CERRAR MODAL
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseFollowersModal = (type) => {
    setType(type);
    setShowFollowersModal((prevState) => !prevState);
  };

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
          <div className="box-buttons">
            <h1>{user?.username}</h1>
            <div className="profile-box__buttons">
              <Icon name="edit" onClick={onOpenCloseModal} />
            </div>
          </div>

          <div className="followers">
            <Button
              as="div"
              labelPosition="right"
              className="follow"
              onClick={() => onOpenCloseFollowersModal("follow")}
            >
              <Button>Seguidos</Button>
              <Label basic pointing="left">
                {user?.follow.length || 0}
              </Label>
            </Button>
            <Button
              as="div"
              labelPosition="right"
              className="followers"
              onClick={() => onOpenCloseFollowersModal("followers")}
            >
              <Button>Seguidores</Button>
              <Label basic pointing="left">
                {user?.followers.length || 0}
              </Label>
            </Button>
          </div>
        </div>
      </div>

      <ModalUsers
        show={showFollowersModal}
        close={() => onOpenCloseFollowersModal("")}
        title={type === "follow" ? "Seguidos" : "Seguidores"}
        size="tiny"
      >
        <FollowerList type={type} userProfile={user} />
      </ModalUsers>

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
