// Variables et constantes
const resultat = document.querySelector('.resultat');
const zone_de_jeu = document.querySelector('.zone_de_jeu');
const votreScore = document.querySelector('.votreScore');
const rejouer = document.querySelector('.rejouer');
const btnJouer = document.querySelector('.btn-jouer');
const pageAccueil = document.querySelector('.page-accueil');
const btnValiderJ1 = document.querySelector('#validerJ1');
const btnValiderJ2 = document.querySelector('#validerJ2');
const btnValiderJ3 = document.querySelector('#validerJ3');
const btnValiderJ4 = document.querySelector('#validerJ4');
const inputTextJ1 = document.querySelector('#pseudoJ1');
const inputTextJ2 = document.querySelector('#pseudoJ2');
const inputTextJ3 = document.querySelector('#pseudoJ3');
const inputTextJ4 = document.querySelector('#pseudoJ4');
const choixPseudoJ1 = document.querySelector('.joueur1');
const choixPseudoJ2 = document.querySelector('.joueur2');
const choixPseudoJ3 = document.querySelector('.joueur3');
const choixPseudoJ4 = document.querySelector('.joueur4');

var nbCarteMemo = 0;
var nbCarteRetourneeActuellement = 0;
var nbTour = 0;
var score = 0;
var tpsMemorisation = 2000; // temps pour mémoriser les cartes (en ms)
var pseudoJoueur1 = "";
var pseudoJoueur2 = "";
var pseudoJoueur3 = "";
var pseudoJoueur4 = "";
var NbJoueurSelected = document.querySelector('#choixNbJoueur');
var choixTheme = document.querySelector('#choixTheme');


const retournerTout = () => {
    let toutesLesCartes = document.querySelectorAll('.carte');
    toutesLesCartes.forEach((anyCarte) => {
        anyCarte.classList.add('retournee');
    })
}

btnJouer.onclick = () => {
    var modeDeJeu = NbJoueurSelected.options[NbJoueurSelected.selectedIndex].value;
    var theme = choixTheme.options[choixTheme.selectedIndex].value;
    zone_de_jeu.classList.remove('displayNone')
    if(theme == "couleurs") nbCarteMemo = 24;
    if(theme == "zodiaque") nbCarteMemo = 24;
    pageAccueil.classList.add('displayNone');
    choixPseudoJ1.classList.remove('displayNone');

    btnValiderJ1.onclick = () => {
        console.log(inputTextJ1.value);
        pseudoJoueur1 = inputTextJ1.value;
        choixPseudoJ1.classList.add('displayNone');
        if(modeDeJeu > 1) {
            choixPseudoJ2.classList.remove('displayNone');
        } else {
            start(nbCarteMemo, modeDeJeu, theme);
        }
    }
    btnValiderJ2.onclick = () => {
        console.log(inputTextJ2.value);
        pseudoJoueur2 = inputTextJ2.value;
        choixPseudoJ2.classList.add('displayNone');
        if(modeDeJeu > 2) {
            choixPseudoJ3.classList.remove('displayNone');
        } else {
            start(nbCarteMemo, modeDeJeu, theme);
        }
    }
    btnValiderJ3.onclick = () => {
        console.log(inputTextJ3.value);
        pseudoJoueur3 = inputTextJ3.value;
        choixPseudoJ3.classList.add('displayNone');
        if(modeDeJeu > 3) {
            choixPseudoJ4.classList.remove('displayNone');
        } else {
            start(nbCarteMemo, modeDeJeu, theme);
        }
    }
    btnValiderJ4.onclick = () => {
        console.log(inputTextJ4.value);
        pseudoJoueur4 = inputTextJ4.value;
        choixPseudoJ4.classList.add('displayNone');
        start(nbCarteMemo, modeDeJeu, theme);
    }
}



function start(nbCarteMemo, modeDeJeu, theme) {
    var numCarteMaxi = nbCarteMemo/2;
    for (let i = 0; i < nbCarteMemo; i++) {
        let nouvelleCarte = document.createElement('div');
        nouvelleCarte.className = "carte hidden";
        zone_de_jeu.appendChild(nouvelleCarte);
        let nouvelleCarteDos = document.createElement('div');
        nouvelleCarteDos.className = "face1"
        var cartes = document.querySelectorAll('.carte');
        cartes[i].appendChild(nouvelleCarteDos);
        let nouvelleCarteFace = document.createElement('div');
        nouvelleCarteFace.className = "face2";
        cartes[i].appendChild(nouvelleCarteFace);
    }
    //inserLogo();   
    inserImage(theme);
    appararition();

    // Ajoute le logo au dos des cartes sur les faces cachees (.face1)

function inserLogo() {
    var cartesCachee = document.querySelectorAll('.face1');       
    cartesCachee.forEach((carte) => {
        let logo = document.createElement('img');
        logo.className = "logo"
        logo.src = "assets/logo.svg";
        carte.appendChild(logo);
        }
    )
};

// Ajoute les images (de manière aléatoire) sur les faces visibles (.face2)

function inserImage(theme) {
    var cartesVisible = document.querySelectorAll('.face2');
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
        console.log("nbCarteRetourneeActuellement : "+nbCarteRetourneeActuellement);
    }
    }
})

// Fonction qui en fonction des 2 cartes retournées, attribut ou non 1 point de score et retourne ou élimine les cartes

function verification() {
    var cartesRetournees = document.querySelectorAll('.retournee');
    if (nbCarteRetourneeActuellement < 2) { // permet d'attendre que 2 cartes soient retournées
    } else if (cartesRetournees[0].childNodes[1].childNodes[0].className != cartesRetournees[1].childNodes[1].childNodes[0].className){ // cas où les 2 cartes retournées sont différentes
        nbTour++;
        let cartesRetournee = document.querySelectorAll('.retournee');
        setTimeout(() => {
            cartesRetournee.forEach((carte) => {
                carte.classList.remove('retournee');
                nbCarteRetourneeActuellement = 0;
            })
        }, tpsMemorisation);
    } else { // cas où les cartes retournées sont identiques
        nbTour++;
        imagesIdentiques();
        nbCarteRetourneeActuellement = 0;
        score++;
        console.log("score : "+score);
    }
    var fini = score/numCarteMaxi;
    console.log("fini : "+fini);
    if (fini == 1) {
        finDuJeu();
    }
    }
    
}

const imagesIdentiques = () => {
    var cartesRetournees = document.querySelectorAll('.retournee');
    setTimeout(() => {
        retirerClassRetournee(cartesRetournees);
        retirerClassCarte(cartesRetournees);    
        ajoutClassTrouvee(cartesRetournees);
        retirerChildFace1(cartesRetournees);
    },1500);
    nbCarteRetourneeActuellement = 0;
}

const ajoutClassTrouvee = (cartesRetournees) => {
    cartesRetournees[0].classList.add('trouvee');
    cartesRetournees[1].classList.add('trouvee');
}

const retirerClassRetournee = (cartesRetournees) => {
    cartesRetournees.forEach((carte) => {
        carte.classList.remove('retournee');
    });
}
const retirerClassCarte = (cartesRetournees) => {
    cartesRetournees.forEach((carte) => {
        carte.classList.remove('carte');
    })
}
const retirerChildFace1 = (cartesRetournees) => {
    cartesRetournees.forEach((carte) => {
        carte.removeChild(carte.firstChild);
    })
}
const finDuJeu = () => {
    setTimeout(() => {
            zone_de_jeu.classList.add('displayNone')
            resultat.classList.remove('displayNone');
            votreScore.innerHTML = pseudoJoueur1+" tu as mis <b>"+nbTour+"</b> tours pour tout trouver."
            rejouer.onclick = () => {
                resultat.classList.add('displayNone')
                pageAccueil.classList.remove('displayNone')
                score = 0;
                nbTour = 0;
                var trouvee = document.querySelectorAll('.trouvee');
                trouvee.forEach((e) => {
                    zone_de_jeu.removeChild(e);
                })
            }
    },2000)
}