import config from "./config.js";
import jourSemaineOrdonne from "./Utilitaire/gestionTemps.js";

var CLEAPI = config.CLEAPI;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");

let resultatsAPI;

let jourHeure = document.querySelectorAll(".heure");
let jourTempe = document.querySelectorAll(".tempe");

let jourSemainePro = document.querySelectorAll(".jour");
let tempeSemainePro = document.querySelectorAll(".temp_semaine_pro");

const imageInfo = document.querySelector(".image_logo");
const chargement = document.querySelector(".overlay_chargement");

// console.log(jourHeure, jourTempe, jourSemainePro, tempeSemainePro);

// console.log(`${new Date(1639134000*1000).toLocaleDateString("fr-FR", {weekday: 'short'})}h`);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        AppelAPI(longitude, latitude);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer...`)
    })
}

function AppelAPI(long, lat) {

    // fetch() permet de faire une requete HTTP vers l'API 
    // fetch() est une promesse
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
        .then((reponse) => {
            return reponse.json();
        })
        .then((data) => {
            // console.log(data);
            resultatsAPI = data;

            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
            localisation.innerText = resultatsAPI.timezone;

            let heureAPI = resultatsAPI.hourly;
            let jourAPI = resultatsAPI.daily;
            let j = 0;

            // On affiche les températures toutes les 3h. //

            let heureJournee = new Date ().getHours(); // recupère l'heure actuelle

            jourHeure.forEach((elem, key) => {
                
                // recupere l'heure UNIX sur l'API
                //let heureJournee = new Date(heureAPI[j].dt * 1000).getUTCHours();
                
                // on incrémente l'heure de 3h et on ajuste les cas de 00h et quand on dépasse 24
                let heureInc = heureJournee + key * 3;

                if (heureInc > 24) {
                    elem.innerText = `${heureInc - 24} h`;                   
                } else if (heureInc === 24) {
                    elem.innerText = `00 h`;
                } else {
                    elem.innerText = `${heureInc} h`;           
                }

                //on affiche les tempé sous les heures.
                jourTempe[key].innerText = `${Math.trunc(heureAPI[j].temp)}°`;

                j += 3;
            });

            // On affiche les prévisions pour la semaine prochaine //

            jourSemainePro.forEach((elem, key) => {
                //recupère sur l'API les dates a partir du lendemain et affiche les tempés en dessous.
                // let jourSemaine = new Date(jourAPI[key + 1].dt * 1000).toLocaleDateString("fr-FR", { weekday: 'short' });

                //recupère 1er chararctere qu'on met en maj puis les 2 suivants.
                let jourCourt = `${jourSemaineOrdonne[key+1].charAt(0).toUpperCase()}${jourSemaineOrdonne[key+1].slice(1,3)}.`;

                elem.innerText = jourCourt;
                tempeSemainePro[key].innerText = `${Math.trunc(jourAPI[key + 1].temp.day)}°`;
            });

            if (heureJournee >= 6 && heureJournee < 17) {
                imageInfo.src = `./ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
                
            } else {
                imageInfo.src = `./ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
            }

            chargement.classList.add("disparition");
        })
}