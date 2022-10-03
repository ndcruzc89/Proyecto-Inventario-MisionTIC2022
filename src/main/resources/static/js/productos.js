document.addEventListener('DOMContentLoaded', (e) => {

    /* ******************************************************************** */
    /* *** Añadir Lista de Productos ************************************** */

    const getToListProducts = () => {
        fetch('/api/product')
        .then(response => response.json())
        .then(data => {
            addProducts(data);
        });
    }

    const addProducts = (data) => {
        const bodyTable = document.getElementById("body-table");
        bodyTable.innerText = "";
        data.map(({id, description, category, stock, price_unit, active, date_creation}) => {

        let rowTable = [
        `<tr id="productRow${id}" class="align-middle">
            <td>${id}</td>
            <td>${description}</td>
            <td>${category}</td>
            <td>${stock}</td>
            <td>${price_unit}</td>
            <td>${active}</td>
            <td>${date_creation}</td>
            <td>
                <button id="btnOpenEdit${id}" class="btnOpenEdit btn btn-editar me-2 mb-2" type="button">
                    <img src="./images/editar.svg" class= "img-fluid" alt="editar">
                </button>
                <button id="btnOpenDelete${id}" class="btnOpenDelete btn btn-eliminar mb-2" type="button">
                    <img src="./images/eliminar.svg" class= "img-fluid" alt="eliminar">
                </button>
            </td>
        </tr>`
        ].join('\n');
        bodyTable.innerHTML= bodyTable.innerHTML + rowTable;
        });

    }

    getToListProducts();


    /* ******************************************************************** */
    /* *** Validar Formulario ********************************************* */
    const inputs = document.querySelectorAll('#form-producto .input');
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    const expressions = {
        description: /^[a-zA-ZÀ-ÿ\s0-9\-]{1,40}$/, // Letras (pueden llevar acentos), números, espacios y guiones
        text: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        number: /^[0-9]+$/, // Solo números,
        price: /^[0-9]+([.])?([0-9]+)?$/,
        active: /[1-2]/,
        date: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
    };

    const fieldState = {
        inputDescription: false,
        inputCategory: false,
        inputStock: false,
        inputPrice: false,
        inputActive: false,
        inputCreationDate: false
    };

    const fieldValue = {
        "id": null,
        "description": null,
        "category": null,
        "stock": null,
        "price_unit": null,
        "active": null,
        "date_creation": null,
        "userId": user["id"]
    }

    

    const validateForm = (e) => {
        switch (e.target.name) {
            case "inputDescription":
                validateField(expressions.description, e.target, 'inputDescription', 'descriptionHelp','description');
                break;
            case "inputCategory":
                validateField(expressions.text, e.target, 'inputCategory', 'categoryHelp', 'category');
                break;
            case "inputStock":
                validateField(expressions.number, e.target, 'inputStock', 'stockHelp', 'stock');
                break;
            case "inputPrice":
                validateField(expressions.price, e.target, 'inputPrice', 'priceHelp', 'price_unit');
                break;
            case "inputActive":
                validateField(expressions.active, e.target, 'inputActive', 'activeHelp', 'active');
                break;
            case "inputCreationDate":
                validateField(expressions.date, e.target, 'inputCreationDate', 'creationDateHelp', 'date_creation');
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
            if (inputName == 'inputActive' && input.value == '1') {
                fieldValue[fieldName] = true;
            } else if (inputName == 'inputActive' && input.value == '2')
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


    /* *** Botón de abrir y editar el formulario de producto ************************************** */

    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    let option = '';

    // Botón para abrir el formulario de añadir un producto
    const buttonOpenAdd = document.querySelector(".btnOpenAdd");
    buttonOpenAdd.addEventListener('click', ()=>{
        formProduct.reset();
        option = 'add';
        productModal.show();
        document.querySelector(".modal-header").classList.add("modal-header-green");
        document.querySelector(".modal-header").classList.remove("modal-header-blue");
        document.getElementById("modal-title").innerHTML = `<span>Agregar Producto</span>`;
        document.getElementById("submitProduct").innerHTML = `<button class="btnAddProduct btn text-white" type="submit">Enviar</button>`;

    });

    // Función para poder manejar los botones que abren el formulario de agregar y añadir un producto
    const on = (element, event, selector, handler) => {
        element.addEventListener(event, e => {
            if (e.target.closest(selector)){
                handler(e)
            }
        })
    };

    // Botón para abrir el formulario de editar un producto
    on(document, 'click', '.btnOpenEdit', e => {
        const elementAlert = document.getElementById("alert-message");
        const inputsId = ['','inputDescription', 'inputCategory', 'inputStock', 'inputPrice', 'inputActive', 'inputCreationDate',''];
        const valuesInput = ["id", "description", "category", "stock", "price_unit", "active", "date_creation", "userId"];
        const buttonOpenEdit = document.querySelector(".btnOpenEdit");
        let rowList = Array.from(buttonOpenEdit.parentElement.parentElement.getElementsByTagName('td'));
        for (let i = 0; i < rowList.length-1; i++) {
            if (i > 0) {
                if(inputsId[i] == 'inputActive' && rowList[i].innerText == 'true') {
                    document.getElementById(inputsId[i]).value = 1;
                } else if (inputsId[i] == 'inputActive' && rowList[i].innerText == 'false') {
                    document.getElementById(inputsId[i]).value = 2;
                } else {
                    document.getElementById(inputsId[i]).value = rowList[i].innerText;
                }
                fieldState[inputsId[i]] = true;
            }
            fieldValue[valuesInput[i]] = rowList[i].innerText;
        }
        option = 'edit';
        productModal.show();
        document.querySelector(".modal-header").classList.add("modal-header-blue");
        document.querySelector(".modal-header").classList.remove("modal-header-green");
        document.getElementById("modal-title").innerHTML = `<span>Editar Producto</span>`;
        document.getElementById("submitProduct").innerHTML = `<button class="btnEditProduct btn text-white" type="submit">Enviar</button>`;
    });


    // const buttonClose = document.getElementById("btnClose");
    // buttonClose.addEventListener('click', ()=>{
    //     productModal.hide();
    //     productModal.dispose();
    // });


    /* *** Enviar el producto agregado************************************** */
    const formProduct = document.getElementById("form-producto");
    formProduct.addEventListener('submit', (e) => {
        e.preventDefault();     
        if(fieldState.inputDescription && fieldState.inputCategory && fieldState.inputStock && fieldState.inputPrice && fieldState.inputActive && fieldState.inputCreationDate){
            if (option == 'add'){
                postToAddProduct(fieldValue);
            } else if (option == 'edit'){
                console.log("editar");
                putToUpdateProduct(fieldValue);
            }
        } else {
            console.log("Completar campos");
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

    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    // Botón para abrir el alert para confirmar la eliminación de producto. 
    on(document, 'click', '.btnOpenDelete', e => {
        deleteModal.show();
    });

    const btnDeleteProduct = document.getElementById("btnDeleteProduct")
    btnDeleteProduct.addEventListener('click', ()=>{
        const buttonOpenDelete = document.querySelector(".btnOpenDelete");
        const idProduct = Array.from(buttonOpenDelete.parentElement.parentElement.getElementsByTagName('td'))[0].innerHTML;
        deleteToRemoveProduct(idProduct);
    });

    //Método post para agregar el producto
    const postToAddProduct = async (bodyObject) => {
        const url = "/api/product";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(bodyObject),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            alertMessage("Producto agregado con éxito","success","check-circle-fill");
            getToListProducts();
            formProduct.reset();
            productModal.hide();
            console.log("Respuesta correcta");
        } else {
            // const message = await response.text();
            alertMessage("Error al intentar agregar el producto","danger","exclamation-triangle-fill");
            console.log("Respuesta incorrecta");
        }
        inputs.forEach((input) => input.classList.remove('border','border-success'));
    }


    //Método post para agregar el producto
    const putToUpdateProduct = async (bodyObject) => {
        const url = "/api/product";
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(bodyObject),
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(JSON.stringify(bodyObject));
        if (response.ok) {
            alertMessage("Producto actualizado con éxito","success","check-circle-fill");
            getToListProducts();
            formProduct.reset();
            productModal.hide();
            console.log("Respuesta correcta");
        } else {
            // const message = await response.text();
            alertMessage("Error al intentar actualizar el producto","danger","exclamation-triangle-fill");
            console.log("Respuesta incorrecta");
        }
        inputs.forEach((input) => input.classList.remove('border','border-success'));
    }


    //Método delete para eliminar el producto
    const deleteToRemoveProduct = async (id) => {
        console.log(id);
        const url = "/api/product/" + id;
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (response.ok) {
            alertMessage("Producto eliminado con éxito","success","check-circle-fill");
            getToListProducts();
            deleteModal.hide();
            console.log("Respuesta correcta");
        } else {
            // const message = await response.text();
            alertMessage("Error al intentar eliminar el producto","danger","exclamation-triangle-fill");
            console.log("Respuesta incorrecta");
        }
    }
            




});