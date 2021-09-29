// Création de vignette photographer pour la page index

class VignettePhotographer {
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
        this.tags       = props;
        this.id         = props.id;

        this.render();
    }

    render () {
        this.showVignette();
    }

    showVignette () {
        return this.DOM.innerHTML =`
        <a href="./photographerPage.html?id=${this.id}" class="newVignette">
            <img src='Sample_Photos/Photographers ID Photos/${this.image}'>
            <span class="title">${this.name}</span>
        </a>    
        <span class="city">${this.city}, ${this.country}</span>
        <span class="comments">${this.comments}</span>
        <span class="price">${this.price}€/jour</span>
        <div class="tagButton"></div> 
        `
    }
}