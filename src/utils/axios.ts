import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL : "http://localhost:4000/api" ,
    timeout : 10000 , 
    
})