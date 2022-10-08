document.addEventListener('DOMContentLoaded', (e) => {

    const user = JSON.parse(localStorage.getItem("loggedUser"));

    /* *** Visitante o admin ************************************** */
    const refAdmin = document.querySelector(".ref-admin");
    (user["admin"]) 
    ? refAdmin.innerText = 'Admin'
    : refAdmin.innerText = 'Invitado';


    /* ******************************************************************** */
    /* *** Añadir Lista de Productos ************************************** */

    const getToListUsers = () => {
        fetch('/api/user')
        .then(response => response.json())
        .then(data => {
            addUsers(data);
        });
    }

    const addUsers = (data) => {
        const bodyTable = document.getElementById("body-table");
        bodyTable.innerText = "";
        dataTable.clear();
        let rowTable = '';
        data.map(({id, name, lastName, email, password, admin, active}) => {

            if (user["admin"]) {
                rowTable = [
                    `<tr id="userRow${id}" class="align-middle">
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${lastName}</td>
                        <td>${email}</td>
                        <td class="d-none">${password}</td>
                        <td>${admin}</td>
                        <td>${active}</td>
                        <td>
                            <button id="btnOpenEdit${id}" class="btnOpenEdit btn btn-editar me-2 mb-2" type="button">
                                <img src="./images/editar.svg" class= "img-fluid imgBtnOpenEdit" alt="editar">
                            </button>
                            <button id="btnOpenDelete${id}" class="btnOpenDelete btn btn-eliminar mb-2" type="button">
                                <img src="./images/eliminar.svg" class= "img-fluid imgBtnOpenDelete" alt="eliminar">
                            </button>
                        </td>
                    </tr>`
                    ].join('\n');
            } else {
                rowTable = [
                    `<tr id="userRow${id}" class="align-middle">
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${lastName}</td>
                        <td>${email}</td>
                        <td class="d-none">${password}</td>
                        <td>${admin}</td>
                        <td>${active}</td>
                        <td>
                            <button id="btnOpenEdit${id}" class="btnOpenEdit btn btn-editar me-2 mb-2" type="button" disabled>
                                <img src="./images/editar.svg" class= "img-fluid imgBtnOpenEdit" alt="editar">
                            </button>
                            <button id="btnOpenDelete${id}" class="btnOpenDelete btn btn-eliminar mb-2" type="button" disabled>
                                <img src="./images/eliminar.svg" class= "img-fluid imgBtnOpenDelete" alt="eliminar">
                            </button>
                        </td>
                    </tr>`
                    ].join('\n');
            }

            dataTable.row.add($(rowTable)).draw();
        });

    }

    getToListUsers();

    //Datatable 
    let dataTable = new DataTable('#table-users',{
        language: {
            "decimal": "",
            "emptyTable": "No hay información para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        responsive: true,
        "lengthMenu": [5,10,15],
        "dom": 'lBftip',
        buttons: [
            {
                text: '&nbsp', 
                className: "btnOpenAdd btn btn-agregar text-white fs-6"
            }
        ]
    });

    

    document.querySelector('.dataTables_wrapper').classList.add("row", "d-flex", "align-items-center", "justify-content-center");

    document.querySelector('.dataTables_length').classList.add("col-12","col-sm-5", "col-md-4", "mb-3", "mb-sm-4")

    document.querySelector('.dt-buttons').classList.remove("btn-group", "flex-wrap");
    document.querySelector('.dt-buttons').classList.add("col-12", "col-md-3", "mb-3", "mb-sm-4", "text-md-center" );

    document.querySelector('.dt-buttons .btn').innerHTML = [
    `<img src="./images/agregar.svg" class= "img-fluid me-1" alt="añadir">
     <span class="">Agregar</span>`].join('');
     (user["admin"])
    ? document.querySelector('.dt-buttons .btn').disabled = false
    : document.querySelector('.dt-buttons .btn').disabled = true;

    document.querySelector('.dataTables_filter').classList.add("col-12", "col-md-5", "mb-4");

    document.getElementById('table-users').classList.add("d-block", "table-responsive", "w-100");

    document.querySelector('.dataTables_info').classList.add("col-12","col-md-6", "text-muted", "mb-3", "mb-sm-4");

    document.querySelector('.dataTables_paginate').classList.add("col-12","col-md-6", "mb-3", "mb-sm-4", "mt-md-4");

    /* ******************************************************************** */
    /* *** Validar Formulario ********************************************* */
    const inputs = document.querySelectorAll('#form-usuario .input');
    

    const expressions = {
        text: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, // La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
        active: /[1-2]/
    };

    const fieldState = {
        inputName: false,
        inputLastName: false,
        inputEmail: false,
        inputPassword: false,
        inputAdmin: false,
        inputActive: false
    };

    const fieldValue = {
        "id": null,
        "name": null,
        "lastName": null,
        "email": null,
        "password": null,
        "admin": null,
        "active": null
    }


    const validateForm = (e) => {
        switch (e.target.name) {
            case "inputName":
                validateField(expressions.text, e.target, 'inputName', 'nameHelp','name');
                break;
            case "inputLastName":
                validateField(expressions.text, e.target, 'inputLastName', 'lastNameHelp', 'lastName');
                break;
            case "inputEmail":
                validateField(expressions.email, e.target, 'inputEmail', 'emailHelp', 'email');
                break;
            case "inputPassword":
                validateField(expressions.password, e.target, 'inputPassword', 'passwordHelp', 'password');
                break;
            case "inputAdmin":
                validateField(expressions.active, e.target, 'inputAdmin', 'adminHelp', 'admin');
                break;
            case "inputActive":
                validateField(expressions.active, e.target, 'inputActive', 'activeHelp', 'active');
                break;
            default:
                break;
        }
    };

    const validateField = (expression, input, inputName, idHelp, fieldName) => {
        if (expression.test(input.value)){
            document.getElementById(`${inputName}`).classList.remove('border','border-danger');
            document.getElementById(`${inputName}`).classList.add('border','border-success');
            document.getElementById(`${idHelp}`).classList.add('d-none');
            fieldState[inputName] = true;
            if ((inputName == 'inputAdmin' || inputName == 'inputActive') && input.value == '1') {
                fieldValue[fieldName] = true;
            } else if ((inputName == 'inputAdmin' || inputName == 'inputActive') && input.value == '2')
                fieldValue[fieldName] = false;
            else {
                fieldValue[fieldName] = input.value;
            }
        } else {
            document.getElementById(`${inputName}`).classList.add('border','border-danger');
            document.getElementById(`${inputName}`).classList.remove('border','border-success');
            document.getElementById(`${idHelp}`).classList.remove('d-none');
            fieldState[inputName] = false;
        }
    };


    inputs.forEach((input) => {
        input.addEventListener('keyup', validateForm); //Tecla levantada
        input.addEventListener('blur', validateForm); //Clic afuera del campo
    });


    /* *** Botón de abrir y editar el formulario de usuario ************************************** */

    const userModal = new bootstrap.Modal(document.getElementById('userModal'));
    let option = '';

    // Botón para abrir el formulario de añadir un usuario
    const buttonOpenAdd = document.querySelector(".btnOpenAdd");
    buttonOpenAdd.addEventListener('click', ()=>{
        formUser.reset();
        option = 'add';
        userModal.show();
        document.querySelector(".modal-header").classList.add("modal-header-green");
        document.querySelector(".modal-header").classList.remove("modal-header-blue");
        document.getElementById("modal-title").innerHTML = `<span>Agregar Usuario</span>`;
        document.getElementById("submitUser").innerHTML = `<button class="btnAddUser btn text-white" type="submit">Enviar</button>`;

    });

    // Función para poder manejar los botones que abren el formulario de agregar y añadir un usuario
    const on = (element, event, selector, handler) => {
        element.addEventListener(event, e => {
            if (e.target.closest(selector)){
                handler(e)
            }
        })
    };

    // Botón para abrir el formulario de editar un usuario
    on(document, 'click', '.btnOpenEdit', e => {
        const inputsId = [' ', 'inputName', 'inputLastName', 'inputEmail', 'inputPassword', 'inputAdmin', 'inputActive'];
        const valuesInput = ["id", "name", "lastName", "email", "password", "admin", "active"];
        let parentsBtnOpenEdit = '';
        if (e.target.matches(".imgBtnOpenEdit")) {
            parentsBtnOpenEdit = e.target.parentElement.parentElement.parentElement.getElementsByTagName('td');
        }
        if (e.target.matches(".btnOpenEdit")){
            parentsBtnOpenEdit = e.target.parentElement.parentElement.getElementsByTagName('td');
        } 
        let rowList = Array.from(parentsBtnOpenEdit);
        for (let i = 0; i < rowList.length-1; i++) {
            if (i > 0) {
                if((inputsId[i] == 'inputAdmin' || inputsId[i] == 'inputActive') && rowList[i].innerText == 'true') {
                    document.getElementById(inputsId[i]).value = 1;
                } else if ((inputsId[i] == 'inputAdmin' || inputsId[i] == 'inputActive') && rowList[i].innerText == 'false') {
                    document.getElementById(inputsId[i]).value = 2;
                } else {
                    document.getElementById(inputsId[i]).value = rowList[i].innerText;
                }
                fieldState[inputsId[i]] = true;
            }
            fieldValue[valuesInput[i]] = rowList[i].innerText;
        }
        option = 'edit';
        userModal.show();
        document.querySelector(".modal-header").classList.add("modal-header-blue");
        document.querySelector(".modal-header").classList.remove("modal-header-green");
        document.getElementById("modal-title").innerHTML = `<span>Editar Usuario</span>`;
        document.getElementById("submitUser").innerHTML = `<button class="btnEditUser btn text-white" type="submit">Enviar</button>`;
    });


    /* *** Botón para abrir el alert y confirmar la eliminación de usuario ************************************** */
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    let idProduct = 0;

    on(document, 'click', '.btnOpenDelete', e => {
        let parentsBtnOpenDelete = '';
        if (e.target.matches(".imgBtnOpenDelete")) {
            parentsBtnOpenDelete = e.target.parentElement.parentElement.parentElement.getElementsByTagName('td');
        }
        if (e.target.matches(".btnOpenDelete")){
            parentsBtnOpenDelete = e.target.parentElement.parentElement.getElementsByTagName('td');
        } 
        idProduct = Array.from(parentsBtnOpenDelete)[0].innerText;
        deleteModal.show();
    });

    const btnDeleteUser = document.getElementById("btnDeleteUser")
    btnDeleteUser.addEventListener('click', ()=>{
        deleteToRemoveUser(idProduct);
    });


    /* *** Enviar el usuario agregado************************************** */
    const formUser = document.getElementById("form-usuario");
    formUser.addEventListener('submit', (e) => {
        e.preventDefault();     
        if(fieldState.inputName && fieldState.inputLastName && fieldState.inputEmail && fieldState.inputPassword && fieldState.inputAdmin&& fieldState.inputActive){
            if (option == 'add'){
                postToAddUser(fieldValue);
            } else if (option == 'edit'){
                putToUpdateUser(fieldValue);
            }
        } else {
            alertMessage("Por favor complete todos los campos correctamente","danger","exclamation-triangle-fill");
        }
    });

    const alertMessage = (message,type,idIcon) => {
        document.getElementById("alert-message").innerHTML = [
            `<div class="alert alert-${type} d-flex align-items-center alert-dismissible fade show" role="alert">
                <svg class="bi flex-shrink-0 me-2 iconos-alertas" role="img" aria-label="Danger:"><use href="./images/iconos-alertas.svg#${idIcon}"/></svg>
                <div>${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`].join('');
    }


    //Método post para agregar el usuario
    const postToAddUser = async (bodyObject) => {
        const url = "/api/user";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(bodyObject),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            alertMessage("Usuario agregado con éxito","success","check-circle-fill");
            getToListUsers();
            formUser.reset();
            userModal.hide();
        } else {
            alertMessage("Error al intentar agregar el usuario","danger","exclamation-triangle-fill");
        }
        inputs.forEach((input) => input.classList.remove('border','border-success'));
    }


    //Método post para agregar el usuario
    const putToUpdateUser = async (bodyObject) => {
        const url = "/api/user";
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(bodyObject),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            alertMessage("Usuario actualizado con éxito","success","check-circle-fill");
            getToListUsers();
            formUser.reset();
            userModal.hide();
        } else {
            alertMessage("Error al intentar actualizar el usuario","danger","exclamation-triangle-fill");
        }
        inputs.forEach((input) => input.classList.remove('border','border-success'));
    }


    //Método delete para eliminar el usuario
    const deleteToRemoveUser = async (id) => {
        const url = "/api/user/" + id;
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (response.ok) {
            alertMessage("Usuario eliminado con éxito","success","check-circle-fill");
            getToListUsers();
            deleteModal.hide();
        } else {
            alertMessage("Error al intentar eliminar el usuario","danger","exclamation-triangle-fill");
        }
    }

});