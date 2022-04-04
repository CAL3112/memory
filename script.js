
const zone_de_jeu = document.querySelector('.zone_de_jeu');
var nbCarteRetournee = 0;
var nbCarteMemo = 20;

creerDesCartes(nbCarteMemo);

function creerDesCartes(nbCarte) {
    for (let i = 0; i < nbCarte; i++) {
    let nouvelleCarte = document.createElement('div');
    nouvelleCarte.className = "carte"
    zone_de_jeu.appendChild(nouvelleCarte);
    }
}

inserLogo();

function inserLogo() {
var cartes = document.querySelectorAll('.carte');       
cartes.forEach((carte) => {
    let logo = document.createElement('img');
    logo.className = "logo"
    logo.src = "assets/logo.svg";
    carte.appendChild(logo);
})

}

var cartes = document.querySelectorAll('.carte');       
cartes.forEach((carte, indice) => {
    carte.onclick = retourne(indice);
})

function retourne(carte) {
    console.log('retourne');
        carte.classList.add('retourne');
        nbCarteRetournee++;
        console.log("nbCarteRetournee : "+nbCarteRetournee);
        
};