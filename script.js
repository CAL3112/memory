
const zone_de_jeu = document.querySelector('.zone_de_jeu');

creerLesCartes();

function creerLesCartes () {
    console.log("je suis censé créer les cartes");
    var nouvelleCarte = document.createElement('div', class="carte");
    var insererLogo = document.createElement('img');
    insererLogo.src = "assets/logo.svg"
          

    for (let i = 0; i < 20; i++) {
        zone_de_jeu.append(nouvelleCarte);
        nouvelleCarte.classList.add('carte');
        console.log(i);
    }
}