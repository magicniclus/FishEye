class BanierePhotographe {

    constructor (domTarget, propsMedia, propsPhotographer){
        this.dataMedia = propsMedia;
        this.dataPhotographer = propsPhotographer;
        this.DOM = document.createElement('div');
        this.DOM.classList.add('banierePhotographe')
        domTarget.appendChild(this.DOM);
        this.array = [];
        propsMedia.forEach(media => {
            this.array.push(media.likes);
        });
        
        this.reducer = (acc, cur) => acc + cur;

        this.newArray = this.array.reduce(this.reducer);

        this.pricePhotographer = this.dataPhotographer.price;

        this.render();
    }

    render () {
        const liked = document.createElement('div');
        liked.setAttribute('class', 'baniere');
        this.DOM.appendChild(liked)
        this.showLike(liked);
        this.showPrice (liked);
    }

    showLike (parent) {
        parent.innerHTML += `
            <div class='likedBaniere'>
                <span class='liked'>${this.newArray}</span>
                <i class='fas fa-heart'></i>
            </div>
        `
    }

    showPrice (parent) {
        parent.innerHTML += `
        <div class='priceBaniere'>${this.pricePhotographer}€ / jour</div>
    `    }
}
