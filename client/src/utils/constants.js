const SERVER_IP = "localhost:4000";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api/v1`,
  API_ROUTES: {
    POST: "post",
    MY_POSTS: "posts",
    POSTS_FOLLOW: "posts/follow",
    SEARCH: "post/search",
    SORT_POPULARITY: "post/sort_popularity",
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    GET_ME: "user/me",
    REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
    USER: "user",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
