import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

class OrderDataService {
    retrieveOrders() {
        console.log('executed service')
        return axios.get(`${API_URL}/orders`,
        { Headers:{authorization: 'Bearer ' + sessionStorage.getItem('token')}});
    }
}
export default new OrderDataService()