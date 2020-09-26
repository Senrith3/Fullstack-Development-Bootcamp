import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/taskslist';

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