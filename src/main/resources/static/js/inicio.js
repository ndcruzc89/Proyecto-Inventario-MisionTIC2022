document.addEventListener('DOMContentLoaded', (e) => {
    const titulo = document.getElementById("titulo-inicio");
    const refAdmin = document.querySelector(".ref-admin");
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const regProducts = document.querySelector(".card-text-products");
    const regUsers = document.querySelector(".card-text-users");

    (user["admin"]) 
    ? refAdmin.innerText = 'Admin'
    : refAdmin.innerText = 'Invitado'; 

    titulo.innerHTML = `Bienvenido(a) ${user["name"]} ${user["lastName"]}`;


    fetch('/api/product')
    .then(response => response.json())
    .then(data => {
        regProducts.innerHTML = [`${data.length} registrados`].join('');
    });

    fetch('/api/user')
    .then(response => response.json())
    .then(data => {
        regUsers.innerHTML = [`${data.length} registrados`].join('');
    });

    
    

});