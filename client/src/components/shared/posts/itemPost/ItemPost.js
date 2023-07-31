import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import { DateTime } from "luxon";

import { ENV } from "../../../../utils/constants";
import { image } from "../../../../assets";

import "./ItemPost.scss";

export function ItemPost(props) {
  const { post } = props;

  //fechas
  const date = new Date(post.create_date);
  const formatDate = DateTime.fromISO(date.toISOString())
    .setLocale("es")
    .toFormat("dd LLL yyyy");

  return (
    <Link className="item" to={`/post/${post._id}`}>
      <Image
        className="post_image"
        src={`${ENV.BASE_PATH}/${post.miniature}`}
      />

      <div className="content">
        <div className="likes">
          <h2>{post.title}</h2>
          <Icon name="heart">{post.likes.length}</Icon>
        </div>

        <span>{formatDate}</span>
        <span dangerouslySetInnerHTML={{ __html: post.content }}></span>

        <div className="image">
          {post?.avatar_author ? (
            <Image avatar src={`${ENV.BASE_PATH}/${post.avatar_author}`} />
          ) : (
            <Image avatar src={image.noAvatar} />
          )}

          <p>By: {post.author}</p>
        </div>
      </div>
    </Link>
  );
}
