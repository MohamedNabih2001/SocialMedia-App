import axios from 'axios';
// import store from '../redux/store';
// import { refreshToken, logOut } from '../redux/userSlice';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

///////////////////////////////////////////////
export const setupInterceptors = (
  store: any,
  api: any,
  refreshToken: any,
  logOut: any
) => {
  api.interceptors.request.use(
    (config: any) => {
      const token = store.getState().user.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  ///////////////////////////////////////////////
  let refreshPromise: Promise<any> | null = null;

  api.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest.retry &&
        !originalRequest.url.includes('/refresh')
      ) {
        originalRequest.retry = true;
        try {
          if (!refreshPromise) {
            refreshPromise = store
              .dispatch(refreshToken())
              .unwrap()
              .finally(() => {
                refreshPromise = null;
              });
          }
          const data = await refreshPromise;
          const token = data?.data?.token;
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }
        } catch (error) {
          console.log(error);
          store.dispatch(logOut());
        }
      }

      return Promise.reject(error);
    }
  );
};
