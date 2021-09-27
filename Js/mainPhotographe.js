// Gestion des données de la page photographe

const mainPhotographeProfil = document.createElement('main')
const photographerPageBody = document.querySelector('.photographerPageIndex')
photographerPageBody.appendChild(mainPhotographeProfil);


const photographerPage = new PhotographerPage('https://magicniclus.github.io/FishEye/Js/Data/data.json', mainPhotographeProfil)
