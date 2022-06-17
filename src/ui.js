
export class UI {
    constructor(){
        this.form = document.getElementById('employe-form')
        this.name = document.getElementById('employe-name')
        this.salary = document.getElementById('employe-salary')
        this.table = document.getElementById('employe-table')
        this.button = document.getElementById('employe-button')
        this.close = document.getElementById('employe-close')
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
        this.button.innerHTML = 'Güncelle'
        this.close.style.display = 'inline-flex'
        this.close.addEventListener('click', () => this.clearInput())

        this.employeeToInput(tr)
    }

    employeeToInput(tr){
        const chidren = tr.children

        this.name.value = chidren[1].textContent
        this.salary.value = Number(chidren[2].textContent.replace('₺',''))
    }

    clearInput(){
        this.name.value = ""
        this.salary.value = ""
        this.close.style.display = 'none'
        this.button.innerHTML = 'Kaydet'
    }

    message(message, classes){
        const msg = document.getElementById('messages')
        const msgHtml = `<div class="alert ${classes}">${message}</div>`

        msg.insertAdjacentHTML('afterbegin', msgHtml)

        setTimeout(()=>{msg.innerHTML = ""}, 1300)
    }
}