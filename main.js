Vue.component('tasks', {
    props: ['list'],
    template: '#tasks-template',
    methods: {
        toggleCompletedFor: function (task) {
            task.completed = ! task.completed;
        },
        isCompleted: function (task) {
            return task.completed;
        },
        inProgress: function (task) {
            return ! this.isCompleted(task);
        },
        deleteTask: function (task) {
            this.list.$remove(task);
        },
        clearCompleted: function () {
            this.list = this.list.filter(this.inProgress);
        }
    },
    computed : {
        remaining: function () {
            return this.list.filter(this.inProgress).length;
        },
        completed: function () {
            return this.list.filter(this.isCompleted).length;
        }
    }
});

new Vue({
    el: '#app',
    
    data: {
        tasks: [ 
            { body: 'Go to the store', completed: false },
            { body: 'Go to the bank', completed: false },
            { body: 'Go to the doctor', completed: true }
        ]    
    },


})