import { ENV } from "../utils/constants";

export class Post {
  //ORDENAMIENTO
  async sortDate(page = 1, limit = 8) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.POST}/?${pageFilter}&${limitFilter}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async sortPopularity(page = 1, limit = 8) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.SORT_POPULARITY}/?${pageFilter}&${limitFilter}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  //INTERACCION
  async likePost(idPost, accessToken) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.POST}/${idPost}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  //BUSQUEDA
  async getSearch(value, page = 1, limit = 8) {
    const pageFilter = `page=${page}`;
    const limitFilter = `limit=${limit}`;

    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.SEARCH}/?${pageFilter}&${limitFilter}`;

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      };

      console.log(params);
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getFollowPosts(accessToken, page = 1, limit = 8) {
    const pageFilter = `page=${page}`;
    const limitFilter = `limit=${limit}`;

    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.POSTS_FOLLOW}/?${pageFilter}&${limitFilter}`;
      const params = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  //CREACION, ELIMINACION Y EDICION
  async createPost(data, accessToken) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.append("miniature", data.file);
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.POST}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(accessToken, data, idPost) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.append("miniature", data.file);
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.POST}/${idPost}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(accessToken, idPost) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.POST}/${idPost}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  //OBTENCION
  async getMyPosts(page = 1, author, accessToken, limit = 8) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.MY_POSTS}/${author}?${pageFilter}&${limitFilter}`;

      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPost(idPost) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.POST}/${idPost}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserPosts(idAuthor, page = 1, limit = 8) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.MY_POSTS}/${idAuthor}?${pageFilter}&${limitFilter}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
