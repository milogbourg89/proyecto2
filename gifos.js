const video = document.getElementById("video")
const grabar = document.getElementById("grabar")
const stop = document.getElementById("stop")
const videosettings = { 
    type:"video",
    frameRate: 1,
    quality: 10,
    width: 825,
    height: 400,
}
const giftsettings= {
    type:"gift",
    frameRate: 1,
    quality: 10,
    width: 370,
    height: 190,
    hidden: 240,
}
let datavideo 
const videofile = document.getElementById("videofile")
let videorecorded
let giftrecorded 
let giftblob
let gifturlobj
let giftform
const comenzarcapt1 = document.getElementById("comenzarcapt1")
const pantallas = document.getElementById("pantallas")
const cancelarcapt1 = document.getElementById("cancelarcapt1")
const captura1 = document.getElementById("captura1")
const captura2 = document.getElementById("captura2")


function comenzarcaptura(e) {
    comenzar.addEventListener("click",e) 
        pantallas.style.display="block"

}

function capturar() {
    const opcionesdevideo = {
        audio: false, 
        video: {
            width: 825,
            height:400, 
        }
    }
    const stream = navigator.mediaDevices.getUserMedia(opcionesdevideo)
    .then (data => data)
    
    return stream
}

// grabar.addEventListener("click",function() {
//     mostrarcaptura()
    
//  })
stop.addEventListener("click", function() {
    videorecorded.stopRecording (function(){
        const blob = videorecorded.getBlob()
        const url = window.URL.createObjectURL(blob)
        videofile.src = url
    })
})


comenzarcapt1.addEventListener("click",capturaunoados)
const camaracaptura = document.createElement("video")
function capturaunoados(){
    captura1.style.display="none"
    captura2.style.display="block"
    
    const titulocapt2 = document.getElementById("titulocapt2")
    titulocapt2.insertAdjacentElement("afterend",camaracaptura)
    camaracaptura.setAttribute("id","video")
    capturar()
    .then (data => {
        datavideo = data 
        camaracaptura.srcObject = data
        camaracaptura.play() 
        })
}

//_______________CAPTURA DE 2 A 3 _________________________________//

const captura3 = document.getElementById("captura3")
const botoncaptura2=document.getElementById("botoncaptura2")
botoncaptura2.addEventListener("click",capturadosatres)
const captura4 = document.getElementById("captura4")

let tiempotranscurrido 

function capturadosatres() {
    captura2.style.display="none"
    captura3.style.display="block"
    
    const titulocapt3 = document.getElementById("titulocaptura3")
    titulocapt3.insertAdjacentElement("afterend",camaracaptura)
    timerObj.cronometrar()

    videorecorded = RecordRTC(datavideo, videosettings)
    giftrecorded= RecordRTC(datavideo, giftsettings)
    videorecorded.startRecording ()
    giftrecorded.startRecording ()

    stop.addEventListener("click", function() {
        tiempotranscurrido=timerObj.parar()
        timerObj.reiniciar()
        videorecorded.stopRecording (function(){
            const blob = videorecorded.getBlob()
            const url = window.URL.createObjectURL(blob)
            videofile.src = url
        })
        giftrecorded.stopRecording(function(){
        giftblob=giftrecorded.getBlob()
        gifturlobj=window.URL.createObjectURL(giftblob)
        giftform=new FormData()
        giftform.append("file",giftblob,"migifo.gift")
        })
        captura3.style.display="none"
        captura4.style.display="block"
        

    })    
}
const repetircaptura =document.getElementById("repetircaptura")
repetircaptura.addEventListener("click",volveracapturar)

function volveracapturar() {
    captura4.style.display="none"
    capturadosatres()
    timerObj.reiniciar()
}

const play=document.getElementById("play")

play.addEventListener("click",function(){
    videofile.play()
    printPreviewTime(tiempotranscurrido)
    timerProgress(tiempotranscurrido)
})

///______________________-CAPTURA 4 A 5 _____________________///
const subirguifo=document.getElementById("subirguifo")
const captura5=document.getElementById("captura5")
const captura6=document.getElementById("captura6")
subirguifo.addEventListener("click",function(){
    captura4.style.display="none"
    captura5.style.display="block"

    datavideo.getTracks().forEach(track => {
        track.stop()
    });
    subirmiguifo(giftform)
    .then(respuesta=>{
        const giftid=respuesta.data.id 
        traergiftporid(giftid)
        .then(data=>{
            const gifturl=data.data.images.original.url 
            const miguifo=document.getElementById("miguifo")
            miguifo.setAttribute("src",gifturl)
            const descargarguifo=document.getElementById("descargarguifo")
            descargarguifo.href=gifturlobj
        })
        captura5.style.display="none"
        captura6.style.display="block"

    })
})

////__________________________Llamado de migift______________////////

function traergiftporid(id){
    const font=fetch("https://api.giphy.com/v1/gifs/"+id+"?api_key=O8DnmiqTOpKIYH8utBpDMqdCx7DJ77h0")
    .then(data=>data.json())
    .catch(error=>console.log(error))
    return font 
}


//-----------------------------//cronometro//----------------------------------// 
const timerObj = {
    h : 0,
    m : 0,
    s : 0,
    inicio: 0,
    fin: 0,
    id : 0,
    
    cronometrar(){
        timerObj.id = setInterval(timerObj.escribir,1000);
        timerObj.inicio = Date.now();
    },
    
    escribir(){
        let horas, minutos, segundos;
        timerObj.s++;
        if (timerObj.s>59){timerObj.m++;timerObj.s=0;}
        if (timerObj.m>59){timerObj.h++;timerObj.m=0;}
        if (timerObj.h>24){timerObj.h=0;}
    
        if (timerObj.s<10){segundos="0"+timerObj.s;}else{segundos=timerObj.s;}
        if (timerObj.m<10){minutos="0"+timerObj.m;}else{minutos=timerObj.m;}
        if (timerObj.h<10){horas="0"+timerObj.h;}else{horas=timerObj.h;}
    
        document.getElementById("cronometrocapt3").innerHTML = `00:${horas}:${minutos}:${segundos}`; 
    },
    
    parar(){
      timerObj.fin = Date.now();
      clearInterval(timerObj.id);
      const timeDate = Math.ceil((timerObj.fin - timerObj.inicio) / 1000);
      return timeDate;
    },
    
    reiniciar(){
        document.getElementById("cronometrocapt3").innerHTML="00:00:00:00";
        timerObj.h=0;timerObj.m=0;timerObj.s=0;
    }
  }
  
 function timerProgress(time) {
    const arrSpn = document.getElementById('animacion').children;
    let counter = 0;
    const timer = (time * 1000) / arrSpn.length;
    let interval;  
    const printSpn = ()=> {
        if (counter < arrSpn.length) {
            arrSpn[counter].style.background = '#F7C9F3'
            counter++;
        } else {
            for (let i = 0; i < arrSpn.length; i++) {
                const element = arrSpn[i];
                element.style.background = '#999999';
                counter = 0;  
            }
            clearInterval(interval);  
        }
    }
    interval = setInterval(printSpn, timer);  
  }

  ///____________________animacion capt4_______________////
  
  function printPreviewTime(time) {
    let s = 0;
    let m = 0;
    let h = 0;
    let horas, minutos, segundos;
    let counter = 0;
    let idInterval;
    const printTime = () => {
      if(counter < time) {
        s++;
      if (s>59){m++;s=0;}
      if (m>59){h++;m=0;}
      if (h>24){h=0;}
    
      if (s<10){segundos="0"+s;}else{segundos=s;}
      if (m<10){minutos="0"+m;}else{minutos=m;}
      if (h<10){horas="0"+h;}else{horas=h;}
    
        document.getElementById("cronometrocapt4").innerHTML = `00:${horas}:${minutos}:${segundos}`;
        counter++;
      }
      else {
        document.getElementById("cronometrocapt4").innerHTML = `00:00:00:00 `;
        clearInterval(idInterval);
      }
    }
  
    idInterval = setInterval(printTime ,1000);
  }

///____________-subir gifo a API_________________//

let abortcontroler 

function subirmiguifo(form){
    abortcontroler=new AbortController()
    const hidder=new Headers()
    const found=fetch("https://upload.giphy.com/v1/gifs?api_key=O8DnmiqTOpKIYH8utBpDMqdCx7DJ77h0",{
        method:"POST",
        headers:hidder,
        body:form,
        mode:"no-cors",
        signal:abortcontroler.signal,
    })
    .then(data=>data.json())
    .catch(error=>alert(error))
    return found
}

