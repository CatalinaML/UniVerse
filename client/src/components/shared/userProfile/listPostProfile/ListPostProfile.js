import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { Post } from "../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import { ItemPost } from "../../posts";
import "./ListUserProfile.scss";

const postController = new Post();
export function ListPostProfile(props) {
  const { id_author, reload, onReload } = props;

  const [posts, setPosts] = useState(null);

  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getUserPosts(
          id_author.id_author,
          page
        );

        setPosts(response.docs);

        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, reload]);

  if (!posts) return <Loader active inline="centered" />;

  const changePage = (_, data) => {
    setPage(data.activePage);
  };
  return (
    <div className="list-post">
      <div className="list-post__item">
        {map(posts, (post) => (
          <ItemPost post={post} />
        ))}
      </div>

      <div className="list-post__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          secondary
          pointing
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
