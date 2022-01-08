const prenom = document.querySelector("#prenom");
const nom =document.querySelector("#nom");
const email = document.querySelector("#mail");
const message = document.querySelector("#message");

const addActiveInput = (e) => {
    if (e.target.value != "") {
        e.target.parentNode.classList.add("active_input");     
    } else if(e.target.value === ""){
        e.target.parentNode.classList.remove("active_input");     
    }
}

prenom.addEventListener('input', (e) => {
    addActiveInput(e);
});

nom.addEventListener('input', (e) => {
    addActiveInput(e);
});

email.addEventListener('input', (e) => {
    addActiveInput(e);
});

message.addEventListener('input', (e) => {
    addActiveInput(e);
});