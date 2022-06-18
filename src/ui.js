
export class UI {
    constructor(){
        this.form = document.getElementById('employe-form')
        this.name = document.getElementById('employe-name')
        this.salary = document.getElementById('employe-salary')
        this.table = document.getElementById('employe-table')

        this.close = document.getElementById('employe-close')
        this.update = document.getElementById('employe-update')
        this.button = document.getElementById('employe-button')
    }

    getLoadedEmployees(employees){
        let result = ""

        employees.forEach(employee => {
            result += `
                <tr data-id="${employee.id}">
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.salary}₺</td>
                    <td class="text-right flex">
                        <a id="employe-edit" class="item_button">Düzenle</a>
                        <a id="employe-delete" class="item_button">Sil</a>
                    </td>
                </tr>
            `
        })

        this.table.innerHTML = result
    }

    addEmployeeUI(employee){
        this.table.innerHTML += `
            <tr data-id="${employee.id}">
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.salary}₺</td>
                <td class="text-right flex">
                    <a id="employe-edit" class="item_button">Düzenle</a>
                    <a id="employe-delete" class="item_button">Sil</a>
                </td>
            </tr>
        `
    }

    editEmployeeUI(tr){
        this.close.setAttribute('data-view', 'show')
        this.update.setAttribute('data-view', 'show')
        this.button.setAttribute('data-view', 'hide')

        this.employeeToInput(tr)
    }

    updateEmployeOnUI(employee, tr){
        tr.innerHTML = `
            <tr data-id="${employee.id}">
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.salary}₺</td>
                <td class="text-right flex">
                    <a id="employe-edit" class="item_button">Düzenle</a>
                    <a id="employe-delete" class="item_button">Sil</a>
                </td>
            </tr>
        `
    }

    employeeToInput(tr){
        const chidren = tr.children
        this.name.value = chidren[1].textContent
        this.salary.value = Number(chidren[2].textContent.replace('₺',''))

        this.addEditedClass(tr)
    }

    addEditedClass(tr){
        for (let item of this.table.children) {
            item.classList.remove('edit')
        }

        tr.classList.add('edit')
    }

    clearInput(){
        this.name.value = ""
        this.salary.value = ""

        if (this.close.getAttribute('data-view') === 'show'){
            this.close.setAttribute('data-view', 'hide')
            this.update.setAttribute('data-view', 'hide')
            this.button.setAttribute('data-view', 'show')

            for (let item of this.table.children) {
                item.classList.remove('edit')
            }
        }
    }

    message(message, classes){
        const msg = document.getElementById('messages')
        const msgHtml = `<div class="alert ${classes}">${message}</div>`

        msg.insertAdjacentHTML('afterbegin', msgHtml)

        setTimeout(()=>{msg.innerHTML = ""}, 1300)
    }
}