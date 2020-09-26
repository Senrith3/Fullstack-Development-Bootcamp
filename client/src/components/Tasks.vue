<template>
    <div class="row">
        <form class="form" v-on:submit.prevent="addTask">
            <div class="input-field">
                <label for="todo">Task</label>
                <input  type="text" name="task" v-model="task"> 
            </div>
            <button type="submit" class="waves-effect waves-light btn">Add</button>
        </form>
        <div class="col s12 m6" v-for="task in tasks" :key="task.id">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text" @dblclick="deleteTask(task._id)">
                    <span class="card-title">{{task.task}}</span>
                    <span class="card-title">{{task.dateCreated}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../../node_modules/materialize-css/dist/js/materialize.min.js";
import PostService from '../PostService';
const postService = new PostService();

export default {
    name: 'Tasks',
    data() {
        return {
            tasks: [],
            task: '',
            time:'',
        }
    },
    created() {
        this.getTasks();
    },
    methods: {
        getDate() {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date +' '+ time;
            this.time = dateTime;
        },
        getTasks() {
            postService.getTasks()
            .then(res => {
                this.tasks = res.data;
            })
            .catch(err => console.error(err));
        },
        deleteTask(id) {
            postService.deleteTask(id)
            .then(() => {
                this.getTasks();
            });
        },
        addTask() {
            this.getDate();
            const task = {
                task: this.task,
                dateCreated: this.time,
            };
            postService.insetTask(task)
            .then(() => {this.getTasks(), this.task = ''});
        }
    }
}
</script>

<style scoped>

</style>