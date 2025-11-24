const tablaProgramas = document.getElementById("tblProgramas").querySelector("tbody");

async function cargarTabla() {
    fetch("http://localhost:3000/programas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json()
    ).then(listaProgramas => {
        tablaProgramas.innerHTML = ""; // Limpiar la tabla
        listaProgramas.forEach(programa => {
            const fila = document.createElement("tr");
            fila.classList.add("align-middle");

            // `: Comilla francesa, permite utilizar variables o expresiones en un string. Por ejemplo dentro de de la fila crear la celda (td) con lo datos de usuario traidos de la BD (interpolación de variables: Insertar variables o expresiones directamente dentro de una cadena utilizando la sintaxis ${}) 
            fila.innerHTML = `
                <td> ${programa.nombrePrograma} </td>
                <td> ${programa.descripcion} </td>
                <td> ${programa.especialidad} </td>
                <td> ${programa.duracion} </td>
                <td> ${programa.cupo} </td>
                <td> ${programa.prerequisitos} </td>
                <td> ${programa.estado} </td>
                <td class="text-center"><a href="programa-editar.html?id=${programa._id}" class="btn btn-primary btn-sm">Editar</a></td>
                `;

            tablaProgramas.appendChild(fila); // Agregar la fila creada en la tabla
        })

    }).catch(error => {
        console.log(error);
    });
}

cargarTabla();