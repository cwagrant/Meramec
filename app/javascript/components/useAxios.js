import axios from "axios";

const useAxios = (contentType = "") => {
  let instance = axios.create();
  const csrfToken = document.querySelector("[name=csrf-token]")?.content;
  if (csrfToken) {
    instance.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  }

  const user_json = localStorage.getItem("user");

  if (user_json != null) {
    user = JSON.parse(user_json);

    if (user.token) {
      instance.defaults.headers.common["Authorization"] =
        `Bearer ${user.token}`;
    }
  }

  // This should allow us to not worry about catching 401 errors in the
  // rest of the code base.
  instance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status == 401) {
      const user_storage = localStorage.getItem("user");

      if (user_storage) {
        let user_json = JSON.parse(user_storage);
        const { token, ...user } = user_json;

        if (token) {
          localStorage.setItem("user", JSON.stringify({ ...user }));
        }
      }

      currentLocation = window.location;
      window.location = `/login?redirect_to=${currentLocation}`;
    }
    throw error;
  });

  return instance;
};

export default useAxios;
