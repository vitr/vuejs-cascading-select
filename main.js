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

var proxyUrl = 'https://vuejs-cascading-select.appspot.com/proxy.php';

new Vue({
    el: '#app',

    data: {
        year: '',
        years: [],
        make: '',
        makes: [],
        model: '',
        models: [],
        trim: '',
        trims: [],
        data:{}
    },
    created: function () {
        this.fetchYearList();
    },

    watch: {
        'year': function (val, oldVal) {
            // console.log('new: %s, old: %s', val, oldVal);
            this.fetchMakeList()
        },
        'make': function (val, oldVal) {
            // console.log('new: %s, old: %s', val, oldVal);
            this.fetchModelList()
        },
        'model': function (val, oldVal) {
            // console.log('new: %s, old: %s', val, oldVal);
            this.fetchTrimList()
        },
        'trim': function (val, oldVal) {
            // console.log('new: %s, old: %s', val, oldVal);
            this.fetchData()
        }
    },

    methods: {
        fetchYearList: function () {
            // GET /someUrl
            this.$http.get(proxyUrl + '?call=?cmd=getYears').then((response) => {
                // console.log(response.data);
            for(i = response.data.Years.max_year; i>=response.data.Years.min_year; i--) {
                this.years.push({ text: i, value: i });
            }

                // success callback
            }, (response) => {
                // error callback
            });
        },
        fetchMakeList: function () {
            // GET /someUrl
            var uri = encodeURIComponent('?cmd=getMakes&year=' + this.year);
            this.$http.get(proxyUrl + '?call=' + uri).then((response) => {
            for(i in response.data.Makes) {
                var el = response.data.Makes[i];
                // console.log(el);
                this.makes.push({ text: el.make_display, value: el.make_id });
            }

                // success callback
            }, (response) => {
                // error callback
            });
        },
        fetchModelList: function () {
            // GET /someUrl
            var uri = encodeURIComponent('?cmd=getModels&make=' + this.make + '&year=' + this.year);
            this.$http.get(proxyUrl + '?call=' + uri).then((response) => {
            for(i in response.data.Models) {
                var el = response.data.Models[i];
                this.models.push({ text: el.model_name, value: el.model_name });
            }

                // success callback
            }, (response) => {
                // error callback
            });
        },
        fetchTrimList: function () {
            // GET /someUrl
            var uri = encodeURIComponent('?cmd=getTrims&model=' + this.model + '&make=' + this.make + '&year=' + this.year);
            this.$http.get(proxyUrl + '?call=' + uri).then((response) => {
            for(i in response.data.Trims) {
                var el = response.data.Trims[i];
                this.trims.push({ text: el.model_trim, value: el.model_id });
            }

                // success callback
            }, (response) => {
                // error callback
            });
        },
        fetchData: function () {
            // GET /someUrl
            var uri = encodeURIComponent('?cmd=getModel&model=' + this.trim);
            this.$http.get(proxyUrl + '?call=' + uri).then((response) => {
            console.log(response.data);
            this.data = response.data[0];

            // for(i in response.data.Trims) {
            //     var el = response.data.Trims[i];
            //     this.trims.push({ text: el.model_trim, value: el.model_id });
            // }

                // success callback
            }, (response) => {
                // error callback
            });
        }
    }


})