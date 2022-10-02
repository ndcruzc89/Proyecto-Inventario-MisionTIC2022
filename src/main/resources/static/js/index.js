document.addEventListener('DOMContentLoaded', (e) => {

    const form = document.getElementById("form-login");
    const submit = document.getElementById("btn-ingresar");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById("inputEmail").value;
        const password = document.getElementById("inputPassword").value;

        if (email === "") return alertMessage ("El email es requerido","danger","exclamation-triangle-fill");

        if (password === "") return alertMessage ("La contraseña es requerida","danger","exclamation-triangle-fill");
            
        const body = {
            "email": email,
            "password": password
        }

        postToLogin(body);
    });

    const postToLogin = async (bodyObject) => {
        const url = "/api/login";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(bodyObject),
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(JSON.stringify(bodyObject))
    
        if (response.ok) {
            const user = await response.json();
            localStorage.setItem("loggedUser", JSON.stringify(user));
            alertMessage("Inicio de sesión exitoso","success","check-circle-fill"); 
            await new Promise(r => setTimeout(r, 800));
            location.href="/inicio";

        } else {
            const message = await response.text();
            alertMessage("Email y/o contraseña incorrectos","danger","exclamation-triangle-fill");
        }
    };

    const alertMessage = (message,type,idIcon) => {
        document.getElementById("alert-incorrect").innerHTML = [
            `<div class="alert alert-${type} d-flex align-items-center position-fixed alert-dismissible fade show" role="alert">
                <svg class="bi flex-shrink-0 me-2 iconos-alertas" role="img" aria-label="Danger:"><use href="./images/iconos-alertas.svg#${idIcon}"/></svg>
                <div>${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`].join('')
    }

    /* Pruebas con JSON LOCAL */
/*     const postToLogin = (email,password) => {
        fetch('./public/data/usuarios.json')
        .then(response => response.json())
        .then(data => {

            console.log(data);
            const userFinded = data.find(function(user) { 
                return user.email === email && user.contraseña === password && user.estado === "activo";});

            if(userFinded){
                console.log("Entrada con éxito");
                console.log(userFinded);
                localStorage.setItem("info-user", JSON.stringify(userFinded));
                alertMessage("Inicio de sesión exitoso","success","check-circle-fill"); 
                new Promise(r => setTimeout(r => {
                    location.href="./inicio.html";},2000));
            } else {
                console.log("Datos incorrectos");
                console.log(userFinded);
                alertMessage("Email y/o contraseña incorrectos","danger","exclamation-triangle-fill");

            }
        }); 
    } */
   
});


