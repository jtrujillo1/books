import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://jelou-prueba-tecnica1-frontend.rsbmk.workers.dev",
});

export default publicAxios;
