
const zone_de_jeu = document.querySelector('.zone_de_jeu');
var nbCarteMemo = 20;

// Créer le nombre de cartes que l'on souhaite (par défaut 20)

creerDesCartes(nbCarteMemo);

function creerDesCartes(nbCarte) {
    for (let i = 0; i < nbCarte; i++) {
    let nouvelleCarte = document.createElement('div');
    nouvelleCarte.className = "carte"
    zone_de_jeu.appendChild(nouvelleCarte);
    let nouvelleCarteDos = document.createElement('div');
    nouvelleCarteDos.className = "carte-cachee"
    var cartes = document.querySelectorAll('.carte');
    cartes[i].appendChild(nouvelleCarteDos);
    let nouvelleCarteFace = document.createElement('div');
    nouvelleCarteFace.className = "carte-visible"
    cartes[i].appendChild(nouvelleCarteFace);
    
    }
}

// Ajoute un logo au dos des cartes

inserLogo();

function inserLogo() {
    var cartesCachee = document.querySelectorAll('.carte-cachee');       
    cartesCachee.forEach((carte) => {
        let logo = document.createElement('img');
        logo.className = "logo"
        logo.src = "assets/logo.svg";
        carte.appendChild(logo);
        }
    )
};

// Pour retourner les cartes au clic

var cartes = document.querySelectorAll('.carte');       
var cartes_face_cachee = document.querySelectorAll('.carte-cachee');       
var cartes_face_visible = document.querySelectorAll('.carte-visible');       
cartes.forEach((carte, indice) => {
    carte.onclick = () => {
        carte.classList.add('retourne');
    };
});
