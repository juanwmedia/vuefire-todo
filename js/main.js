var config = {
    apiKey: "AIzaSyAudCp_UEAC-lt-_Aqiyys5O3FnzLUySqA",
    authDomain: "vuefiredo-9a9b5.firebaseapp.com",
    databaseURL: "https://vuefiredo-9a9b5.firebaseio.com",
    storageBucket: "vuefiredo-9a9b5.appspot.com",
};
firebase.initializeApp(config);

var db = firebase.database();

Vue.component('todo-list', {
    template: '#todo-template',
    data: function () {
        return {
            nuevaTarea: null,
            editandoTarea: null,
        }
    },
    props: ['tareas'],
    methods: {
        agregarTarea: function (tarea) {
            db.ref('tareas/').push({
                titulo: tarea, completado: false
            });
            this.nuevaTarea = '';
        },
        editarTarea: function (tarea) {
            db.ref('tareas/' + tarea['.key']).update({
                titulo: tarea.titulo
            });
        },
        actualizarEstadoTarea: function (estado, tarea) {
            db.ref('tareas/' + tarea['.key']).update({
               completado: estado ? true : false,
            });
        },
        eliminarTarea: function (tarea) {
            db.ref('tareas/' + tarea['.key']).remove();
        },
    }
});

var vm = new Vue({
    el: 'body',
    ready: function () {
        db.ref('tareas/').on('value', function (snapshot) {
            vm.tareas = [];
            var objeto = snapshot.val();
            for (var propiedad in objeto) {
                vm.tareas.unshift({
                    '.key': propiedad,
                    completado: objeto[propiedad].completado,
                    titulo: objeto[propiedad].titulo
                });
            }
        });
    },
    data: {
        tareas: []
    },
});