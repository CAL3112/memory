// Variables
const resultat = document.querySelector('.resultat');
const zone_de_jeu = document.querySelector('.zone_de_jeu');
const votreScore = document.querySelector('.votreScore');
const rejouer = document.querySelector('.rejouer');
const spanScore = document.querySelector('.score');
const spanNbCoup = document.querySelector('.nbCoup');
const nbJoueur = document.querySelectorAll('.nbJoueur');
const btnJouer = document.querySelector('.btn-jouer');
const pageAccueil = document.querySelector('.page-accueil');
var nbCarteMemo;
var nbCarteRetourneeActuellement = 0;
var nbCoupsPourTrouver = 0;
var score = 0;
var tpsMemorisation = 2000; // temps pour mémoriser les cartes (en ms)

retournerTout(); // Function pour le débug

function retournerTout() {
    let toutesLesCartes = document.querySelectorAll('.carte');
    toutesLesCartes.forEach((anyCarte) => {
        anyCarte.classList.add('retournee');
    })
}
nbJoueur[0].onclick = () => {
    nbJoueur[0].classList.add('selected')
    nbJoueur[1].classList.remove('selected')
    nbJoueur[2].classList.remove('selected')
    nbJoueur[3].classList.remove('selected')
}
nbJoueur[1].onclick = () => {
    nbJoueur[1].classList.add('selected')
    nbJoueur[0].classList.remove('selected')
    nbJoueur[2].classList.remove('selected')
    nbJoueur[3].classList.remove('selected')
}
nbJoueur[2].onclick = () => {
    nbJoueur[2].classList.add('selected')
    nbJoueur[0].classList.remove('selected')
    nbJoueur[1].classList.remove('selected')
    nbJoueur[3].classList.remove('selected')
}
nbJoueur[3].onclick = () => {
    nbJoueur[3].classList.add('selected')
    nbJoueur[0].classList.remove('selected')
    nbJoueur[1].classList.remove('selected')
    nbJoueur[2].classList.remove('selected')
}
btnJouer.onclick = () => {
    zone_de_jeu.classList.remove('displayNone')
    var NbJoueurSelected = document.querySelector('.selected');
    var modeDeJeu = NbJoueurSelected.id;
    var choixTheme = document.querySelector('#choixTheme');
    var theme = choixTheme.options[choixTheme.selectedIndex].value;
    if(theme == "couleurs") nbCarteMemo = 24;
    if(theme == "zodiaque") nbCarteMemo = 24;
    pageAccueil.classList.add('displayNone');
    start(nbCarteMemo, modeDeJeu, theme);
    
}
function start(nbCarteMemo, mode, theme) {
    var numCarteMaxi = nbCarteMemo/2;
    for (let i = 0; i < nbCarteMemo; i++) {
        let nouvelleCarte = document.createElement('div');
        nouvelleCarte.className = "carte hidden";
        zone_de_jeu.appendChild(nouvelleCarte);
        let nouvelleCarteDos = document.createElement('div');
        nouvelleCarteDos.className = "carte-cachee"
        var cartes = document.querySelectorAll('.carte');
        cartes[i].appendChild(nouvelleCarteDos);
        let nouvelleCarteFace = document.createElement('div');
        nouvelleCarteFace.className = "carte-visible";
        cartes[i].appendChild(nouvelleCarteFace);
    }
    //inserLogo();   
    inserImage(theme);
    appararition();

    // Ajoute le logo au dos des cartes sur les faces cachees (.carte-cachee)

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

// Ajoute les images (de manière aléatoire) sur les faces visibles (.carte-visible)

function inserImage(theme) {
    var cartesVisible = document.querySelectorAll('.carte-visible');
    for (let i = 0; i < cartesVisible.length; i++) {
        var image = document.createElement('img'); 
        cartesVisible[i].appendChild(image);  
        let nbRandom = Math.ceil(Math.random() * (numCarteMaxi));
        let imagesAttribuees = document.getElementsByClassName(nbRandom);
        if (imagesAttribuees.length < 2) {
            image.className = nbRandom;                                 
            image.src = "assets/"+theme+"/"+nbRandom+".svg";
        } else {
            for (let i = 0; i < numCarteMaxi+1; i++) {
                tableauImg = document.getElementsByClassName(i);
                if (tableauImg.length < 2) {
                    imgDispo = i;
                }  
                image.className = imgDispo;                                 
                image.src = "assets/"+theme+"/"+imgDispo+".svg"; 
                //console.log(nb);          
            }
        }
    } 
}

//animation d'appararition des cartes
function appararition() {
    for (let i = 0; i < nbCarteMemo; i++) {
        setTimeout(() => {
            cartes[i].classList.remove('hidden')
        }, 100*i);//
    }
}

// Pour retourner les cartes au clic

cartes.forEach((carte) => {
    carte.onclick = () => {
    if (nbCarteRetourneeActuellement < 2 && carte.className != "trouvee" && carte.className != "carte retournee") { //pour ne pas autoriser la fct verification des cartes déjà trouvées et déja retournées (erreur de vérif des classes des enfants)
        nbCarteRetourneeActuellement++;
        carte.classList.add('retournee');
        verification();
    }
    }
})

// Fonction qui en fonction des 2 cartes retournées, attribut ou non 1 point de score et retourne ou élimine les cartes

function verification() {
    let imagesCartesRetourneesActuellement = document.querySelectorAll('.retournee');
    if (nbCarteRetourneeActuellement < 2) { // permet d'attendre que 2 cartes soient retournées
    } else if (imagesCartesRetourneesActuellement[0].childNodes[1].childNodes[0].className != imagesCartesRetourneesActuellement[1].childNodes[1].childNodes[0].className){ // cas où les 2 cartes retournées sont différentes
        nbCoupsPourTrouver++;
        let cartesRetournee = document.querySelectorAll('.retournee');
        setTimeout(() => {
            cartesRetournee.forEach((carte) => {
                carte.classList.remove('retournee');
                nbCarteRetourneeActuellement = 0;
            })
        }, tpsMemorisation);
    } else { // cas où les cartes retournées sont identiques
        nbCoupsPourTrouver++;
        let cartesRetournee = document.querySelectorAll('.retournee');
        setTimeout(() => {
            imagesCartesRetourneesActuellement[0].classList.add('trouvee');
            imagesCartesRetourneesActuellement[1].classList.add('trouvee');
            }, 2000);
        setTimeout(() => {
            cartesRetournee.forEach((carte) => {
            carte.classList.remove('retournee');
            })
        },2010);
        setTimeout(() => {
            cartesRetournee.forEach((carte) => {
                carte.classList.remove('carte');
            })
            let imgVisible = document.querySelectorAll('div');
            imagesCartesRetourneesActuellement[0].removeChild(imagesCartesRetourneesActuellement[0].childNodes[0]);
            imagesCartesRetourneesActuellement[0].removeChild(imagesCartesRetourneesActuellement[0].childNodes[0]);
            imagesCartesRetourneesActuellement[1].removeChild(imagesCartesRetourneesActuellement[1].childNodes[0]);
            imagesCartesRetourneesActuellement[1].removeChild(imagesCartesRetourneesActuellement[1].childNodes[0]);
            nbCarteRetourneeActuellement = 0;
        },2020);
        score++;
    }
    setTimeout(() => {
        var fini = score/numCarteMaxi;
        if (fini == 1) {
            zone_de_jeu.classList.add('displayNone')
            resultat.classList.remove('displayNone');
            votreScore.innerHTML = "Vous avez mis <b>"+nbCoupsPourTrouver+"</b> tours pour tout trouver."
            rejouer.onclick = () => {
                resultat.classList.add('displayNone')
                pageAccueil.classList.remove('displayNone')
                score = 0;
                nbCoupsPourTrouver = 0;
                var trouvee = document.querySelectorAll('.trouvee');
                trouvee.forEach((e) => {
                    zone_de_jeu.removeChild(e);
                })
            }
        }    
    },2900)}
}