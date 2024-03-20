const socket = io();
var mensajeDiv = document.getElementById("mensaje");
var datosPro = document.getElementById ("datosPro");


socket.on("servidorEnviarProductos", (productos)=>{
    console.log(productos);
    var tr ="";
    productos.forEach((producto, idLocal) => {
        tr = tr + `
        <tr>
            <td>${idLocal+1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
            <a href="#" onClick="editarProducto('${producto._id}')">Editar</a>
            <a href="#" onClick="borrarProducto('${producto._id}')">Borrar</a>
            </td>
        </tr>
        
        `;
    });
    datosPro.innerHTML = tr;
});


var enviarDatosPro = document.getElementById("enviarDatosPro");
enviarDatosPro.addEventListener("submit", (e) => {
    e.preventDefault();
    var producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        cantidad: document.getElementById("cantidad").value
    };
    socket.emit("clienteGuardarPro", producto);
    socket.on("servidorProductoGuardado", (mensaje) => { 
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(() => {
            mensajeDiv.innerHTML = "";
        }, 2000);
    });

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("nombre").focus();
});



function editarProducto(id) {
    console.log(id);
}


function borrarProducto(id) {
    console.log(id);
}