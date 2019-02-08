import axios from 'axios'

class FormService {
    static selectByFormId(formId, onSuccess, onError) {
        axios.get(`/api/inputcontrols/${formId}`, { withCredentials: true })

            .then(onSuccess)
            .catch(onError)
    }

    static selectFormsByUserId(onSuccess, onError) {
        axios.get(`/api/form/user`, { withCredentials: true })

            .then(onSuccess)
            .catch(onError)
    }

    static selectByFormIdPromise(formId, onSuccess, onError) {
        axios.get(`/api/inputcontrols/${formId}`, { withCredentials: true })

            .then(onSuccess)
            .catch(onError)
    }

    static selectFormById(formId, onSuccess, onError) {
        axios.get(`/api/form/${formId}`, { withCredentials: true })

            .then(onSuccess)
            .catch(onError)
    }

    static selectFormByIdPromise(formId, onSuccess, onError) {
        axios.get(`/api/form/${formId}`, { withCredentials: true })

            .then(onSuccess)
            .catch(onError)
    }

    static selectUserData(userId, formId) {
        const url = `/api/formdata/${userId}/${formId}`;
        const config = {
            method: "GET"
        };
        axios.defaults.withCredentials = true;
        return axios(url, config);
    }

    static formDataInsert(data, onSuccess, onError) {
        const url = `/api/formdata`;
        const config = {
            method: "POST",
            data: data
        };
        axios.defaults.withCredentials = true;
        axios(url, config)
            .then(onSuccess)
            .catch(onError);
    }
    static getFormByOrgId(orgId, onSuccess, onError) {
        const url = `/api/orgform/${orgId}`;
        const config = {
            method: "GET"
        };
        axios.defaults.withCredentials = true;
        axios(url, config)
            .then(onSuccess)
            .catch(onError);
    }

    static getAll(onSuccess, onError) {
        axios.get('/api/forminvite/forms',
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }
    static getAllUsers(index, size, onSuccess, onError) {
        axios.get(`/api/forminvite?pageIndex=${index}&pageSize=${size}`,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }
    static insert(data, onSuccess, onError) {
        axios.post('/api/forminvite',
            data,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }
    static getAllUsersAndForms(index, size, onSuccess, onError) {
        axios.get(`/api/forminvite/usersandforms?pageIndex=${index}&pageSize=${size}`,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }
    static deleteByUserIdAndFormId(data, onSuccess, onError) {
        axios.post('api/forminvite/delete',
            data,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }
    static SelectCheck(data, onSuccess, onError) {
        axios.post('api/forminvite/check',
            data,
            { withCredentials: true }
        )
            .then(onSuccess)
            .catch(onError)
    }

    static saveFormProgress(data, onSuccess, onError) {
        axios.post('/api/formdata/save', data, { withCredentials: true })

            .then(onSuccess)
            .catch(onError)
    }

    static getFormProgress(formId, onSuccess, onError) {
        axios.get(`/api/formdata/progress/${formId}`, { withCredentials: true })

            .then(onSuccess)
            .catch(onError)
    }

    static deleteformProgress(formId, onSuccess, onError) {
        axios.delete(`/api/formdata/${formId}`, { withCredentials: true })

            .then(onSuccess)
            .catch(onError)
    }

    static deleteUserForm(formId, onSuccess, onError) {
        axios.delete(`/api/form/delete/${formId}`, { withCredentials: true })

            .then(onSuccess)
            .catch(onError)
    }
}
export default FormService