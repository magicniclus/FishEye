// Gestion des données de la page photographe

const mainPhotographeProfil = document.createElement('main')
const photographerPageBody = document.querySelector('.photographerPageIndex')
photographerPageBody.appendChild(mainPhotographeProfil);


const photographerPage = new PhotographerPage('https://magicniclus.github.io/NicolasCastera_6_06052021/Js/Data/data.json', mainPhotographeProfil)