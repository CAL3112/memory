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
const nomJoueur = document.querySelector('.nomJoueur');
const btnAfficheStats = document.querySelector('#stats');
const statsPseudo = document.querySelector('.stats');
const inputTextStats = document.querySelector('#pseudoStats');
const btnValiderPseudoStats = document.querySelector('#validerPseudo');
const tableauDesStats = document.querySelector('.tableauDesStats');
const cross = document.querySelector('#cross');
const logoHome = document.querySelector('.logoHome');

var nbCarteMemo = 0;
var nbCarteRetourneeActuellement = 0;
var nbTour = 0;
var score = 0;
var tpsMemorisation = 2000; // temps pour mémoriser les cartes (en ms)
var pseudos = [];
var couleursJoueurs = ['blue', 'red', 'green', 'orange']
var scores = [0, 0, 0, 0];
var numeroJoueurActuel = 0;
var NbJoueurSelected = document.querySelector('#choixNbJoueur');
var choixTheme = document.querySelector('#choixTheme');

btnJouer.onclick = () => {
    var modeDeJeu = NbJoueurSelected.options[NbJoueurSelected.selectedIndex].value;
    var theme = choixTheme.options[choixTheme.selectedIndex].value;
    zone_de_jeu.classList.remove('displayNone');
    if(theme == "couleurs") nbCarteMemo = 2;
    if(theme == "zodiaque") nbCarteMemo = 24;
    pageAccueil.classList.add('displayNone');
    choixPseudoJ1.classList.remove('displayNone');

    btnValiderJ1.onclick = () => {
        if(inputTextJ1.value.length < 3 || inputTextJ1.value.length > 20) {
            alert('Veuillez renseigner un pseudo compris entre 3 et 20 caractères')
        } else {
            pseudos.push(inputTextJ1.value)
            choixPseudoJ1.classList.add('displayNone');
            if(modeDeJeu > 1) {
                choixPseudoJ2.classList.remove('displayNone');
            } else {
                start(nbCarteMemo, modeDeJeu, theme);
            }
        }
    }
    btnValiderJ2.onclick = () => {
        if(inputTextJ2.value.length < 3 || inputTextJ2.value.length > 20) {
            alert('Veuillez renseigner un pseudo compris entre 3 et 20 caractères')
        } else {
            pseudos.push(inputTextJ2.value)
            choixPseudoJ2.classList.add('displayNone');
            if(modeDeJeu > 2) {
                choixPseudoJ3.classList.remove('displayNone');
            } else {
                start(nbCarteMemo, modeDeJeu, theme);
            }
        }
    }
    btnValiderJ3.onclick = () => {
        if(inputTextJ3.value.length < 3 || inputTextJ3.value.length > 20) {
            alert('Veuillez renseigner un pseudo compris entre 3 et 20 caractères')
        } else {
            pseudos.push(inputTextJ3.value)
            choixPseudoJ3.classList.add('displayNone');
            if(modeDeJeu > 3) {
                choixPseudoJ4.classList.remove('displayNone');
            } else {
                start(nbCarteMemo, modeDeJeu, theme);
            }
        }
    }
    btnValiderJ4.onclick = () => {
        if(inputTextJ4.value.length < 3 || inputTextJ4.value.length > 20) {
            alert('Veuillez renseigner un pseudo compris entre 3 et 20 caractères')
        } else {
            pseudos.push(inputTextJ4.value)
            choixPseudoJ4.classList.add('displayNone');
            start(nbCarteMemo, modeDeJeu, theme);
        }
    }
}

function start(nbCarteMemo, modeDeJeu, theme) {
    if(modeDeJeu > 1){
        document.body.style.backgroundColor = couleursJoueurs[numeroJoueurActuel];
        nomJoueur.classList.remove('displayNone');
        nomJoueur.innerHTML = pseudos[numeroJoueurActuel]+" à toi de jouer";
    }
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
    inserLogo();   
    inserImage(theme);
    appararition();

    // Ajoute le logo au dos des cartes sur les faces cachees (.face1)

function inserLogo() {
    var cartesCachee = document.querySelectorAll('.face1');       
    cartesCachee.forEach((carte) => {
        let logo = document.createElement('img');
        logo.className = "logo"
        logo.src = "assets/front/logoLM.svg";
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
        //console.log("nbCarteRetourneeActuellement : "+nbCarteRetourneeActuellement);
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
        if(numeroJoueurActuel < pseudos.length-1) { // on vérif que ce n'ai pas le dernier joueur qui est en train de jouer.
            numeroJoueurActuel = numeroJoueurActuel+1; //on passe au joueur suivant.
            //console.log("numeroJoueurActuel "+numeroJoueurActuel);
        } else {
            numeroJoueurActuel = 0;
        }
        setTimeout(() => {
            cartesRetournee.forEach((carte) => {
                carte.classList.remove('retournee');
                nbCarteRetourneeActuellement = 0;
                if(modeDeJeu > 1){
                    nomJoueur.innerHTML = pseudos[numeroJoueurActuel]+" à toi de jouer";
                    document.body.style.backgroundColor = couleursJoueurs[numeroJoueurActuel];
                }
            })
        }, tpsMemorisation);
    } else { // cas où les cartes retournées sont identiques
        imagesIdentiques();
    }
    var fini = score/numCarteMaxi;
    if (fini == 1) {
        finDuJeu(modeDeJeu);
    }
    }
    
}

//fonction activée quand 2 cartes retournées sont identiques
const imagesIdentiques = () => {
    nbTour++;
    score++;
    scores[numeroJoueurActuel]++
    console.log("scores : "+scores);
    
    var cartesRetournees = document.querySelectorAll('.retournee');
    setTimeout(() => {
        retirerClassRetournee(cartesRetournees);
        retirerClassCarte(cartesRetournees);    
        ajoutClassTrouvee(cartesRetournees);
        retirerChildFace1(cartesRetournees);
        //console.log("scores[numeroJoueurActuel] "+scores[numeroJoueurActuel]);
    },1500);
    nbCarteRetourneeActuellement = 0;
}
// ajoute la classe .trouvee aux cartes retournées identiques
const ajoutClassTrouvee = (cartesRetournees) => {
    cartesRetournees[0].classList.add('trouvee');
    cartesRetournees[1].classList.add('trouvee');
}
// retire la classe .retournee aux cartes retournées identiques
const retirerClassRetournee = (cartesRetournees) => {
    cartesRetournees.forEach((carte) => {
        carte.classList.remove('retournee');
    });
}
// retire la classe .carte aux cartes retournées identiques
const retirerClassCarte = (cartesRetournees) => {
    cartesRetournees.forEach((carte) => {
        carte.classList.remove('carte');
    })
}
// retire l'enfant .face1 des cartes identiques pour empêcher de pouvoir cliquer dessus à nouveau
const retirerChildFace1 = (cartesRetournees) => {
    cartesRetournees.forEach((carte) => {
        carte.removeChild(carte.firstChild);
    })
}
// fonction qui affiche les score en fin de partie et qui réinitialise le jeu lorsqu'on clique sur le bouton rejouer
const finDuJeu = (modeDeJeu) => {
    setTimeout(() => {
            numeroJoueurActuel = 0;
            document.body.style.backgroundColor = "#1c2541";
            nomJoueur.classList.add('displayNone');
            zone_de_jeu.classList.add('displayNone');
            resultat.classList.remove('displayNone');
            if(modeDeJeu <= 1) { // cas du mode 1 joueur
                votreScore.innerHTML = pseudos[0]+" tu as mis <b>"+nbTour+"</b> tours pour tout trouver.";
            } else {
                var scoreMax = 4;
                if(scores[0] > scores[1] && scores[0] > scores[2] && scores[0] > scores[3]) scoreMax = 0;
                if(scores[1] > scores[0] && scores[1] > scores[2] && scores[1] > scores[3]) scoreMax = 1;
                if(scores[2] > scores[0] && scores[2] > scores[1] && scores[2] > scores[3]) scoreMax = 2;
                if(scores[3] > scores[0] && scores[3] > scores[1] && scores[3] > scores[2]) scoreMax = 3;
            
                if(pseudos.length == 4){
                    if(scoreMax == 4) {
                        votreScore.innerHTML ="<p>Egalité ! Pas de gagnant</p><br><table><caption>Scores</caption><tbody><tr><td>"+pseudos[0]+"</td><td>"+scores[0]+"</td></tr><tr><td>"+pseudos[1]+"</td><td>"+scores[1]+"</td></tr><tr><td>"+pseudos[2]+"</td><td>"+scores[2]+"</td></tr><tr><td>"+pseudos[3]+"</td><td>"+scores[3]+"</td></tr></tbody></table>"
                    } else {
                        votreScore.innerHTML = "<p>"+pseudos[scoreMax]+", bravo tu as gagné !</p><br><table><caption>Scores</caption><tbody><tr><td>"+pseudos[0]+"</td><td>"+scores[0]+"</td></tr><tr><td>"+pseudos[1]+"</td><td>"+scores[1]+"</td></tr><tr><td>"+pseudos[2]+"</td><td>"+scores[2]+"</td></tr><tr><td>"+pseudos[3]+"</td><td>"+scores[3]+"</td></tr></tbody></table>"
                    }
                } else if(pseudos.length == 3){
                    if(scoreMax == 4) {
                        votreScore.innerHTML ="<p>Egalité ! Pas de gagnant</p><br><table><caption>Scores</caption><tbody><tr><td>"+pseudos[0]+"</td><td>"+scores[0]+"</td></tr><tr><td>"+pseudos[1]+"</td><td>"+scores[1]+"</td></tr><tr><td>"+pseudos[2]+"</td><td>"+scores[2]+"</td></tr></tbody></table>"
                    } else {
                        votreScore.innerHTML = "<p>"+pseudos[scoreMax]+", bravo tu as gagné !</p><br><table><caption>Scores</caption><tbody><tr><td>"+pseudos[0]+"</td><td>"+scores[0]+"</td></tr><tr><td>"+pseudos[1]+"</td><td>"+scores[1]+"</td></tr><tr><td>"+pseudos[2]+"</td><td>"+scores[2]+"</td></tr></tbody></table>"
                    }
                } if(pseudos.length == 2){
                    if(scoreMax == 4) {
                        votreScore.innerHTML ="<p>Egalité ! Pas de gagnant</p><br><table><caption>Scores</caption><tbody><tr><td>"+pseudos[0]+"</td><td>"+scores[0]+"</td></tr><tr><td>"+pseudos[1]+"</td><td>"+scores[1]+"</td></tr></tbody></table>"
                    } else {
                        votreScore.innerHTML = "<p>"+pseudos[scoreMax]+", bravo tu as gagné !</p><br><table><caption>Scores</caption><tbody><tr><td>"+pseudos[0]+"</td><td>"+scores[0]+"</td></tr><tr><td>"+pseudos[1]+"</td><td>"+scores[1]+"</td></tr></tbody></table>"
                    }
                }
            }
            // console.log("joueur qui a gagné : "+pseudos[scoreMax]);
            // const fs = require("fs");
            // var dataJSON = fs.readFileSync("data.json");
            // var myObject = JSON.parse(dataJSON);
            // let newData = {

            //     pseudo: pseudos[scoreMax],
            // }
            
            // myObject.push(newData);

            // var newData2 = JSON.stringify(myObject);
            // fs.writeFile("data2.json", newData2, (err) => {
            //     if(err) throw err;
            //     console.log("Data added");
            // });

            rejouer.onclick = () => {
                reset();
            }
    },2000)
}

btnAfficheStats.onclick = () => {
    statsPseudo.classList.remove('displayNone');
    pageAccueil.classList.add('displayNone');
    cross.onclick = () => {
        statsPseudo.classList.add('displayNone');
        pageAccueil.classList.remove('displayNone');
    }
    btnValiderPseudoStats.onclick = () => {
        if(inputTextStats.value.length == 0) {
            alert('Veuillez renseigner un pseudo')
        } else {
            affichageStats(inputTextStats.value);
        }
    }
}

const affichageStats = (pseudoJoueur) => {
    var li1 = document.querySelector('#li-1');
    var li2 = document.querySelector('#li-2');
    var li3 = document.querySelector('#li-3');
    var li4 = document.querySelector('#li-4');
    var li5 = document.querySelector('#li-5');
    var requestURL = 'data.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
        var data = request.response;
        for (let i = 0; i < data.length; i++) {
            if(data[i].pseudo == pseudoJoueur) {
                console.log("un pseudo du même nom existe");
                tableauDesStats.classList.remove('displayNone');
                li1.textContent = data[i].pseudo;
                li2.textContent = Math.ceil((data[i].victoires/data[i].partiesjouees)*100)+"%";
                li3.textContent = Math.floor((data[i].defaites/data[i].partiesjouees)*100)+"%";
                li4.textContent = Math.ceil((data[i].egalites/data[i].partiesjouees)*100)+"%";
                li5.textContent = data[i].partiesjouees;
            }
        }
    }
}

logoHome.onclick = () => {refresh();};


const reset = () => {
    resultat.classList.add('displayNone')
    pageAccueil.classList.remove('displayNone')
    score = 0;
    nbTour = 0;
    pseudos = [];
    scores = [0, 0, 0, 0];
    modeDeJeu = NbJoueurSelected.options[NbJoueurSelected.selectedIndex].value;
    theme = choixTheme.options[choixTheme.selectedIndex].value;
    var carte = document.querySelectorAll('.carte');
    zone_de_jeu.classList.add('displayNone');
    carte.forEach((e) => {
    zone_de_jeu.removeChild(e);
    })
}

const refresh = () => {
    location.reload();
}