const productos = cargarLocalProduct()

function cargarLocalProduct(){
    const productosGuardados = localStorage.getItem("productos")
 
    return productosGuardados ? JSON.parse(productosGuardados) :{};
   
}

function guardarProductosLocalStorage(){
    localStorage.setItem("productos",JSON.stringify(productos))
}


function agregarProducto(nombre,precio,precioPorPorcion){
    if(!productos[nombre]){
        productos[nombre]={
            precioTotal: precio,
            precioPorcion: precioPorPorcion
        };
    guardarProductosLocalStorage()
    alert(`agregado ${nombre} de  $${precio}`)
    mostrarProductosGuardados()
    }else{
        alert(`El producto ${nombre} ya existe `)
    }
}
const nuevoProducto = document.getElementById("agregaProducto")
nuevoProducto.addEventListener("submit", (event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value
    const preci = document.getElementById("preci").value
    const precioPorPorcion= document.getElementById("precioPorcion").value;

    if(name && preci>0){
        agregarProducto(name,preci,precioPorPorcion)
        document.getElementById("agregaProducto").reset()
        console.log("producto agregado ")
    }else{
        alert("introduce nombre y precio ")
    }
})

    function borrarProductos(nombre){
        if(productos[nombre]){
            delete productos[nombre];
        }
    }

  

    function buscarProductos (nombre){
        const resultadoDeBusqueda =document.getElementById("resultadoDeBusqueda");
        if(productos[nombre]){
            const producto =productos[nombre]
          
        resultadoDeBusqueda.innerHTML = 
     `  <p>
        producto encontrado: ${nombre}<br>
        precio$ ${producto.precioTotal}<br>
        precio por porcion $${producto.precioPorcion}
        </p> 
        <button class="borrar">borrar</button>
        <button class="editar"> editar</button>`;
        
        const btnBorrar = document.querySelector(".borrar")
        btnBorrar.addEventListener("click", (event)=>{
             event.preventDefault();
        //  const nombre = document.getElementById("buscarNombre").value
             if(nombre,confirm(`seguro que quiere eliminar el producto ${nombre}`)){
                
                 borrarProductos(nombre)
                 guardarProductosLocalStorage()
                 resultadoDeBusqueda.innerHTML="";
                 mostrarProductosGuardados()
             }
         })

        }else{
            resultadoDeBusqueda.innerHTML=`<p> producto no encontrado </p>`
        }
    }
    
    // function editarProducto {}

    const buscarProducto = document.getElementById("buscarProducto")
    buscarProducto.addEventListener("click", (event)=>{
        event.preventDefault();
        const nombre = document.getElementById("buscarNombre").value
        if(nombre){
            buscarProductos(nombre)
            buscarProducto.reset()
        }
    })

    const listaDeProductos = document.getElementById("listaDeProductos")

    function mostrarProductosGuardados(){

        listaDeProductos.innerHTML="";
        if (Object.keys(productos).length===0){
            listaDeProductos.innerHTML=`<p>no hay productos en la lista</p>`;
            return;
        }
         const lista = document.createElement("ul");
         lista.classList.add("lista")
         for(const[nombre,precio] of Object.entries(productos)){
             const item = document.createElement("li");
             const producto =productos[nombre]
            item.textContent = `${nombre} $${producto.precioTotal}`;
             lista.appendChild(item)
         }
         listaDeProductos.appendChild(lista)
    }
    mostrarProductosGuardados()

function guardarCambios(index){
    const nombre = document.getElementById(`nombre-${index}`).value
    const precio = parseFloat(document.getElementById(`precio-${index}`).value)

    if(productos[index]){
        productos[index].nombre = nombre 
        productos[index].precio = precio

        guardarProductosLocalStorage()
        alert(`producto ${nombre} actualizado`)

    }else{
        alert("producto no encontrado ")
    }
}



// const divProducto = document.createElement("div");
// Object.entries(productos).forEach((producto, index)=>{
//     divProducto.innerHTML=`
//     <labe>nombre:<input type="text" value="${producto.nombre}" id="nombre-${index}"/></label><br>
//     <labe>precio:<input type="number" value="${producto.precioTotal}" id="precio-${index}"/></label>
//     <button onclick="guardarCambios(${index })">guardar</button>
//     `
// })

// listaDeProductos.appendChild(divProducto)