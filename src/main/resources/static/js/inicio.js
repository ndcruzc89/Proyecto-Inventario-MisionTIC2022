
document.addEventListener('DOMContentLoaded', (e) => {
    const titulo = document.getElementById("titulo-inicio");
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    titulo.innerHTML = `Bienvenido(a) ${user["name"]} ${user["lastName"]}`;
    console.log(user);
});