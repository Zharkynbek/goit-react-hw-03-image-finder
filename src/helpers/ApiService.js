import axios from "axios"

const apiService = (query, page) => {
    return axios({
        method: "GET",
        url: `https://pixabay.com/api/?key=&key=15900106-2c235e732bb321ca7ec900d93&q=${query}&page=${page}&per_page=12`,
    }) 
}

export default apiService;