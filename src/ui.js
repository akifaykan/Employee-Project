
export class UI {
    constructor(){
        this.form = document.getElementById('employe-form')
        this.name = document.getElementById('employe-name')
        this.salary = document.getElementById('employe-salary')
        this.table = document.getElementById('employe-table')
    }

    getLoadedEmployees(employees){
        let result = ""

        employees.forEach(employee => {
            result += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.salary}₺</td>
                    <td class="text-right flex">
                        <a href="" class="item_button">Düzenle</a>
                        <a href="" class="item_button">Sil</a>
                    </td>
                </tr>
            `
        })

        this.table.innerHTML = result
    }

    addEmployeeUI(employee){
        this.table.innerHTML += `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.salary}₺</td>
                <td class="text-right flex">
                    <a href="" class="item_button">Düzenle</a>
                    <a href="" class="item_button">Sil</a>
                </td>
            </tr>
        `
    }

    message(message, classes){
        const msg = document.getElementById('messages')
        const msgHtml = `
            <div class="alert ${classes}">${message}</div>
        `
        msg.insertAdjacentHTML('afterbegin', msgHtml)

        setTimeout(()=>{
            msg.innerHTML = ""
        }, 1200)
    }

    clearInput(){
        this.name.value = ""
        this.salary.value = ""
    }
}