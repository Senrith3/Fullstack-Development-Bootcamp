import axios from 'axios';

axios.defaults.baseURL = '/api/taskslist';

export default class PostService {
    getTasks() {
        return axios.get('');
    }

    insetTask(task) {
        return axios.post('', task);
    }

    deleteTask(id) {
        return axios.delete(`/${id}`);
    }
}