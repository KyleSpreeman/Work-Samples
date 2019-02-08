import axios from 'axios'

class RolesService {

    static selectAll(onSuccess, onError) {
        axios.get('/api/user_role', { withCredentials: true })
            .then(onSuccess)
            .catch(onError)
    }

    static deleteRole(data, onSuccess, onError) {
        axios.post(`/api/user_role/delete`, data, { withCredentials: true })
            .then(onSuccess)
            .catch(onError)
    }

    static createRole(data, onSuccess, onError) {
        axios.post('/api/user_role', data, { withCredentials: true })
            .then(onSuccess)
            .catch(onError)
    }

    static search(data, onSuccess, onError) {
        axios.post('/api/user_role/search_user_role', data, { withCredentials: true })
            .then(onSuccess)
            .catch(onError)
    }
}

export default RolesService