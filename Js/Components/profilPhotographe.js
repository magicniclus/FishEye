// Ajout du profil de chaque photographe dans leurs page

class ProfilPhotographe {

    /**
     * [constructor description]
     *
     * @param   {Object}  props      [props description]
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     */
    constructor(props, domTarget) {
        this.DOM = document.createElement("div");
        this.DOM.setAttribute('class', 'vignette')
        domTarget.appendChild(this.DOM);

        this.image = props.portrait;
        this.name = props.name;
        this.city = props.city;
        this.country = props.country;
        this.comments = props.tagline;
        this.price = props.price;
        this.tags = props.tags;
        this.id = props.id;
        this.description = props.descritpion;


        this.render();
        this.showTags();
    }


    /**
     * Création du HTML à afficher dans le dom
     *
     */
    render() {
        return this.DOM.innerHTML = `
            <div class="profil">
                <h1 class="profilName">${this.name}</h1>
                <span class="profilCity">${this.city}, ${this.country}</span>
                <span class="profilComments">${this.comments}</span>
                <span class='profilTag'></span>
            </div>
            <div class="button">
                <button type='button' class="button-div">Contactez moi</button>
            </div>
            <img src='Sample_Photos/Photographers ID Photos/${this.image}' alt="${this.description}""> 
        `
    }


    /**
     * Création du html qui va composer l'ensemble de mes tags
     *
     * @return  {void}  [return description]
     */
    showTags() {
        for (const tag of this.tags) {
            const tagIn = document.querySelector('.profilTag');
            const tagsIn = document.createElement('span');
            tagIn.appendChild(tagsIn)
            tagsIn.innerHTML += `#${tag}`;
        }
    }
}