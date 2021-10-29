//TODO : commanter le code

class BanierePhotographe {

    constructor (domTarget, totalLikes, price){
        
        this.DOM = document.createElement('div');
        this.DOM.classList.add('banierePhotographe')
        domTarget.appendChild(this.DOM);
        this.price = price;
        this.totalLikes = totalLikes;

        this.render();
    }

    render () {
        this.DOM.innerHTML = `
            <div class='likedBaniere'>
                <span class='liked'>${this.totalLikes}</span>
                <i class='fas fa-heart'></i>
            </div>
            
        <div class='priceBaniere'>${this.price}€ / jour</div>
    `    };

    updateLikes(newSum){
        this.totalLikes = newSum;
        this.render();
    }
}
