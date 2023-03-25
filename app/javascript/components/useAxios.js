import axios from "axios";

// const token = document.querySelector("[name=csrf-token]").content;
const useAxios = (contentType = "") => {
  let instance = axios.create();

  const user_json = localStorage.getItem("user");

  if (user_json != null) {
    user = JSON.parse(user_json);

    if (user.token) {
      instance.defaults.headers.common["Authorization"] =
        `Bearer ${user.token}`;
    }
  }

  instance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status == 401) {
      const user_storage = localStorage.getItem("user");
      const user_json = JSON.parse(user_storage);
      const { token, ...user } = user_json;

      if (token) {
        localStorage.setItem("user", JSON.stringify({ ...user }));
        currentLocation = window.location;
        window.location = `/login?redirect_to=${currentLocation}`;
      }
      throw error;
    }
  });

  return instance;
};

export default useAxios;
