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
        const div = document.createElement("div");
        div.setAttribute('class', "divIin");
        div.innerText = title + (title === this.selected ? " v" : "");
        div.className = `${title.toLocaleLowerCase()}Option`;
        div.onclick = ()=> this.click(title);
        container.appendChild(div);
    }

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