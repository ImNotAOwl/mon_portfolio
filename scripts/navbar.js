/*------------------ Variables -------------------------*/

const hamburger = document.querySelector(".hamburger");
const navMenu = document.getElementById("menu_navbar");

const navLink = document.querySelectorAll(".nav_link");

const navBar = document.getElementById("navbar");


/*------------------ Ouverture menu latéral -------------------------*/

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


/*------------- Fermeture menu latéral click lien menu --------------*/
navLink.forEach((item, index) => {
    item.addEventListener("click", function tagClose() {
        closeMenu();
    })
});


function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


/*------------- Fermeture menu latéral on scroll --------------*/

window.addEventListener("scroll", function closeMenuScroll() {
    closeMenu();
});
