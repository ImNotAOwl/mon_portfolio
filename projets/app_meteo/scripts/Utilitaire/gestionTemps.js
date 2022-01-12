const jourSemaine = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

let dateActuelle = new Date ();
let options = { weekday: 'long' };
let jourAjd = dateActuelle.toLocaleDateString("fr-FR", options);
let indexJour = jourSemaine.indexOf(jourAjd);

let jourSemaineOrdonne = [];

jourSemaineOrdonne = jourSemaine.splice(indexJour, jourSemaine.length);

jourSemaine.splice(0, indexJour).forEach((elem) => {
    jourSemaineOrdonne.push(elem);
});

jourSemaineOrdonne.push(jourSemaineOrdonne[0]);

// console.log(jourSemaineOrdonne);

export default jourSemaineOrdonne;

