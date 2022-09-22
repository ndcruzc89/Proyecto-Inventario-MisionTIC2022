document.addEventListener('DOMContentLoaded', (e) => {

    const form = document.getElementById("form-registrarse");
    const inputs = document.querySelectorAll('#form-registrarse input');

    const expresiones = {
        textos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/ // La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
    };

    const campos = {
        inputFirstName: false,
        inputLastName: false,
        inputEmail: false,
        inputPassword: false
    };

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "inputFirstName":
                validarCampo(expresiones.textos, e.target, 'inputFirstName', 'fistNameHelp');
                break;
            case "inputLastName":
                validarCampo(expresiones.textos, e.target, 'inputLastName', 'lastNameHelp');
                break;
            case "inputEmail":
                validarCampo(expresiones.email, e.target, 'inputEmail', 'emailHelp');
                break;
            case "inputPassword":
                validarCampo(expresiones.password, e.target, 'inputPassword', 'passwordHelp');
                break;
        }
    };

    const validarCampo = (expresion, input, inputName, idHelp) => {
        if(expresion.test(input.value)){
            document.getElementById(`${inputName}`).classList.remove('border','border-danger');
            document.getElementById(`${inputName}`).classList.add('border','border-success');
            document.getElementById(`${idHelp}`).classList.add('d-none');
            campos[inputName] = true;
        } else {
            document.getElementById(`${inputName}`).classList.add('border','border-danger');
            document.getElementById(`${inputName}`).classList.remove('border','border-success');
            document.getElementById(`${idHelp}`).classList.remove('d-none');
            campos[inputName] = false;
        }
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario); //Tecla levantada
        input.addEventListener('blur', validarFormulario); //Clic afuera del campo
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const terminos = document.getElementById('terminos');
        if(campos.inputFirstName && campos.inputLastName && campos.inputEmail && campos.inputPassword && terminos.checked ){
            postToRegister();
        } else {
            console.log("Completar campos");
            alertMessage("Por favor complete todos los campos correctamente","danger","exclamation-triangle-fill");
        }
        
    });

    const postToRegister = () => {
        email = document.getElementById("inputEmail").value;
        fetch('./public/data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const emailFinded = data.find(function(user) { 
                return user.email === email});
            if(!emailFinded){
                console.log("Formulario enviado con éxito");
                console.log(emailFinded);
                alertMessage("Formulario enviado con éxito","success","check-circle-fill");
                form.reset();
            } else {
                console.log("Correo electrónico en uso");
                console.log(emailFinded);
                alertMessage("El correo electrónico ya está en uso","danger","exclamation-triangle-fill");
            }
            inputs.forEach((input) => input.classList.remove('border','border-success'));
        });
    }


    const alertMessage = (message,type,idIcon) => {
        document.getElementById("alert-incorrect").innerHTML = [
            `<div class="alert alert-${type} d-flex align-items-center position-fixed alert-dismissible fade show" role="alert">
                <svg class="bi flex-shrink-0 me-2 iconos-alertas" role="img" aria-label="Danger:"><use href="./images/iconos-alertas.svg#${idIcon}"/></svg>
                <div>${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`].join('')
    }

});





