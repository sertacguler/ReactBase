import Axios from 'axios';

const useAuth = () => {
   
    const login = (username, password) => {
        let token = executeJwtAuthentication(username, password);
        sessionStorage.setItem('authenticatedUser', username);
        localStorage.setItem('token', token);
    };

    const executeJwtAuthentication = (username, password) => {
        return Axios.post('http://localhost:8081/authenticate', {username, password});
    };

    const getToken = () => { 
        return localStorage.getItem('token');
    };

    const logout = () => { 
        sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem('token');
    };

    const isUserLoggedIn = () => {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null) return false;
        return true;
    };
}

export default useAuth;