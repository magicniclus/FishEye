class FiltreImage {
    constructor (domTarget){
        this.DOM = document.createElement('div');
        this.DOM.setAttribute('class', 'filtreBouton');
        this.render();
        domTarget.appendChild(this.DOM);
    }

    render () {
        this.selectHTML();
        this.getSelectValue();
    }

    selectHTML () {
        this.DOM.innerHTML = `
        <label for="filtre-select">Trier par</label>

        <select id="list" onchange="getSelectValue();">
            <option value="popularite">Popularité</option>
            <option value="date">Date</option>
            <option value="titre">Titre</option>
        </select>
        `
    }

    getSelectValue() {

    }

}