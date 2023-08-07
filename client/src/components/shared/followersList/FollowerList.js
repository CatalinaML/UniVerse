import React, { useEffect, useState } from "react";
import { User } from "../../../api";
import { Button, Image, List } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { map } from "lodash";
import { image } from "../../../assets";
import { ENV } from "../../../utils";
import { useAuth } from "../../../hooks";
import "./FollowerList.scss";

const userController = new User();

export function FollowerList(props) {
  const { type, userProfile } = props;
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  const [followFollowersList, setList] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        //busco la lista de seguidos o seguidores del usuario en cuestion
        const followFollowers = await userController.getFollowFollowers(
          userProfile._id,
          type
        );

        setList(followFollowers);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const followUser = async (idUserF) => {
    try {
      //me sigo o dejo de seguir dependiendo el caso cada vez que se hace click en un boton
      await userController.followUnfollow(accessToken, idUserF);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <List verticalAlign="middle">
      {map(followFollowersList, (userF) =>
        user ? (
          user._id === userF._id ? (
            <div
              key={userF._id}
              role="listitem"
              className="seccion"
              onClick={() => {
                navigate("/blogger/profile");
                navigate(0);
              }}
            >
              <div className="seccion__container">
                {userF?.avatar ? (
                  <Image avatar src={`${ENV.BASE_PATH}/${userF.avatar}`} />
                ) : (
                  <Image avatar src={image.noAvatar} />
                )}

                <List.Content>
                  <h4>{userF.username}</h4>
                </List.Content>
              </div>
            </div>
          ) : (
            <div key={userF._id} role="listitem" className="seccion">
              <div
                className="seccion__clickeable"
                onClick={() => {
                  navigate(`/user/${userF._id}`, {
                    state: { id_author: `${userF._id}` },
                  });
                  navigate(0);
                }}
              >
                {userF?.avatar ? (
                  <Image avatar src={`${ENV.BASE_PATH}/${userF.avatar}`} />
                ) : (
                  <Image avatar src={image.noAvatar} />
                )}

                <List.Content>
                  <h4>{userF.username}</h4>
                </List.Content>
              </div>

              <div>
                <Button
                  basic
                  color="black"
                  onClick={() => followUser(userF._id)}
                >
                  {user.follow.includes(userF._id) ? "Eliminar" : "Seguir"}
                </Button>
              </div>
            </div>
          )
        ) : (
          <div
            key={userF._id}
            role="listitem"
            className="seccion"
            onClick={() => {
              navigate(`/user/${userF._id}`, {
                state: { id_author: `${userF._id}` },
              });
              navigate(0);
            }}
          >
            <div className="seccion__container">
              {userF?.avatar ? (
                <Image avatar src={`${ENV.BASE_PATH}/${userF.avatar}`} />
              ) : (
                <Image avatar src={image.noAvatar} />
              )}

              <List.Content>
                <h4>{userF.username}</h4>
              </List.Content>
            </div>
          </div>
        )
      )}
    </List>
  );
}
