const cartes = document.querySelectorAll('.carte');

console.log(cartes);

cartes.onclick = retourner;
cartes.mouseover = survol;
console.log(cartes);

function retourner(){
    cartes.forEach(carte => console.log(carte));
}

function survol(){
    cartes.classList.add('survol');
}