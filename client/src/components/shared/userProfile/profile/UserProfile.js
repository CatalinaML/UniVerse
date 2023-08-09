import React, { useEffect, useState } from "react";
import { Button, Image, Label } from "semantic-ui-react";

import { User } from "../../../../api";
import { ENV } from "../../../../utils";
import { image } from "../../../../assets";
import { ModalUsers } from "../../modal";
import { FollowerList } from "../../followersList/FollowerList";

import "./UserProfile.scss";

const userController = new User();

export function UserProfile(props) {
  const { id_author } = props;
  const [user, setUser] = useState(null);

  //MODAL
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(null);

  //ABRIR/CERRAR MODAL
  const onOpenCloseModal = (type) => {
    setType(type);
    setShowModal((prevState) => !prevState);
  };

  useEffect(() => {
    (async () => {
      //Busqueda de todos los datos del usuario
      try {
        const response = await userController.getUser(id_author.id_author);

        setUser(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="profile">
      <div className="profile__info">
        <div className="profile__info-image">
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

        <div className="profile__info-content">
          <h1>{user?.username}</h1>

          <div className="profile__info-followers">
            <Button
              as="div"
              labelPosition="right"
              className="follow"
              onClick={() => onOpenCloseModal("follow")}
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
              onClick={() => onOpenCloseModal("followers")}
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
        show={showModal}
        close={() => onOpenCloseModal("")}
        title={type === "follow" ? "Seguidos" : "Seguidores"}
        size="tiny"
      >
        <FollowerList type={type} userProfile={user} />
      </ModalUsers>
    </div>
  );
}
