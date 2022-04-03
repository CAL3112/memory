const cartes = document.querySelectorAll('.box');
console.log(cartes);
cartes.onclick = retourner;
cartes.mouseover = survol;

apparition();

function apparition(){
    cartes.forEach(carte => {setTimeout(() => {
    carte.classList.add('carte');
}, 1000);}) 
}



function retourner(){
}

function survol(){
}
