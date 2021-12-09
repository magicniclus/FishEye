//Création d'un bouton de filtre d'image 

class FilterImage {

    /**
     * Création du bouton de filtre des images
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * @param   {Object}  props      [props description]
     * @param   {Function}  callBack   [callBack description]
     *
     */
    constructor (domTarget, props, callBack){
        this.DOM = document.createElement('span');
        this.DOM.setAttribute('class', 'filtreBouton');
        this.callBack = callBack;
        this.data = props;
        this.selected = this.data[0];
        this.showList = false;
        this.render();
        domTarget.appendChild(this.DOM);
    }


    /**
     * Gestion de l'affichage
     *
     */
    async render () {
        this.DOM.innerHTML = "<label for=\"filtre-select\">Trier par</label>";
        const select = document.createElement("button");
        select.setAttribute('class', 'divIn');
        this.DOM.appendChild(select);
        this.addArrow(select);
        this.makeOptions(select);
    }


    /**
     * affichage ou non de l'ensemble de titres
     *
     * @param   {HTMLElement}  container  [container description]
     *
     * @return  {Array}             [return description]
     */
    makeOptions(container){
        if (!this.showList) {
            this.makeOption(container, this.selected);
            return;
        }
        this.data.forEach(option => {
            this.makeOption(container, option);
        });
    }


    /**
     * Gestion du titre initial et de la fleche de direction du boutton
     *
     * @param   {HTMLElement}  container  [container description]
     * @param   {Object}  title
     */
    makeOption(container, title){
        const makeOption = document.createElement("div");
        makeOption.setAttribute('class', "option");
        makeOption.innerText = title ;
        makeOption.className = `${title.toLocaleLowerCase()}Option`;
        makeOption.onclick = ()=> this.click(title);
        container.appendChild(makeOption);
    }


    /**
     * gestion du sens de la fleche 
     *
     */
    addArrow (parent){
        parent.innerHTML = `<i class="fas fa-angle-${this.showList ? 'up' : "down"}"></i>`;
    }


    /**
     * gestion de l'appel du callback au click sur un des titre 
     *
     * @param   {Boolean}  selected  [selected description]
     *
     * @return  {void}            [return description]
     */
    click(selected){
        this.showList = !this.showList;
        if (this.showList) {
            this.render();
            return;
        }
        this.selected = selected;
        this.callBack(selected);
        this.render();
    }
}