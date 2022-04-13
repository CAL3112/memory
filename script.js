// Variables et constantes
const resultat = document.querySelector('.resultat');
const zone_de_jeu = document.querySelector('.zone_de_jeu');
const votreScore = document.querySelector('.votreScore');
const rejouer = document.querySelector('.rejouer');
const spanScore = document.querySelector('.score');
const spanNbCoup = document.querySelector('.nbCoup');
const nbJoueur = document.querySelectorAll('.nbJoueur');
const btnJouer = document.querySelector('.btn-jouer');
const pageAccueil = document.querySelector('.page-accueil');
var nbCarteMemo = 0;
var nbCarteRetourneeActuellement = 0;
var nbTour = 0;
var score = 0;
var tpsMemorisation = 2000; // temps pour mémoriser les cartes (en ms)

const retournerTout = () => {
    let toutesLesCartes = document.querySelectorAll('.carte');
    toutesLesCartes.forEach((anyCarte) => {
        anyCarte.classList.add('retournee');
    })
}
nbJoueur.forEach((e) => {
 e.onclick = () => {
    console.log(e);
    e.classList.add('selected');
    for (let i = 0; i < nbJoueur.length; i++) {
        if (nbJoueur[i] !== e) {
            nbJoueur[i].classList.remove('selected')
        }
    } 
 }
})
btnJouer.onclick = () => {
    zone_de_jeu.classList.remove('displayNone')
    var NbJoueurSelected = document.querySelector('.selected');
    var modeDeJeu = NbJoueurSelected.id;
    var choixTheme = document.querySelector('#choixTheme');
    var theme = choixTheme.options[choixTheme.selectedIndex].value;
    if(theme == "couleurs") nbCarteMemo = 4;
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
    setTimeout(() => {
        var fini = score/numCarteMaxi;
        if (fini == 1) {
            zone_de_jeu.classList.add('displayNone')
            resultat.classList.remove('displayNone');
            votreScore.innerHTML = "Vous avez mis <b>"+nbTour+"</b> tours pour tout trouver."
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
        }    
    },1000)}
    finDuJeu(); // mettre un wait imageIdentique()
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
        var fini = score/numCarteMaxi;
        if (fini == 1) {
            zone_de_jeu.classList.add('displayNone')
            resultat.classList.remove('displayNone');
            votreScore.innerHTML = "Vous avez mis <b>"+nbTour+"</b> tours pour tout trouver."
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
        }    
    },3000)
}