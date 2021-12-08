// Création des tags pour le header

class Tags {
    /**
     * Affichage de l'ensemble des tags et filtre des ces derniers au click grace à la fonction callBack appelé dans indexPage.js
     * grace à this.valide, si this.valide renvoie true, la fonciton callBack est appelé 
     *
     * @param   {String}  props      nom du tag
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * @param   {Function}  callback
     * 
     */
    constructor (props, domTarget, callback) {
        this.valide = false;
        this.DOM = document.createElement('button');
        domTarget.appendChild(this.DOM);
        this.DOM.innerHTML = `#${props}`;
        this.DOM.onclick = () => {
            callback(props);
            console.log(this.valide);
        this.valide = !this.valide;
        this.DOM.classList.toggle("active"); 
        };
    }
}