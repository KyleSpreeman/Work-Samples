import axios from 'axios'

class LogServices {
    static create(data, onSuccess, onError) {
        axios.post('/api/logging',
            data,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }

    static selectAll(onSuccess, onError) {
        axios.get('/api/logging',
            { withCredentials: true },
        )
            .then(onSuccess)
            .catch(onError)
    }

    static selectById(id, onSuccess, onError) {
        axios.get(`/api/logging/${id}`,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }

    static selectByPageNumber(pageNumber, pageSize, onSuccess, onError) {
        axios.get(`/api/logging/${pageNumber}/${pageSize}`,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }

    static update(data, onSuccess, onErrror) {
        axios.put(`/api/logging/${data.id}`,
            data,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onErrror)
    }

    static delete(id, onSuccess, onError) {
        axios.delete(`/api/logging/${id}`,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }

    static search(data, onSuccess, onError) {
        axios.post(`/api/logging/search`,
            data,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }

    // static paginatedSearch(data, onSuccess, onError) {
    //     axios.get(`/api/logging?searchTerm=${data.searchTerm}&startDate=${data.startDate}&endDate=${data.endDate}&levelSearch=${data.levelSearch}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortOrder=${data.sortOrder}`,
    //         // data,
    //         { withCredentials: true }
    //     )
    //         .then(onSuccess)
    //         .catch(onError)
    // }
}

export default LogServices