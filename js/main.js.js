
const productos = [
    { id: 1, nombre: "Mesa", stock: { Abedul: 10, Cedro: 5, Abeto: 8, Roble: 3, "Roble oscuro": 7 } },
    { id: 2, nombre: "Silla", stock: { Abedul: 15, Cedro: 10, Abeto: 12, Roble: 9, "Roble oscuro": 11 } },
    { id: 3, nombre: "Estantería", stock: { Abedul: 8, Cedro: 6, Abeto: 7, Roble: 4, "Roble oscuro": 5 } },
    { id: 4, nombre: "Ropero", stock: { Abedul: 4, Cedro: 3, Abeto: 5, Roble: 2, "Roble oscuro": 1 } },
    { id: 5, nombre: "Sillón", stock: { Abedul: 9, Cedro: 7, Abeto: 6, Roble: 5, "Roble oscuro": 8 } }
];


function buscarProductoPorNombre(nombre) {
    return productos.filter(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

function buscarProductoPorColor(color) {
    return productos.filter(producto => producto.stock[color] !== undefined);

}

function filtrarProductosPorStock(minimoStock) {
    return productos.filter(producto => {
        return Object.values(producto.stock).some(stock => stock >= minimoStock);
    });
}

while (true) {
 
    const tipoBusqueda = prompt("Ingresa el tipo de búsqueda: 'nombre', 'color', 'stock' o 'salir' para terminar:");

    if (tipoBusqueda.toLowerCase() === 'salir') {
        alert("Saliendo del programa.");
        break;
    }

    if (tipoBusqueda.toLowerCase() === 'nombre') {
        const nombre = prompt("Ingresa el nombre del producto (Mesa, Silla, Estantería, Ropero, Sillón):");
        const resultado = buscarProductoPorNombre(nombre);
        if (resultado.length > 0) {
            let listaDeProductos = `Productos encontrados:\n\n`;
            resultado.forEach(producto => {
                listaDeProductos += `${producto.nombre}:\n`;
                for (const [color, stock] of Object.entries(producto.stock)) {
                    listaDeProductos += `  COLOR: ${color} - STOCK: ${stock}\n`;
                }
            });
            alert(listaDeProductos);
        } else {
            alert("Producto no encontrado.");
        }
    } else if (tipoBusqueda.toLowerCase() === 'color') {
        const color = prompt("Ingresa el color (Abedul, Cedro, Abeto, Roble, Roble oscuro):");
        const resultado = buscarProductoPorColor(color);
        if (resultado.length > 0) {
            let listaDeProductos = `Productos con el color ${color}:\n\n`;
            resultado.forEach(producto => {

                const colorKey = Object.keys(producto.stock).find(key => key.toLowerCase() === color.toLowerCase());
                listaDeProductos += `${producto.nombre} - Stock: ${producto.stock[colorKey]}\n`;
            });
            alert(listaDeProductos);
        } else {
            alert("No se encontraron productos con ese color.");
        }
    } else if (tipoBusqueda.toLowerCase() === 'stock') {
        const minimoStock = parseInt(prompt("Ingresa el stock mínimo:"));
        const resultado = filtrarProductosPorStock(minimoStock);
        if (resultado.length > 0) {
            let listaDeProductos = `Productos con al menos ${minimoStock} en stock en algún color:\n\n`;
            resultado.forEach(producto => {
                listaDeProductos += `${producto.nombre}:\n`;
                for (const [color, stock] of Object.entries(producto.stock)) {
                    if (stock >= minimoStock) {
                        listaDeProductos += `  COLOR: ${color} - STOCK: ${stock}\n`;
                    }
                }
            });
            alert(listaDeProductos);
        } else {
            alert("No se encontraron productos con el stock mínimo requerido.");
        }
    } else {
        alert("Tipo de búsqueda inválido.");
    }
}