//Cambiar de Iniciar sesón a Resgistro
const registro = document.querySelector(".link-registrar");
const inicar_sesion = document.querySelector(".link-iniciar-sesion");
const form_registro = document.querySelector(".registro-form");
const form_inicar_sesion = document.querySelector(".iniciar-sesion-form");

function registra(){
    form_registro.style.display="block";
    form_inicar_sesion.style.display="none";
    form_registro.style.opacity="1"
    form_inicar_sesion.style.opacity="0";
}
registro.addEventListener("click",registra);

function inicia(){
    form_registro.style.display="none";
    form_inicar_sesion.style.display="block";
    form_registro.style.opacity="0"
    form_inicar_sesion.style.opacity="1";
}
inicar_sesion.addEventListener("click", inicia);