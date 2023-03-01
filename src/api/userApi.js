
import axios from "axios";
import { config } from "../config/Constants";

////////////////////////////////////////////////  GET Requests  ///////////////////////////////////////////////////////

const get_user = () => {
    return axios.get(`${config.url.API_URL}/get-user`)
};

//////////////////////////////////////////////  POST Requests  ///////////////////////////////////////////////////////
const create_user = (requestBody) => {
    return axios.post(`${config.url.API_URL}/create-user`, requestBody)
};


///////////////////////////////////////////////  PUT Requests  ///////////////////////////////////////////////////////
const update_user = (requestBody) => {
    return axios.patch(`${config.url.API_URL}/update-user`, requestBody)
};


//////////////////////////////////////////////  DELETE Requests  ///////////////////////////////////////////////////////
const delete_user = (id) => {
    return axios.delete(`${config.url.API_URL}/delete-user/${id}`);
};
export { get_user, update_user, create_user, delete_user }