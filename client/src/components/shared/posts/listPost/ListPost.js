import React, { useState, useEffect } from "react";
import { Loader, Pagination, Dropdown, Form, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";

import { ItemPost } from "../itemPost";
import { Post } from "../../../../api";

import "./ListPost.scss";

const postController = new Post();

export function ListPost(props) {
  const { reload } = props;
  //acá recupero los post de la respuesta http
  const [posts, setPosts] = useState(null);

  //constantes de paginación
  const [pagination, setPagination] = useState();

  //investigar para que era searchparams
  const [searchparams] = useSearchParams();
  //constante para la página actual
  const [page, setPage] = useState(searchparams.get("page") || 1);

  const [dropValue, setDropValue] = useState("date");

  //constante de navegación
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { search: "" },
    validateOnChange: false,
    onSubmit: async (value) => {
      try {
        const response = await postController.getSearch(value);

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
    },
  });

  useEffect(() => {
    (async () => {
      try {
        let response = "";
        if (dropValue === "date") {
          response = await postController.sortDate(page);
        } else if (dropValue === "like") {
          response = await postController.sortPopularity(page);
        }

        setPosts(response.docs); //.docs por la paginación

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
  }, [page, dropValue, reload]);

  //si posts no tiene nada
  if (!posts) return <Loader active inline="centered" />;

  //funcion para cambiar de pagina
  const changePage = (_, data) => {
    const newPage = data.activePage;
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  //función que cambia el parametro de ordenamiento
  const changeSort = (_, data) => {
    if (data.value === "date") {
      setDropValue("date");
    } else {
      setDropValue("like");
    }
  };

  return (
    <div className="list-posts">
      <div className="list-posts__filters">
        {/**ORDENAMIENTO */}
        <div className="list-posts__filters-order">
          <Dropdown placeholder="Ordenar">
            <Dropdown.Menu>
              <Dropdown.Item
                icon="calendar"
                text="Nuevo"
                value="date"
                onClick={changeSort}
              />
              <Dropdown.Item
                icon="like"
                value="like"
                text="Popular"
                onClick={changeSort}
              />
              <Dropdown.Item
                disabled
                icon="user"
                value="follow"
                text="Seguidos"
                onClick={changeSort}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/**BUSCADOR */}
        <div className="list-posts__filters-search">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Input
                name="search"
                placeholder="Buscar..."
                onChange={formik.handleChange}
                value={formik.values.search}
                error={formik.errors.search}
              />
              <Form.Button type="submit" loading={formik.isSubmitting}>
                <Icon name="search"></Icon>
              </Form.Button>
            </Form.Group>
          </Form>
        </div>

        {/**FILTRAR TAGS */}
      </div>

      {/**LISTA */}
      <div className="list">
        {map(posts, (post) => (
          <div key={post._id} className="item">
            <ItemPost post={post} />
          </div>
        ))}
      </div>

      {/**PAGINACION */}
      <div className="pagination">
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
