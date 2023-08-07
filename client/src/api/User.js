import { ENV } from "../utils/constants";

export class User {
  //AUTH
  async register(data) {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REGISTER}`;
      const params = {
        method: "POST",
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

  async login(data) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  async refreshAccessToken(refreshToken) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
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
  async getMe(accessToken) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.GET_ME}`;
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

  async getUser(idUser) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getFollowFollowers(idUser, type) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}/${type}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  //EDICION
  async updateUser(accessToken, data, idUser) {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;
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

  //INTERACCIÓN
  async followUnfollow(accessToken, idBlogger) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idBlogger}`;
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

  //GUARDADO DE TOKENS EN LOCALSTORAGE
  setAccessToken(token) {
    localStorage.setItem(ENV.JWT.ACCESS, token);
  }

  setRefreshToken(token) {
    localStorage.setItem(ENV.JWT.REFRESH, token);
  }

  //RECUPERO DE TOKENS EN LOCALSTORAGE
  getAccessToken() {
    return localStorage.getItem(ENV.JWT.ACCESS);
  }

  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }

  //ELIMIACIÓN TOKENS DEL LOCALSTORAGE
  removeTokens() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }
}
