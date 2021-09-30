//Lien haut de page

class Link {
    constructor (domTarget) {
        this.DOM = domTarget;

        this.render ();
    }

    render () {
        this.showBtn();
        this.showScroll();
    }

    showBtn () {
        const linkBack = document.createElement('a');
        linkBack.setAttribute('href', '#top');
        linkBack.setAttribute('class', 'linkBack');
        const linkBtn = document.createElement('span');
        linkBtn.setAttribute('class', 'linkBtn')
        linkBtn.innerHTML = 'Passer au contenu'
        linkBack.appendChild(linkBtn);
        this.DOM.appendChild(linkBack);
    }

    showScroll () {
        window.addEventListener('scroll', function () {
            const linkBtn = document.querySelector('.linkBtn')
            const scrollValue = (window.innerHeight + window.scrollY) / document.body.offsetHeight;

            console.log(scrollValue);

            if (scrollValue >= 0.60){
                linkBtn.style.display = 'block';
            }else {
                linkBtn.style.display = 'none';
            }
        })
    }
}
