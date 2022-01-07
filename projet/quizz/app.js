let boxQst = document.querySelectorAll(".box_qst");
let btnEnvoie = document.getElementById("btn_envoyer");
let btnRadio = document.querySelectorAll('input[type="radio"]');

let divResultat = document.querySelector(".resultat");

let listeResultat = ['napoleon', 'juillet', '395', 'ljubljana', '4m'];

let noteAffiche = document.getElementById("note");
let aideAffiche = document.getElementById("aide");

btnEnvoie.addEventListener('click', verif);

let reponse = [];
let i = 0;

btnRadio.forEach((elem, key) => {
    if (elem.checked === true) {
        reponse[i] = elem.value;
        i++;
    }
})

boxQst.forEach((elem, key) => {
    elem.addEventListener("change", function (e) {
        let item = e.target.value;

        reponse[key] = item;
        boxQst[key].style.background = 'white';
        boxQst[key].style.background = 'white';
    })
})

function verif() {
    let totalCorrect = 0;

    reponse.forEach((elem, i) => {
        if (elem === listeResultat[i]) {
            totalCorrect++;
            boxQst[i].style.background = 'rgba(27, 236, 55, 0.527)';

        } else {
            boxQst[i].style.background = 'rgba(255, 0, 0, 0.356)';
            boxQst[i].classList.add("false");
        }

        setTimeout(() => {
            boxQst[i].classList.remove("false");
        }, 500);
    });
    
    afficheResultat(totalCorrect);
    supprClassList ();
}


function afficheResultat (nbBonneReponse) {
    let titreResultat = document.querySelector(".resultat").children[0];

    switch (nbBonneReponse) {
        case 0:
            aideAffiche.innerText = "Retentez une autre réponse dans la case rouge, puis re-validez !";
            titreResultat.innerText = "👎 Peux mieux faire ! 👎";
            break;
        case 1:
            aideAffiche.innerText = "Retentez une autre réponse dans la case rouge, puis re-validez !";
            titreResultat.innerText = "😭 Peux mieux faire ! 😭";
            break;
        case 2:
            aideAffiche.innerText = "Retentez une autre réponse dans la case rouge, puis re-validez !";
            titreResultat.innerText = "👀 Il reste quelques erreurs. 😭";
            break;
        case 3:
            aideAffiche.innerText = "Retentez une autre réponse dans la case rouge, puis re-validez !";
            titreResultat.innerText = "✨ Encore un effort ... 👀";
            break;
        case 4:
            aideAffiche.innerText = "Retentez une autre réponse dans la case rouge, puis re-validez !";
            titreResultat.innerText = "✨ Vous y êtes presque ! ✨";
            break;
        default:
            titreResultat.innerText = "✔️ Bravo, c'est un sans faute ! ✔️";
            
            boxQst.forEach((elem) => {
                elem.classList.toggle("tout_juste");
            })

            divResultat.classList.toggle("tout_juste");

            aideAffiche.innerText = "";
            break;
    }
    noteAffiche.innerText = `${nbBonneReponse}/5`;
}

function supprClassList () {
    divResultat.addEventListener("animationend", function () {
        divResultat.classList.remove("tout_juste");

        boxQst.forEach((elem) => {
            elem.classList.remove("tout_juste");
        })
    })
}
