
const imagengift = document.getElementsByClassName("gift")
const imagensugerencias = document.getElementsByClassName("sugerencias")
const imagentendencias = document.getElementsByClassName("tendencias")
const namegift = document.getElementsByClassName("buton")
const titlegift = document.getElementsByClassName("title")
const botonesautocomplete = document.getElementsByClassName("autocomplete")
const sectionautocomplete = document.getElementById("sugerenciasinput")
const botonessugerencias = document.getElementsByClassName("botonresult")
const sugerenciasbotones = document.getElementById("botonresultados")


const inputbuscador = document.getElementById("search")




for (let index = 0; index < imagensugerencias.length; index++) {
    const element = imagensugerencias[index];
    sugerencia()
    .then (info => {
        const url = info.images.downsized.url
        element.setAttribute ("src", url)

        const titleimage = info.title 
        titlegift[index].innerHTML=titleimage

    })
 } 

function sugerencia() {
    
    const sugerencias = fetch ("https://api.giphy.com/v1/gifs/random?api_key=O8DnmiqTOpKIYH8utBpDMqdCx7DJ77h0")
    .then ( res => res.json())
       .then ( info => {
        const url = info.data
           return url
        })
       .catch ( error => console.log (error))
           return sugerencias

}


for (let index = 0; index < imagentendencias.length; index++) {
    const element = imagentendencias[index];
    tendencia()
    .then (info => {
        const url = info[index].images.downsized.url
        element.setAttribute ("src", url)
    })
 } 

function tendencia() {
 
    const tendencias = fetch ("https://api.giphy.com/v1/gifs/trending?api_key=O8DnmiqTOpKIYH8utBpDMqdCx7DJ77h0&limit=25")
    .then ( res => res.json())
       .then ( info => {
        const url = info.data
           return url
        })
       .catch ( error => console.log (error))
           return tendencias

}

const enviar = document.getElementById("enviar")
enviar.addEventListener("click",mostrarbusqueda);

function mostrarbusqueda() {
    const aborrar = document.getElementById("default")
    const sectionbusqueda = document.getElementById("buscar")

    sectionbusqueda.style.display="block"
    aborrar.style.display="none"
    sectionautocomplete.style.display="none"

    const input = document.getElementById("search").value
    inputbuscador.value=""
    search(input)
    .then (info => {

        for (let index = 0; index < imagengift.length; index++) {
            const element = imagengift[index];
            
            const url = info[index].images.downsized.url
            element.setAttribute ("src", url)
            
        }
    })
    mostrarsugeridos(input)
}

function search(cuadro) {
    const buscar = fetch ( "https://api.giphy.com/v1/gifs/search?api_key=O8DnmiqTOpKIYH8utBpDMqdCx7DJ77h0&q=" + cuadro + "&limit=4")
    .then ( res => res.json())
    .then ( info => {
        const url = info.data
        return url
        })
    .catch ( error => console.log (error))
    return buscar
}

const input = document.getElementById("search")
input.addEventListener("input",capturar)
function capturar(e) {
    const input = e.target.value 
    if (input.length >= 1) {
        autocomplete(input)
    .then (info => {
        for (let i = 0; i < botonesautocomplete.length; i++) {
            const element = botonesautocomplete[i];
            
            const value = info[i].name 
            element.textContent = value
            element.addEventListener("click",autocompletebusqueda)
        }
    })
    sectionautocomplete.style.display="block"
    } else {
        sectionautocomplete.style.display="none"
    }
    
}

function autocomplete (input){
    const nombregift= fetch ( "https://api.giphy.com/v1/gifs/search/tags?api_key=O8DnmiqTOpKIYH8utBpDMqdCx7DJ77h0&q=" + input + "&limit=3")
    .then ( res => res.json())
    .then ( info => {
        const url = info.data
        return url
        })
    .catch ( error => console.log (error))
    return nombregift
}
function autocompletebusqueda(evento) {
    const aborrar = document.getElementById("default")
    const sectionbusqueda = document.getElementById("buscar")

    sectionbusqueda.style.display="block"
    inputbuscador.value=""
    aborrar.style.display="none"
    sectionautocomplete.style.display="none"
    const input = evento.target.textContent
    
    search(input)
    .then (info => {

        for (let index = 0; index < imagengift.length; index++) {
            const element = imagengift[index];
            
            const url = info[index].images.downsized.url
            element.setAttribute ("src", url)
            
        }
    })
}

    function searchsugerida (input){
        const nombregift= fetch ( "https://api.giphy.com/v1/tags/related/" + input + "?" + "limit=3&api_key=O8DnmiqTOpKIYH8utBpDMqdCx7DJ77h0")
        .then ( res => res.json())
        .then ( info => {
            const url = info.data
            return url
            })
        .catch ( error => console.log (error))
        return nombregift
    }

    function mostrarsugeridos (input){

        sugerenciasbotones.style.display="block"

        searchsugerida(input)
        .then (info => {
            for (let i = 0; i < botonessugerencias.length; i++) {
                const element = botonessugerencias[i];
                console.log(info)
                const value = info[i].name
                element.textContent=value 

            
            }

            
        } )
    }

    function clicsugerencia(e){
        const value=e.target.textContent
        console.log(value)
        mostrarbusqueda(value) 

        search(value)
        .then (info => {

        for (let index = 0; index < imagengift.length; index++) {
            const element = imagengift[index];
            
            const url = info[index].images.downsized.url
            element.setAttribute ("src", url)
            
        }
    })
    }
for (let i = 0; i < botonessugerencias.length; i++) {
    const element = botonessugerencias[i];
    element.addEventListener("click",clicsugerencia)
}

    