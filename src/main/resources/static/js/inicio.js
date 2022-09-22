
document.addEventListener('DOMContentLoaded', (e) => {
    const titulo = document.getElementById("titulo-inicio");
    const user = JSON.parse(localStorage.getItem("info-user"));

    titulo.innerHTML = `Bienvenido(a) ${user["nombre"]} ${user["apellidos"]}`;
    console.log(user);
});