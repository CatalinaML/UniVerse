import React, { useEffect, useState } from "react";
import { Image, Label, LabelDetail } from "semantic-ui-react";
import { User } from "../../../../api";
import { ENV } from "../../../../utils";
import { image } from "../../../../assets";
import "./UserProfile.scss";

const userController = new User();

export function UserProfile(props) {
  const { id_author } = props;
  const [user, setUser] = useState(null);

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
            <Label size="medium">
              Seguidos
              <LabelDetail>{user?.follow.length || 0}</LabelDetail>
            </Label>
            <Label size="medium">
              Seguidores
              <LabelDetail>{user?.followers.length || 0}</LabelDetail>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
