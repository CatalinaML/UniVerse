import React, {useState, useEffect} from 'react'
import {Container, Loader, Image, Button, Label, Icon, Segment} from "semantic-ui-react"
import {useParams} from "react-router-dom"
import {Post as PostController} from "../../../../api"
import { ENV } from '../../../../utils/constants'
import {DateTime} from "luxon"
import {useAuth} from "../../../../hooks"
import "./Post.scss"

const postController = new PostController();

export function Post() {
    //constante que tiene el post 
    const [post, setPost] = useState(null);

    //constante like
    const [likeLength, setLikeLength] = useState(0);

    //constante que me devuelve el parámetro que tiene el id del post
    const {id} = useParams();

    const {user, accessToken} = useAuth();

    useEffect(() => {
        (async() => {
            try {

                const response = await postController.getPost(id);
                //guardar el post en la variable que despues se muestra
                setLikeLength(response.likes.length);
                setPost(response);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [id, likeLength]);

    if(!post) return <Loader active inline="centered"/>

    const date = new Date(post.create_date);

    const likePost = async() =>{
        try {
            await postController.likePost(id, accessToken);
            const response = await postController.getPost(id);

            setLikeLength(response.likes.length);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <Container >
        <div className='post'>

            <div className='post__info'>
                <div className='post__info-author'>
                    <div className='post__info-author-info'>
                        <Image src={`${ENV.BASE_PATH}/${post.avatar_author}`} avatar />
                        <span>{post.author}</span>
                    </div>
                    
                    <div className='post__info-author-button'>
                        {!user ? (<Button basic color='black' disabled>Seguir</Button>) : (<Button>Seguir</Button>)}
                    </div>
                </div>
            </div>


            <div className='post__image'>
                <Image src={`${ENV.BASE_PATH}/${post.miniature}`}/>
            </div>

            <div className='post__content'>

                <div className='post__content-title'>
                    <h1>{post.title}</h1> 
                </div>

                <div className='post__content-date'>
                    <div>{DateTime.fromISO(date.toISOString()).setLocale("es").toFormat("dd LLLL yyyy")}</div>
                </div>
                
                <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                
                <div className='post__content-like'>
                    {!user ? (
                        <div className='post__content-like-disable'>
                            <Button disabled="true" as='div' labelPosition='right'>
                                <Button color='orange' onClick={likePost}>
                                    <Icon name='heart' />
                                    Like
                                </Button>
                                <Label as='a' basic color='red' pointing='left'>
                                    {likeLength}
                                </Label>
                            </Button>
                            <p>¡Registrate para reaccionar!</p>
                        </div>
                    ) : (
                        <Button as='div' labelPosition='right'>
                            <Button color='orange' onClick={likePost}>
                                <Icon name={post.likes.includes(user._id) ? 'heart' : 'heart outline'} />
                                Like
                            </Button>
                            <Label as='a' basic color='red' pointing='left'>
                                {likeLength}
                            </Label>
                        </Button>
                    )}
                    
                </div>
            </div>


        </div>
    </Container>
  )
}
