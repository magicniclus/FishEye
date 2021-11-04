//Lien haut de page

class Link {
    constructor (domTarget) {
        this.DOM = domTarget;

        this.linkBack = document.createElement('a');
        this.linkBack.setAttribute('href', '#top');
        this.linkBack.setAttribute('class', 'linkBack');
        this.linkBtn = document.createElement('span');
        this.linkBtn.setAttribute('class', 'linkBtn')
        this.linkBtn.innerHTML = 'Passer au contenu'
        this.linkBack.appendChild(this.linkBtn);
        this.DOM.appendChild(this.linkBack);
        this.render ();
    }

    render () {
        this.showScroll();
    }

    /**
     * [showScroll description]
     *
     * @return  {ScrollOptions}  [return description]
     */
    showScroll () {
        const ratio = .1;
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: .1
        }

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
