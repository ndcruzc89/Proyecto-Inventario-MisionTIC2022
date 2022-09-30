document.addEventListener('DOMContentLoaded', (e) => {

    const getToListProducts = () => {
        fetch('/api/product')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            addProducts(data);
        });
    }

   

    const addProducts = (data) => {
        let bodyTable = document.getElementById("body-table");
        bodyTable.innerText = "";
        data.map(({id, description, category, stock, price_unit, active, date_creation}) => {

        let rowTable = [
        `<tr id="productRow-${id}" class="align-middle">
            <td>${id}</td>
            <td>${description}</td>
            <td>${category}</td>
            <td>${stock}</td>
            <td>${price_unit}</td>
            <td>${active}</td>
            <td>${date_creation}</td>
            <td>
                <button id="edit-btn-${id}" class="btn btn-editar me-2 mb-2" type="submit">
                    <img src="./images/editar.svg" class= "img-fluid" alt="editar">
                </button>
                <button id="delete-btn-${id}" class="btn btn-eliminar mb-2" type="submit">
                    <img src="./images/eliminar.svg" class= "img-fluid" alt="eliminar">
                </button>
            </td>
        </tr>`
        ].join('\n');
        bodyTable.innerHTML= bodyTable.innerHTML + rowTable;
        });

    }

    getToListProducts();

    // const addButton = document.getElementById("add-btn");

    // const bodyTable = document.querySelector('.body-table');

    // addButton.addEventListener('click', ()=>{
        
    //     async (bodyObject) => {
    //         const url = "/api/login";
    //         const response = await fetch(url, {
    //             method: "POST",
    //             body: JSON.stringify(bodyObject),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
        
    //         if (response.ok) {
    
    //         } else {

    //         }
    //     };
    // });
});