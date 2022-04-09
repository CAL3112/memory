// Variables
const affichage = document.querySelector('.affichage');
const zone_de_jeu = document.querySelector('.zone_de_jeu');
const spanScore = document.querySelector('.score');
const spanNbCoup = document.querySelector('.nbCoup');
var nbCarteMemo = 20;
var numCarteMaxi = nbCarteMemo/2;
var nbCarteRetourneeActuellement = 0;
var nbCoupsPourTrouver = 0;
var score = 0;


// Créer le nombre de cartes que l'on souhaite (par défaut 20)

//lancementDuJeu(nbCarteMemo);

function lancementDuJeu(nbCarte) {
    affichage.classList.remove('hidden')
    spanScore.innerHTML = "SCORE : "+score+"/"+numCarteMaxi;
    spanNbCoup.innerHTML = "Vous en êtes au tour : "+nbCoupsPourTrouver;    

    for (let i = 0; i < nbCarte; i++) {
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
    inserLogo();   
    inserImage();
    appararition();
}

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

function inserImage() {
    var cartesVisible = document.querySelectorAll('.carte-visible');
    for (let i = 0; i < cartesVisible.length; i++) {
        var image = document.createElement('img'); 
        cartesVisible[i].appendChild(image);  
        let nbRandom = Math.ceil(Math.random() * (numCarteMaxi));
        let imagesAttribuees = document.getElementsByClassName(nbRandom);
        if (imagesAttribuees.length < 2) {
            image.className = nbRandom;                                 
            image.src = "assets/"+nbRandom+".png";
        } else {
            for (let i = 0; i < numCarteMaxi+1; i++) {
                tableauImg = document.getElementsByClassName(i);
                if (tableauImg.length < 2) {
                    imgDispo = i;
                }  
                image.className = imgDispo;                                 
                image.src = "assets/"+imgDispo+".png"; 
                //console.log(nb);          
            }
        }
    } 
}


var cartes = document.querySelectorAll('.carte');
console.log(cartes);

//animation d'appararition des cartes
function appararition() {
    for (let i = 0; i < nbCarteMemo; i++) {
        setTimeout(() => {
            cartes[i].classList.remove('hidden')
        }, 100*i);
    }
}



// Pour retourner les cartes au clic

cartes.forEach((carte) => {
    carte.onclick = () => {
    if (nbCarteRetourneeActuellement < 2 && carte.className != "trouvee carteTrouvee retournee" && carte.className != "trouvee carteTrouvee" && carte.className != "carte retournee") {
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
        spanNbCoup.innerHTML = "Vous en êtes au tour : "+nbCoupsPourTrouver;
        let cartesRetournee = document.querySelectorAll('.retournee');
        setTimeout(() => {
            cartesRetournee.forEach((carte) => {
                carte.classList.remove('retournee');
                nbCarteRetourneeActuellement = 0;
            })
        }, 3000); //temps pour mémoriser les cartes
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
            carte.classList.add('carteTrouvee');
            })
        },2020);
        setTimeout(() => {
            cartesRetournee.forEach((carte) => {
                carte.classList.remove('carte');
            })
            let imgVisible = document.querySelectorAll('div');
            imagesCartesRetourneesActuellement[0].removeChild(imagesCartesRetourneesActuellement[0].childNodes[0]);
            imagesCartesRetourneesActuellement[0].removeChild(imagesCartesRetourneesActuellement[0].childNodes[0]);
            imagesCartesRetourneesActuellement[1].removeChild(imagesCartesRetourneesActuellement[1].childNodes[0]);
            imagesCartesRetourneesActuellement[1].removeChild(imagesCartesRetourneesActuellement[1].childNodes[0]);
        },2030);
        nbCarteRetourneeActuellement = 0;
        score++;
    }
    setTimeout(() => { // maj du score
        spanScore.innerHTML = "SCORE : "+score+"/"+numCarteMaxi;
        spanNbCoup.innerHTML = "Vous en êtes au tour : "+nbCoupsPourTrouver;
        }, 2000);
}

// Function pour le débug

//retournerTout();

function retournerTout() {
    let toutesLesCartes = document.querySelectorAll('.carte');
    toutesLesCartes.forEach((anyCarte) => {
        anyCarte.classList.add('retournee');
    })
    
}