import React, {useState, useEffect} from 'react'
import {map, size} from "lodash"
import {Button, Pagination} from "semantic-ui-react"
import {Post} from "../../../../api"
import {useAuth} from "../../../../hooks"
import { Modal } from '../../../shared'
import {FormPost} from "../../../blogger"
import {MyItemPost} from "../myItemPost"
import "./ListBloggerPosts.scss"

const postController = new Post();

export function ListBloggerPosts(props) {
    const {reload, onReload} = props;
    const [showModal, setShowModal] = useState(false);
    const {accessToken, user} = useAuth();
    const [posts, setPosts] = useState(null);

    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 6;

    //funcion para abrir/cerrar modal
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

    useEffect(() => {
        (async () => {
            try {
                const response = await postController.getMyPosts(page, user.username, accessToken, limit);
                setPosts(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total
                });
            } catch (error) {
                console.error(error);
            }
        })()
    }, [page, reload]);

    //if(!posts) return <Loader active inline="centered"/>;
    if(size(posts) === 0) return "No hay posts";

    const changePage = (_, data) =>{
        setPage(data.activePage);
    }

  return (
    <div className='list-post'>
      <div className='list-post__button'>
          <Button basic color='black' onClick={onOpenCloseModal}>
            Crear Post
          </Button>
      </div>
          

          <h1>Mis posts</h1>
          {map(posts, (post) => (
            <MyItemPost key={post._id} post={post} onReload={onReload}/>
          ))}

      
      <div className='list-post__pagination'>
        <Pagination
            totalPages={pagination.pages}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            secondary
            pointing
            onPageChange={changePage}/>
      </div>


      <Modal
          show={showModal}
          close={onOpenCloseModal}
          title={"Crear nuevo post"}
          size="large">
          <FormPost onClose={onOpenCloseModal} onReload={onReload}/>
        </Modal>
    </div>
  )
}
