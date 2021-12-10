//Lien haut de page

class Link {
    constructor (domTarget) {
        this.DOM = domTarget;

        this.linkBack = document.createElement('a');
        this.linkBack.setAttribute('href', '#top');
        this.linkBack.setAttribute('class', 'linkBack');
        this.linkBtn = document.createElement('span');
        this.linkBtn.setAttribute('class', 'linkBtn')
        this.linkBtn.setAttribute('text-aria', "Retour en haut de la page");
        this.linkBtn.innerHTML = 'Passer au contenu'
        this.linkBack.appendChild(this.linkBtn);
        this.DOM.appendChild(this.linkBack);
        this.render ();
    }

    render () {
        this.showScroll();
    }

    /**
     * Gestion de l'affichage du lien si on déscent en dessous du header 
     *
     * @return  {void}  [return description]
     */
    showScroll () {

        //ration de réference 
        const ratio = .1;
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: .1
        }

        /**
         * Fonction de gestion de l'affichage du bouton au scoll. Le bouton s'affiche si le 
         * ration est inferieur a celui defini dans la const ratio par rapport à l'élément obervé 
         *
         * @param   {ScrollIntoViewOptions}  entries   [entries description]
         * @param   {HTMLElement}  observer  [observer description]
         *
         */
        const callback = function (entries, observer) {
            entries.forEach( (entry) => {
                const top = document.querySelector('.linkBtn');
                if (entry.intersectionRatio > ratio){
                    top.classList.add('none');
                    top.classList.remove('flex');    
                }else{
                    top.classList.remove('none');
                    top.classList.add('flex');   
                }
            });
        }


        const observer = new IntersectionObserver(callback, options);
        observer.observe(document.querySelector('header'));
    }
}
