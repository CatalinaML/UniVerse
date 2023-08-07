import { ENV } from "../utils/constants";

export class Comment {
  //CREACION
  async createComment(accessToken, idPost, data) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.COMMENT}/${idPost}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCommentsPost(idPost) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.COMMENT}/${idPost}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(accessToken, id_post, id_comment) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.COMMENT}/${id_post}/${id_comment}`;
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
}
