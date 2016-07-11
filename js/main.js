Vue.component('todo-list', {
    template: '#todo-template',
    data: function() {
        return {
            nuevaTarea: null,
            editandoTarea: null,
        }
    },
    props: ['tareas'],
    methods: {
        agregarTarea: function (tarea) {
            this.tareas.unshift({
                titulo: tarea, completado: false
            });
            this.nuevaTarea = '';
        },
        editarTarea: function (tarea) {
            console.info(tarea);
        },
        eliminarTarea: function (indice) {
            this.tareas.splice(indice, 1);
        },
    }
});

new Vue({
    el: 'body',
    data: {
        tareas: [
            {titulo: 'Salir a correr', completado: false},
            {titulo: 'Ir al gimnasio', completado: false},
            {titulo: 'Limpiar el coche', completado: false},
            {titulo: 'Hacer la compra', completado: false},
            {titulo: 'Aprender VueJS & Firebase', completado: false},
        ]
    },
});