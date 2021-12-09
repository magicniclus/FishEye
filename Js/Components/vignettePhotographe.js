// Création de vignette photographer pour la page index

class VignettePhotographer {

    /**
     * [constructor description]
     *
     * @param   {Object}  props      [props description]
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     */
    constructor (props, domTarget) {
        this.DOM = document.createElement('div');
        this.DOM.setAttribute('class', 'vignette');
        domTarget.appendChild(this.DOM);

        this.image      = props.portrait;
        this.name       = props.name;
        this.city       = props.city;
        this.country    = props.country;
        this.comments   = props.tagline;
        this.price      = props.price;
        this.tags       = props.tags;
        this.id         = props.id;
        this.description = props.descritpion;
        this.render();
    }

    /**
     * Gestion de l'affichage des elements
     *
     */
    render () {
        this.showVignette();
        this.showTags();
    }


    /**
     * Création du HTML à retourner dans le DOM
     *
     * @return  {ReturnType}  [return description]
     */
    showVignette () {
        return this.DOM.innerHTML =`
        <a href="./photographerPage.html?id=${this.id}" class="newVignette">
            <img src='Sample_Photos/Photographers ID Photos/${this.image}' alt="${this.description}">
            <span class="title">${this.name}</span>
        </a>    
        <span class="city">${this.city}, ${this.country}</span>
        <span class="comments">${this.comments}</span>
        <span class="price">${this.price}€/jour</span>
        `
    }


    /**
     * Création du HTML de l'ensemble des tag attribué a un profil à retourné dans le render
     *
     * @return  {HTMLElement}  [return description]
     */
    showTags () {
        const container = document.createElement("div");
        container.className="tagButton";
        this.DOM.appendChild(container);
        for (const tag of this.tags) {
            const tagsIn = document.createElement('span');
            container.appendChild(tagsIn)
            tagsIn.innerText += `#${tag}`;
        }
    }
}