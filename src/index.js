import {Request} from "./request"
import {UI} from "./ui"

const req = new Request("http://localhost:3000/employees")
const ui = new UI

let updateState = null

class Index {
    constructor(){
        this.form = document.getElementById('employe-form')
        this.name = document.getElementById('employe-name')
        this.salary = document.getElementById('employe-salary')
        this.table = document.getElementById('employe-table')
        this.update = document.getElementById('employe-update')
        this.close = document.getElementById('employe-close')

        document.addEventListener('DOMContentLoaded', () => this.getLoadedEmployees())

        this.form.addEventListener('submit', (e) => this.formSubmit(e))
        this.table.addEventListener('click', (e) => this.editOrDelete(e))
        this.update.addEventListener('click', () => this.updateEmployeesUpdate())
    }

    formSubmit(e){
        const nameInput = this.name.value.trim()
        const salaryInput = this.salary.value.trim()

        if ( nameInput === '' || salaryInput === '' ){
            ui.message('Lütfen gerekli alanları doldurun', 'warning')
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
        }

        ui.clearInput()
        e.preventDefault()
    }

    getLoadedEmployees(){
        req.get()
            .then(employees => {
                ui.getLoadedEmployees(employees)
            })
            .catch(err => console.log(err))
    }

    editOrDelete(e){
        const tr = e.target.closest('tr')
        const id = tr.getAttribute('data-id')

        if (e.target.id === 'employe-edit'){
            this.close.addEventListener('click', () => ui.clearInput())
            ui.editEmployeeUI(tr)
            this.updateEmployees(tr, id)
        }
        if (e.target.id === 'employe-delete'){
            req.delete(id)
                .then(() => {
                    tr.remove()
                    ui.message('Kullanıcı başarıyla silindi!', 'danger')
                })
                .catch(err => console.log(err))

            ui.clearInput()
        }

        e.preventDefault()
    }

    updateEmployees(tr, id){
        updateState = {
            updateId: id,
            updateTr: tr
        }
    }

    updateEmployeesUpdate(){
        if (updateState){
            const data = {
                name: this.name.value.trim(),
                salary: this.salary.value.trim()
            }

            req.put(updateState.updateId, data)
                .then(employe => {
                    ui.updateEmployeOnUI(employe, updateState.updateTr)
                })
                .catch(err => console.log(err))
        }

        ui.clearInput()
    }
}

new Index
