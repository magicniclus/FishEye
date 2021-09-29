//Gestion des données de la page index

//Body Index

const main = document.createElement('main');
const indexBody = document.querySelector(".bodyIndex");
indexBody.appendChild(main);

const indexPage = new IndexPage('https://magicniclus.github.io/FishEye/Js/Data/data.json', main);