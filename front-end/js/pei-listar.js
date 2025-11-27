const tablaPEI = document.getElementById("tblPEI").querySelector("tbody");

async function cargarTabla() {
    fetch("http://localhost:3000/pei", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json()
    ).then(listaPEI => {
        tablaPEI.innerHTML = ""; // Limpiar la tabla
        listaPEI.forEach(pei => {
            const fila = document.createElement("tr");
            fila.classList.add("align-middle");

            // `: Comilla francesa, permite utilizar variables o expresiones en un string. Por ejemplo dentro de de la fila crear la celda (td) con lo datos de usuario traidos de la BD (interpolación de variables: Insertar variables o expresiones directamente dentro de una cadena utilizando la sintaxis ${}) 
            fila.innerHTML = `
                <td> ${pei.nombrePEI} </td>
                <td> ${pei.objetivos} </td>
                <td> ${pei.adaptaciones} </td>
                <td> ${pei.criterioAprobacion} </td>
                <td> ${pei.porcentajeAvance} </td>
                <td class="text-center">
                    <a href="pei-avance.html?id=${pei._id}" class="btn btn-secondary btn-sm ms-2">Avance</a>    
                    <a href="pei-editar.html?id=${pei._id}" class="btn btn-primary btn-sm">Editar</a>
                </td>
                `;

            tablaPEI.appendChild(fila); // Agregar la fila creada en la tabla
        })

    }).catch(error => {
        console.log(error);
    });
}

cargarTabla();