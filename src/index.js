import {Request} from "./request"
import {UI} from "./ui"

const req = new Request("http://localhost:3000/employees")
const ui = new UI

class Index {
    constructor(){
        this.form = document.getElementById('employe-form')
        this.name = document.getElementById('employe-name')
        this.salary = document.getElementById('employe-salary')
        this.table = document.getElementById('employe-table')

        document.addEventListener('DOMContentLoaded', () => this.getLoadedEmployees())
        this.form.addEventListener('submit', (e) => this.formSubmit(e))
    }

    formSubmit(e){
        e.preventDefault()
        const nameInput = this.name.value.trim()
        const salaryInput = this.salary.value.trim()

        if ( nameInput === '' || salaryInput === '' ){
            ui.message('Lütfen gerekli alanları doldurun', 'danger')
        } else {
            req.post({
                name: nameInput,
                salary: Number(salaryInput)
            })
                .then(employee => {
                    ui.addEmployeeUI(employee)
                })
                .catch(err => console.log(err))

            ui.message('Çalışan eklendi', 'success')
            ui.clearInput()
        }

        e.preventDefault()
    }

    getLoadedEmployees(){
        req.get()
            .then(employees => {
                ui.getLoadedEmployees(employees)
            })
            .catch(err => console.log(err))
    }
}

new Index

/*

req.get()
    .then(res => console.log(res))
    .catch(err => console.log(err))

req.post(data)
    .then(res => console.log(res))
    .catch(err => console.log(err))

req.put(8, data)
    .then(res => console.log(res))
    .catch(err => console.log(err))

req.delete(8)
    .then(message => console.log(message))
    .catch(err => console.log(err))

*/