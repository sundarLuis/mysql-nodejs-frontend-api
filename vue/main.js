var app = new Vue({
    el: '#app',
    // variables globales -> data
    data: {
        message: 'Hello Vue!',
        api:{
            url:"http://localhost:3000/",
            employees:[],
            employee:{
                id:0,
                name:"",
                salary:0.0,
            },//para editar y borrar,
            option:"created" //inicia con crear
        }    
    },
    //funcion del mismo Vue -> ciclo vue
    created(){
        console.log("-- created -> function of vue.js --")
        //cuando termina de contruirse vue todo lo que contenga esta
        //funcion se ejecutara automaticamente
        this.listEmployees()
    },
    //funciones globales -> methods
    methods: {
        //funcion que muestra todo los empleados
        async listEmployees() {
            console.log("-- listEmployees --")
            try {
                const response = await axios.get(this.api.url);
                console.log(response);
                this.api.employees = response.data
            } catch (error) {
                console.error(error);
            }
        },
        async createEmployee(){
            console.log("-- createEmployee --")
            try {
                let url_create = this.api.url 
                console.log("url_create",url_create)
                const response = await axios.post(url_create,this.api.employee);
                console.log(response);
                this.clean()
                this.listEmployees()
            } catch (error) {
                console.error(error);
            }
            $('#modal-add-edit').modal('hide')
        },
        //funcrion Editar
        async editEmployee(){
            console.log("-- editEmployee --")
            try {
                let url_edit = this.api.url + this.api.employee.id
                console.log("url_edit",url_edit)
                const response = await axios.put(url_edit,this.api.employee);
                console.log(response);
                this.clean()
                this.listEmployees()
            } catch (error) {
                console.error(error);
            }
            $('#modal-add-edit').modal('hide')
        },
        //funcion para borrar empleado
        async deleteEmployee(){
            console.log("-- deleteEmployee --")
            try {
                let url_delete = this.api.url + this.api.employee.id
                console.log("url_delete",url_delete)
                await axios.delete(url_delete);
                this.clean()
                this.listEmployees()
            } catch (error) {
                console.error(error);
            }
            $('#modal-alert-delete').modal('hide')
        },
        //funcion para mostrar el modal editar
        showModalEditAdd(employee = false,type = "created"){
            console.log("-- showModalEdit --",employee)
            if(employee != false){
                this.api.employee = employee
            }
            this.api.option = type
            $('#modal-add-edit').modal('show')
        },
        showAlertDelete(employee){
            console.log("-- showAlertDelete --")
            this.api.employee = employee
            $('#modal-alert-delete').modal('show')
        },
        clean(){
            console.log("-- clean --")
            // clean data edited
            this.api.employee = {}
            this.api.option = "created"
        }
    }
})