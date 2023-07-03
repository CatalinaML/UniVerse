import React from 'react'
import {Link} from "react-router-dom"
import { Image } from 'semantic-ui-react';
import {DateTime} from "luxon"
import { ENV } from '../../../../utils/constants';
import "./ItemPost.scss"

export function ItemPost(props) {
    const {post} = props;
    //fechas
    const date = new Date(post.create_date);
    const formatDate = DateTime.fromISO(date.toISOString())
                .setLocale("es")
                .toFormat("dd LLL yyyy");
  return (
    <Link className="item" to={`/post/${post._id}`}>
        <Image src={`${ENV.BASE_PATH}/${post.miniature}`}/>

        <div className='content'>
          <h2>{post.title}</h2>
          <span>{formatDate}</span>
          <span dangerouslySetInnerHTML={{__html: post.content}}></span>

          <div className='image'>
            <Image avatar src={`${ENV.BASE_PATH}/${post.avatar_author}`}/>
            <p>By: {post.author}</p>
          </div>
        </div>
        
        
    </Link>
  )
}
