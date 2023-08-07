import React, { useEffect, useState } from "react";
import { User } from "../../../api";
import { Image, List } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { map } from "lodash";
import { image } from "../../../assets";
import { ENV } from "../../../utils";
import { useAuth } from "../../../hooks";
import "./FollowerList.scss";

const userController = new User();

export function FollowerList(props) {
  const { type, userProfile } = props;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [followFollowersList, setList] = useState(null);

  useEffect(() => {
    (async () => {
      try {
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

  return (
    <List selection verticalAlign="middle">
      {map(followFollowersList, (userF) =>
        user ? (
          user._id === userF._id ? (
            <div
              key={userF._id}
              role="listitem"
              className="seccion"
              onClick={() => navigate("/blogger/profile")}
            >
              {userF?.avatar ? (
                <Image avatar src={`${ENV.BASE_PATH}/${userF.avatar}`} />
              ) : (
                <Image avatar src={image.noAvatar} />
              )}

              <List.Content>
                <List.Header>{userF.username}</List.Header>
              </List.Content>
            </div>
          ) : (
            <div
              key={userF._id}
              role="listitem"
              className="seccion"
              onClick={() =>
                navigate(`/user/${userF._id}`, {
                  state: { id_author: `${userF._id}` },
                })
              }
            >
              {userF?.avatar ? (
                <Image avatar src={`${ENV.BASE_PATH}/${userF.avatar}`} />
              ) : (
                <Image avatar src={image.noAvatar} />
              )}
              <List.Content>
                <List.Header>{userF.username}</List.Header>
              </List.Content>
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
            {userF?.avatar ? (
              <Image avatar src={`${ENV.BASE_PATH}/${userF.avatar}`} />
            ) : (
              <Image avatar src={image.noAvatar} />
            )}

            <List.Content>
              <h4>{userF.username}</h4>
            </List.Content>
          </div>
        )
      )}
    </List>
  );
}
