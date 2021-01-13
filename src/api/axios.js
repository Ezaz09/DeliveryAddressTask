import axios from 'axios';

const axiosInstanse = axios.create({
    baseURL: 'http://localhost:8081/api/interface'
});

export default axiosInstanse;