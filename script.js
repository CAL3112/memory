// Variables

const zone_de_jeu = document.querySelector('.zone_de_jeu');
const spanScore = document.querySelector('.score');
const spanNbCoup = document.querySelector('.nbCoup');
var nbCarteMemo = 20;
var numCarteMaxi = nbCarteMemo/2;
var nbCarteRetourneeActuellement = 0;
var nbCoupsPourTrouver = 0;
var score = 0;


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
    spanScore.innerHTML = "SCORE : "+score+"/"+numCarteMaxi;
    spanNbCoup.innerHTML = "Vous en êtes au tour : "+nbCoupsPourTrouver;    
    }
}

// Ajoute le logo au dos des cartes sur les faces cachees (.carte-cachee)

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

// Ajoute les images (de manière aléatoire) sur les faces visibles (.carte-visible)

inserImage();

function inserImage() {
    var cartesVisible = document.querySelectorAll('.carte-visible');
    
    for (let i = 0; i < cartesVisible.length; i++) {
        var image = document.createElement('img'); 
        cartesVisible[i].appendChild(image);  
        let nbRandom = Math.ceil(Math.random() * (numCarteMaxi));
        //console.log("nbRandom : "+nbRandom);
        let imagesAttribuees = document.getElementsByClassName(nbRandom);
        //console.log("imagesAttribuees.length : "+imagesAttribuees.length);
        
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


// Pour retourner les cartes au clic

var cartes = document.querySelectorAll('.carte');

cartes.forEach((carte) => {
        carte.onclick = () => {
            var cartes = document.querySelectorAll('.carte');
            console.log("cartes.length : "+cartes.length);
            if (nbCarteRetourneeActuellement < 2) {
                nbCarteRetourneeActuellement++;
                carte.classList.add('retournee');
                verification();
                //console.log("score : "+score);
                //console.log("nbCoupsPourTrouver : "+nbCoupsPourTrouver);
            }
        }
})

// Fonction qui en fonction des 2 cartes retournées, attribut ou non 1 point de score et retourne ou élimine les cartes

function verification() {
    
    let imagesCartesRetourneesActuellement = document.querySelectorAll('.retournee');

    if (nbCarteRetourneeActuellement < 2) { // permet d'attendre que 2 cartes soient retournées
        //console.log("qu'une carte retournée");
    } else if (imagesCartesRetourneesActuellement[0].childNodes[1].childNodes[0].className != imagesCartesRetourneesActuellement[1].childNodes[1].childNodes[0].className){ // cas où les 2 cartes retournées sont différentes
        nbCoupsPourTrouver++;
        spanNbCoup.innerHTML = "Vous en êtes au tour : "+nbCoupsPourTrouver;
        //console.log("les images sont différentes");
        let cartesRetournee = document.querySelectorAll('.retournee');
        
        setTimeout(() => {
                cartesRetournee.forEach((carte) => {
                carte.classList.remove('retournee');
                nbCarteRetourneeActuellement = 0;
                })
                }, 2000); //temps pour mémoriser les cartes 5s
    } else { // cas où les cartes retournées sont identiques
        nbCoupsPourTrouver++;
        //console.log("les images sont identiques");
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
            let imgVisible = document.querySelectorAll('div');
            // cartesRetournee[0].removeChild(imgVisible[1]);
            // cartesRetournee[1].removeChild(imgVisible[1]);
            })
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