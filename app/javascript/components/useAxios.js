import axios from "axios";

const token = document.querySelector("[name=csrf-token]").content;
const useAxios = (contentType = "") => {
  let instance = axios.create({ headers: { "X-CSRF-TOKEN": token } });
  // instance.defaults.headers.common["X-CSRF-TOKEN"] =
  //   document.querySelector("[name=csrf-token]").content;

  return instance;
};

export default useAxios;
