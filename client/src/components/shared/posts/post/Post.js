import React, { useState, useEffect } from "react";
import {
  Container,
  Loader,
  Image,
  Button,
  Label,
  Icon,
} from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import { DateTime } from "luxon";

import { User, Post as PostController } from "../../../../api";
import { ENV } from "../../../../utils/constants";
import { useAuth } from "../../../../hooks";
import { image } from "../../../../assets";

import "./Post.scss";

const postController = new PostController();
const userController = new User();

export function Post() {
  const { user, accessToken } = useAuth();

  //constante que me devuelve el parámetro que tiene el id del post
  const { id } = useParams();

  //constante que tiene el post
  const [post, setPost] = useState(null);

  const [isFollowing, setIsFollowing] = useState(false);

  //constante like
  const [likeLength, setLikeLength] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPost(id);

        setLikeLength(response.likes.length);

        setPost(response);

        const currentUser = await userController.getMe(accessToken);
        if (currentUser.follow.includes(response.id_author)) {
          setIsFollowing(true);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, likeLength, isFollowing]);

  if (!post) return <Loader active inline="centered" />;

  const date = new Date(post.create_date);

  const likePost = async () => {
    try {
      await postController.likePost(id, accessToken);
      const response = await postController.getPost(id);

      setLikeLength(response.likes.length);
    } catch (error) {
      console.error(error);
    }
  };

  const followUser = async () => {
    try {
      await userController.followUnfollow(accessToken, post.id_author);
      const response = await userController.getMe(accessToken);

      if (response.follow.includes(post.id_author)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="post">
        <div className="post__info">
          <div className="post__info-author">
            <div className="post__info-author-info">
              {post?.avatar_author ? (
                <Image avatar src={`${ENV.BASE_PATH}/${post.avatar_author}`} />
              ) : (
                <Image avatar src={image.noAvatar} />
              )}
              <Link
                className="post__info-author-info-username"
                to={`/user/${post.id_author}`}
                state={{ id_author: `${post.id_author}` }}
              >
                {post.author}
              </Link>
            </div>

            <div className="post__info-author-button">
              {!user ? (
                <Button basic color="black" disabled>
                  Seguir
                </Button>
              ) : (
                <Button basic color="black" onClick={followUser}>
                  {isFollowing ? "Seguido" : "Seguir"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="post__image">
          <Image src={`${ENV.BASE_PATH}/${post.miniature}`} />
        </div>

        <div className="post__content">
          <div className="post__content-title">
            <h1>{post.title}</h1>
          </div>

          <div className="post__content-date">
            <div>
              {DateTime.fromISO(date.toISOString())
                .setLocale("es")
                .toFormat("dd LLLL yyyy")}
            </div>
          </div>

          <div
            className="post__content-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          <div className="post__content-like">
            {!user ? (
              <div className="post__content-like-disable">
                <Button disabled="true" as="div" labelPosition="right">
                  <Button color="orange" onClick={likePost}>
                    <Icon name="heart" />
                    Like
                  </Button>
                  <Label as="a" basic color="red" pointing="left">
                    {likeLength}
                  </Label>
                </Button>
                <p>¡Registrate para reaccionar!</p>
              </div>
            ) : (
              <Button as="div" labelPosition="right">
                <Button color="orange" onClick={likePost}>
                  <Icon
                    name={
                      post.likes.includes(user._id) ? "heart" : "heart outline"
                    }
                  />
                  Like
                </Button>
                <Label as="a" basic color="red" pointing="left">
                  {likeLength}
                </Label>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
