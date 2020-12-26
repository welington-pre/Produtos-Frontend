import axios from "axios";

export const http = axios.create({
    baseURL: 'http://localhost:8081/loja/'
    // baseURL: 'https://produtos-apirest-backend.herokuapp.com/loja/'
})