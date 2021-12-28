import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://my-myteam.herokuapp.com/rest/',
})