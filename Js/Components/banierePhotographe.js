//Baniere de bas de page de la page photographe

class BanierePhotographe {

    constructor (domTarget, totalLikes, price){
        
        this.DOM = document.createElement('div');
        this.DOM.classList.add('banierePhotographe')
        domTarget.appendChild(this.DOM);
        this.price = price;
        this.totalLikes = totalLikes;

        this.render();
    }

    /**
     * Creation de la baniere
     *
     * @return  {HTMLElement}  
     */
    render () {
        this.DOM.innerHTML = `
            <div class='likedBaniere'>
                <span class='liked'>${this.totalLikes}</span>
                <i class='fas fa-heart'></i>
            </div>
            
        <div class='priceBaniere'>${this.price}€ / jour</div>
    `    };

    /**
     * Récuperation des données de like et re-affichage à chaque changement 
     *
     * @param   {Number}  newSum  [newSum description]
     *
     * @return  {HTMLElement}
     */
    updateLikes(newSum){
        this.totalLikes = newSum;
        this.render();
    }
}
