const prenom = document.querySelector("#prenom");
const nom =document.querySelector("#nom");
const email = document.querySelector("#mail");
const message = document.querySelector("#message");


/*-----------------------Animation Formulaire------------------------ */
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

const sections = document.querySelectorAll("section");
console.log(sections);

const navLi = document.querySelectorAll("nav ul#menu_navbar li");
console.log(navLi);



 


    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - sectionHeight / sections.length) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach( li => {
            li.classList.remove("active");
            if (li.classList.contains(current)) {
                li.classList.add("active");
            }
        });
    });