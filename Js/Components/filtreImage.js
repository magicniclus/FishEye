//Création d'un bouton de filtre d'image 

class FilterImage {

    /**
     * [constructor description]
     *
     * @param   {[type]}  domTarget  [domTarget description]
     * @param   {[type]}  props      [props description]
     * @param   {[type]}  callBack   [callBack description]
     *
     * @return  {[type]}             [return description]
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
     * [render description]
     *
     */
    async render () {
        this.DOM.innerHTML = "<label for=\"filtre-select\">Trier par</label>";
        const select = document.createElement("div");
        select.setAttribute('class', 'divIn');
        this.DOM.appendChild(select);
        this.addArrow(select);
        this.makeOptions(select);
    }


    /**
     * [makeOptions description]
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


    /**
     * [addArrow description]
     *
     * @param   {HMTLElement}  parent  [parent description]
     *
     * @return  {HTMLElement}          [return description]
     */
    addArrow (parent){
        parent.innerHTML = `<i class="fas fa-angle-${this.showList ? 'up' : "down"}"></i>`;
    }


    /**
     * [click description]
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