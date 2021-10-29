class FilterImage {
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

    async render () {
        this.DOM.innerHTML = "<label for=\"filtre-select\">Trier par</label>";
        const select = document.createElement("div");
        select.setAttribute('class', 'divIn');
        this.DOM.appendChild(select);
        this.addArrow(select);
        this.makeOptions(select);
    }

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
     * [makeOption description]
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

    addArrow (parent){
        parent.innerHTML = `<i class="fas fa-angle-${this.showList ? 'up' : "down"}"></i>`;
    }

    click(selected){
        this.showList = !this.showList;
        if (this.showList) {
            this.render();
            return;
        }
        this.selected = selected;
        console.log("choisi : ",this.selected);
        this.callBack(selected); //BUG Problème d'affichage des élémnete dans le bouton 
        this.render();
    }
}