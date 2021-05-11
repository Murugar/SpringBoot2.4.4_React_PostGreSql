import axios from 'axios'
const API_URL='http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'


class AuthenticationService {
    
    executeJwtAuthenticationService(username, password) {
        console.log(username);
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        
        if (user === null) return ''
        return user
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }
    
    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('token', token)          // Saves user token to localStorage
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }
    createJWTToken(token) {
        sessionStorage.setItem('token',token)

        return 'Bearer ' + token
    }
    
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}
export default new AuthenticationService()