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

  
    const resultadoDeBusqueda =document.getElementById("resultadoDeBusqueda");
    function buscarProductos (nombre){
      
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
        btnBorrar.addEventListener("click", ()=>{
             if(nombre,confirm(`seguro que quiere eliminar el producto ${nombre}`)){
                 borrarProductos(nombre)
                 guardarProductosLocalStorage()
                 resultadoDeBusqueda.innerHTML="";
                 mostrarProductosGuardados()
             }
         })

         const btnEditar = document.querySelector(".editar")
         btnEditar.addEventListener("click",()=>{
            editarProducto(nombre)
         })
        }else{
            resultadoDeBusqueda.innerHTML=`<p> producto no encontrado </p>`
        }
    }
    
         function editarProducto(nombre) {
          const producto =productos[nombre]
          const nuevoPrecioTotal = prompt(`vas a cambiar el precio`)
          const nuevoPrecioPorcion = prompt(`vas a cambiar el precio por porcion`)
          const nuevoNombre = prompt(`vas a cambiar el nombre de: ${nombre} `)
   
          const nombreFinal = nuevoNombre && nuevoNombre.trim() !== "" ? nuevoNombre : nombre;

          const precioTotalFinal = nuevoPrecioTotal > 0 ? parseFloat(nuevoPrecioTotal): producto.precioTotal

          const precioPorcionFinal = nuevoPrecioPorcion > 0 ? parseFloat(nuevoPrecioPorcion) : producto.precioPorcion;

            if (nombre!== nombreFinal){
                delete productos[nombre]
            }

  
            productos[nombreFinal] = {
                precioTotal: parseFloat(precioTotalFinal),
                precioPorcion: parseFloat(precioPorcionFinal),
            };

           guardarProductosLocalStorage()
           mostrarProductosGuardados()
        }

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
