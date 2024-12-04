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
            alert(`el producto" ${nombre} "a sido eliminado`)
        }else{
            alert(`el producto "${nombre}"no se encontro`)
        }
    }
   
    const borrarProducto = document.querySelector("#borrarProducto")
     borrarProducto.addEventListener("submit", (event)=>{
        event.preventDefault();
        const nombre = document.getElementById("borrarNombre").value
        if(nombre){
            borrarProductos(nombre)
            guardarProductosLocalStorage()
           borrarProducto.reset()
        }else {
            alert("introduce un nombre valido")
    }
    })

    function buscarProductos (nombre){
        const resultadoDeBusqueda =document.getElementById("resultadoDeBusqueda");
        resultadoDeBusqueda.innerHTML="";
        if(productos[nombre]){
            const producto =productos[nombre]
          
        resultadoDeBusqueda.innerHTML = `<p> producto encontrado: ${nombre}<br> precio$ ${producto.precioTotal}<br> precio por porcion $${producto.precioPorcion}</p>`
        }else{
            resultadoDeBusqueda.innerHTML=`<p> producto no encontrado </p>`
        }
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


    function mostrarProductosGuardados(){
        const listaDeProductos = document.getElementById("listaDeProductos")
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

   const mostrarProductos= document.getElementById("mostrarProductos")
   mostrarProductos.addEventListener("click",mostrarProductosGuardados) 