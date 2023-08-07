import React, { useState, useEffect } from "react";
import {
  Container,
  Loader,
  Image,
  Button,
  Label,
  Icon,
  Comment,
  CommentAvatar,
  CommentAuthor,
} from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import { DateTime } from "luxon";
import { map } from "lodash";

import {
  User,
  Post as PostController,
  Comment as CommentController,
} from "../../../../api";
import { ENV } from "../../../../utils/constants";
import { useAuth } from "../../../../hooks";
import { image } from "../../../../assets";
import { CommentForm } from "../../comment/commentForm";
import "./Post.scss";

const postController = new PostController();
const userController = new User();
const commentController = new CommentController();

export function Post(props) {
  const { reload, onReload } = props;
  const { user, accessToken } = useAuth();

  //constante que me devuelve el parámetro que tiene el id del post
  const { id } = useParams();

  //constante que tiene el post
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  const [isFollowing, setIsFollowing] = useState(false);

  //constante like
  const [likeLength, setLikeLength] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPost(id);

        setLikeLength(response.likes.length);
        setPost(response);

        const commentList = await commentController.getCommentsPost(
          response._id
        );

        setComments(commentList);

        if (user) {
          const currentUser = await userController.getMe(accessToken);
          if (currentUser.follow.includes(response.id_author)) {
            setIsFollowing(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, likeLength, isFollowing, reload]);

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

  const deleteComment = async (idPost, idComment) => {
    try {
      await commentController.deleteComment(accessToken, idPost, idComment);
      onReload();
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

              {user ? (
                user._id === post.id_author ? (
                  <Link
                    className="post__info-author-info-username"
                    to="/blogger/profile"
                  >
                    {post.author}
                  </Link>
                ) : (
                  <Link
                    className="post__info-author-info-username"
                    to={`/user/${post.id_author}`}
                    state={{ id_author: `${post.id_author}` }}
                  >
                    {post.author}
                  </Link>
                )
              ) : (
                <Link
                  className="post__info-author-info-username"
                  to={`/user/${post.id_author}`}
                  state={{ id_author: `${post.id_author}` }}
                >
                  {post.author}
                </Link>
              )}
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

          <div className="post__content-comments">
            <Comment.Group>
              {map(comments, (comment) => (
                <div key={comment._id}>
                  <Comment>
                    {comment?.avatar_user ? (
                      <Comment.Avatar
                        src={`${ENV.BASE_PATH}/${comment.avatar_user}`}
                      />
                    ) : (
                      <Comment.Avatar src={image.noAvatar} />
                    )}

                    <Comment.Content>
                      <CommentAuthor>{comment.username}</CommentAuthor>
                      <Comment.Metadata>
                        <div>{comment.date}</div>
                      </Comment.Metadata>
                      <Comment.Text>{comment.comment}</Comment.Text>
                    </Comment.Content>
                  </Comment>

                  <div>
                    {user && user.username === comment.username && (
                      <Button
                        icon="trash"
                        onClick={() => deleteComment(post._id, comment._id)}
                      />
                    )}
                  </div>
                </div>
              ))}
              {user && <CommentForm idPost={post._id} onReload={onReload} />}
            </Comment.Group>
          </div>
        </div>
      </div>
    </Container>
  );
}
